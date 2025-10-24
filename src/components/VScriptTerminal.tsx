"use client";

import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useGraph } from "@/contexts/GraphContext";
import { disciplineColors } from "@/lib/dummyData";

interface CommandOutput {
  command: string;
  output: string;
  timestamp: Date;
  success: boolean;
}

export default function VScriptTerminal() {
  const { graphData, addNode, removeNode, addLink, clearGraph, resetGraph, setFocusedNode } = useGraph();
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "vS.init()",
      output: "Welcome to Inorbit vScript terminal. Type vS.help() for available commands.",
      timestamp: new Date(),
      success: true,
    },
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const editorRef = useRef<any>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Configure Monaco Editor with vScript autocomplete
  const handleEditorWillMount = (monaco: any) => {
    // Register vScript language
    monaco.languages.register({ id: 'vscript' });

    // Define vScript tokens
    monaco.languages.setMonarchTokensProvider('vscript', {
      tokenizer: {
        root: [
          [/vS\.\w+/, 'keyword'],
          [/@\w+/, 'variable'],
          [/".*?"/, 'string'],
          [/\d+/, 'number'],
        ]
      }
    });

    // Define vScript autocomplete
    monaco.languages.registerCompletionItemProvider('vscript', {
      provideCompletionItems: () => {
        const suggestions = [
          {
            label: 'vS.help()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.help()',
            documentation: 'Show all available vScript commands'
          },
          {
            label: 'vS.graph.nodes()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.graph.nodes()',
            documentation: 'List all nodes in the graph'
          },
          {
            label: 'vS.graph.add()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.graph.add(type:"user", name:"", discipline:"")',
            documentation: 'Add a new node to the graph'
          },
          {
            label: 'vS.graph.remove()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.graph.remove(id:"")',
            documentation: 'Remove a node from the graph'
          },
          {
            label: 'vS.graph.connect()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.graph.connect(from:"", to:"")',
            documentation: 'Connect two nodes'
          },
          {
            label: 'vS.graph.clear()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.graph.clear()',
            documentation: 'Clear all nodes from graph'
          },
          {
            label: 'vS.graph.reset()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.graph.reset()',
            documentation: 'Reset graph to default state'
          },
          {
            label: 'vS.focus()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.focus(id:"")',
            documentation: 'Focus camera on a specific node'
          },
          {
            label: 'vS.scan()',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'vS.scan(discipline:"")',
            documentation: 'Find nodes by discipline'
          },
        ];
        return { suggestions };
      }
    });
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    editor.focus();

    // Set language to vscript
    const model = editor.getModel();
    monaco.editor.setModelLanguage(model, 'vscript');

    // Add custom keybindings
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => executeCommand(editor.getValue())
    );

    editor.addCommand(
      monaco.KeyCode.Enter,
      () => executeCommand(editor.getValue())
    );
  };

  const parseCommand = (cmd: string): CommandOutput => {
    const trimmedCmd = cmd.trim();

    // Help command
    if (trimmedCmd === "vS.help()" || trimmedCmd === "help") {
      return {
        command: trimmedCmd,
        output: `Available vScript commands:

GRAPH MANIPULATION:
  vS.graph.nodes() - List all nodes
  vS.graph.add(type:"user|project", name:"", discipline:"") - Add node
  vS.graph.remove(id:"") - Remove node
  vS.graph.connect(from:"", to:"") - Connect nodes
  vS.graph.clear() - Clear all nodes
  vS.graph.reset() - Reset to default

NAVIGATION:
  vS.focus(id:"") - Focus on node
  vS.scan(discipline:"") - Find by discipline

TIP: Press Tab for autocomplete!`,
        timestamp: new Date(),
        success: true,
      };
    }

    // List nodes
    if (trimmedCmd === "vS.graph.nodes()") {
      const nodeList = graphData.nodes.map(n =>
        `  ${n.id} - ${n.name} (${n.type}${n.discipline ? `, ${n.discipline}` : ''})`
      ).join('\n');
      return {
        command: trimmedCmd,
        output: `Total nodes: ${graphData.nodes.length}\n\n${nodeList || 'No nodes in graph'}`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Add node
    const addMatch = trimmedCmd.match(/vS\.graph\.add\(type:"(user|project)",\s*name:"([^"]+)"(?:,\s*discipline:"([^"]+)")?\)/);
    if (addMatch) {
      const [, type, name, discipline] = addMatch;
      const nodeType = type as "user" | "project";
      const newId = `${type[0]}${Date.now()}`;

      const color = discipline && disciplineColors[discipline]
        ? disciplineColors[discipline]
        : type === "user" ? "#FF6B6B" : "#666";

      addNode({
        id: newId,
        name,
        type: nodeType,
        discipline: discipline as any,
        color,
      });

      return {
        command: trimmedCmd,
        output: `✓ Node added successfully
  ID: ${newId}
  Name: ${name}
  Type: ${type}${discipline ? `\n  Discipline: ${discipline}` : ''}

Run vS.graph.nodes() to see all nodes`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Remove node
    const removeMatch = trimmedCmd.match(/vS\.graph\.remove\(id:"([^"]+)"\)/);
    if (removeMatch) {
      const nodeId = removeMatch[1];
      const node = graphData.nodes.find(n => n.id === nodeId);

      if (!node) {
        return {
          command: trimmedCmd,
          output: `✗ Node not found: ${nodeId}\n\nUse vS.graph.nodes() to see all nodes`,
          timestamp: new Date(),
          success: false,
        };
      }

      removeNode(nodeId);
      return {
        command: trimmedCmd,
        output: `✓ Removed node: ${node.name} (${nodeId})\n\nRun vS.graph.nodes() to see remaining nodes`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Connect nodes
    const connectMatch = trimmedCmd.match(/vS\.graph\.connect\(from:"([^"]+)",\s*to:"([^"]+)"\)/);
    if (connectMatch) {
      const [, fromId, toId] = connectMatch;
      const fromNode = graphData.nodes.find(n => n.id === fromId);
      const toNode = graphData.nodes.find(n => n.id === toId);

      if (!fromNode || !toNode) {
        return {
          command: trimmedCmd,
          output: `✗ One or both nodes not found\n  From: ${fromId} ${fromNode ? '✓' : '✗'}\n  To: ${toId} ${toNode ? '✓' : '✗'}`,
          timestamp: new Date(),
          success: false,
        };
      }

      addLink({ source: fromId, target: toId, type: "collaboration" });
      return {
        command: trimmedCmd,
        output: `✓ Connected nodes\n  ${fromNode.name} → ${toNode.name}`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Clear graph
    if (trimmedCmd === "vS.graph.clear()") {
      clearGraph();
      return {
        command: trimmedCmd,
        output: `✓ Graph cleared\n  All nodes removed`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Reset graph
    if (trimmedCmd === "vS.graph.reset()") {
      resetGraph();
      return {
        command: trimmedCmd,
        output: `✓ Graph reset to default state\n  Run vS.graph.nodes() to see all nodes`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Focus on node
    const focusMatch = trimmedCmd.match(/vS\.focus\(id:"([^"]+)"\)/);
    if (focusMatch) {
      const nodeId = focusMatch[1];
      const node = graphData.nodes.find(n => n.id === nodeId);

      if (!node) {
        return {
          command: trimmedCmd,
          output: `✗ Node not found: ${nodeId}`,
          timestamp: new Date(),
          success: false,
        };
      }

      setFocusedNode(nodeId);
      return {
        command: trimmedCmd,
        output: `✓ Focusing on: ${node.name}\n  Camera moving...`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Scan by discipline
    const scanMatch = trimmedCmd.match(/vS\.scan\(discipline:"([^"]+)"\)/);
    if (scanMatch) {
      const discipline = scanMatch[1];
      const matches = graphData.nodes.filter(n => n.discipline === discipline && n.type === "user");

      const matchList = matches.slice(0, 5).map(n =>
        `  ${n.id} - ${n.name}`
      ).join('\n');

      return {
        command: trimmedCmd,
        output: `Found ${matches.length} ${discipline} creator${matches.length !== 1 ? 's' : ''}:\n\n${matchList || 'No matches'}\n\nUse vS.focus(id:"") to navigate to a node`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Unknown command
    return {
      command: trimmedCmd,
      output: `✗ Unknown command: ${trimmedCmd}\n\nType vS.help() to see available commands`,
      timestamp: new Date(),
      success: false,
    };
  };

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const result = parseCommand(cmd);
    setHistory((prev) => [...prev, result]);
    setCurrentCommand("");

    if (editorRef.current) {
      editorRef.current.setValue("");
    }
  };

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-gray-800 bg-black flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-coral font-semibold text-xs sm:text-sm">vScript Terminal</span>
          <span className="text-[10px] sm:text-xs text-gray-500">
            v1.0.0 | Press Enter to execute
          </span>
        </div>
        <button
          onClick={() => setHistory([])}
          className="text-[10px] sm:text-xs text-gray-500 hover:text-coral transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Output Area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-2 font-mono text-xs sm:text-sm space-y-2 sm:space-y-3"
      >
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-start gap-2">
              <span className="text-coral flex-shrink-0">❯</span>
              <span className="text-gray-300 break-all">{entry.command}</span>
            </div>
            <div
              className={`pl-4 whitespace-pre-wrap ${
                entry.success ? "text-gray-400" : "text-red-400"
              }`}
            >
              {entry.output}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="h-12 sm:h-16 border-t border-gray-800 flex-shrink-0">
        <Editor
          height="100%"
          defaultLanguage="vscript"
          theme="vs-dark"
          value={currentCommand}
          onChange={(value) => setCurrentCommand(value || "")}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: "off",
            folding: false,
            scrollBeyondLastLine: false,
            renderLineHighlight: "none",
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
            },
            fontSize: 11,
            fontFamily: "monospace",
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            tabCompletion: "on",
          }}
        />
      </div>
    </div>
  );
}

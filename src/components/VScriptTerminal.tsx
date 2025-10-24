"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

interface CommandOutput {
  command: string;
  output: string;
  timestamp: Date;
  success: boolean;
}

export default function VScriptTerminal() {
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

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();

    // Add custom keybindings
    editor.addCommand(
      // Ctrl+Enter or Cmd+Enter to execute
      window.monaco?.KeyMod.CtrlCmd | window.monaco?.KeyCode.Enter,
      () => {
        executeCommand(editor.getValue());
      }
    );

    // Enter key to execute (single line mode)
    editor.addCommand(window.monaco?.KeyCode.Enter, () => {
      executeCommand(editor.getValue());
    });
  };

  const parseCommand = (cmd: string): CommandOutput => {
    const trimmedCmd = cmd.trim();

    // Simple command parser for MVP
    if (trimmedCmd === "vS.help()" || trimmedCmd === "help") {
      return {
        command: trimmedCmd,
        output: `Available vScript commands:
  vS.scan(discipline:"music"|"art"|"video"|"design"|"writing") - Find creators by discipline
  vS.route(@username) - Navigate to a user in the graph
  vS.link(@username, project:"idea") - Propose a collaboration
  vS.collab(create:{title:"name", roles:["role1","role2"]}) - Start a new project
  vS.profile() - View your profile
  vS.help() - Show this help message`,
        timestamp: new Date(),
        success: true,
      };
    }

    if (trimmedCmd.startsWith("vS.scan(")) {
      const match = trimmedCmd.match(/vS\.scan\(discipline:"(\w+)"\)/);
      if (match) {
        const discipline = match[1];
        return {
          command: trimmedCmd,
          output: `Scanning for ${discipline} creators...
Found 3 creators:
  @alex_rivera - Producer, 2.3k followers
  @taylor_swift - Singer/Songwriter, 5.1k followers
  @avery_kim - DJ, 1.8k followers

Tip: Use vS.route(@username) to navigate to their profile in the graph.`,
          timestamp: new Date(),
          success: true,
        };
      }
    }

    if (trimmedCmd.startsWith("vS.route(")) {
      const match = trimmedCmd.match(/vS\.route\(@(\w+)\)/);
      if (match) {
        const username = match[1];
        return {
          command: trimmedCmd,
          output: `Routing to @${username}...
✓ User found in constellation
✓ Camera focused on node

View connections: vS.graph(@${username})`,
          timestamp: new Date(),
          success: true,
        };
      }
    }

    if (trimmedCmd.startsWith("vS.link(")) {
      const match = trimmedCmd.match(/vS\.link\(@(\w+),\s*project:"([^"]+)"\)/);
      if (match) {
        const username = match[1];
        const project = match[2];
        return {
          command: trimmedCmd,
          output: `Collaboration request sent to @${username}
Project idea: "${project}"

Status: Pending
Estimated response time: 24-48 hours

Track progress: vS.collab(status)`,
          timestamp: new Date(),
          success: true,
        };
      }
    }

    if (trimmedCmd.startsWith("vS.collab(create:")) {
      return {
        command: trimmedCmd,
        output: `Creating new project...
✓ Project initialized
✓ Collaboration room created
✓ Graph node added

Next steps:
  1. Invite collaborators: vS.invite(@username)
  2. Set revenue splits: vS.revenue(splits)
  3. Start creating!`,
        timestamp: new Date(),
        success: true,
      };
    }

    if (trimmedCmd === "vS.profile()" || trimmedCmd === "profile") {
      return {
        command: trimmedCmd,
        output: `Your Profile:
  Username: @demo_user
  Discipline: Music
  Followers: 1.2k
  Active Projects: 3
  Completed Collabs: 12
  Reputation Score: 87/100

Tip: Complete more collaborations to increase your reputation!`,
        timestamp: new Date(),
        success: true,
      };
    }

    // Unknown command
    return {
      command: trimmedCmd,
      output: `Unknown command: ${trimmedCmd}
Type vS.help() to see available commands.`,
      timestamp: new Date(),
      success: false,
    };
  };

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const result = parseCommand(cmd);
    setHistory((prev) => [...prev, result]);
    setCurrentCommand("");

    // Clear editor
    if (editorRef.current) {
      editorRef.current.setValue("");
    }

    // Scroll to bottom of output
    setTimeout(() => {
      const outputDiv = document.getElementById("terminal-output");
      if (outputDiv) {
        outputDiv.scrollTop = outputDiv.scrollHeight;
      }
    }, 0);
  };

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-black">
        <div className="flex items-center gap-2">
          <span className="text-coral font-semibold">vScript Terminal</span>
          <span className="text-xs text-gray-500">
            v1.0.0 | Press Enter to execute
          </span>
        </div>
        <button
          onClick={() => setHistory([])}
          className="text-xs text-gray-500 hover:text-coral transition-colors"
        >
          Clear History
        </button>
      </div>

      {/* Output Area */}
      <div
        id="terminal-output"
        className="flex-1 overflow-y-auto px-4 py-2 font-mono text-sm space-y-3"
      >
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-start gap-2">
              <span className="text-coral">❯</span>
              <span className="text-gray-300">{entry.command}</span>
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
      <div className="h-16 border-t border-gray-800">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={currentCommand}
          onChange={(value) => setCurrentCommand(value || "")}
          onMount={handleEditorDidMount}
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
            fontSize: 13,
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

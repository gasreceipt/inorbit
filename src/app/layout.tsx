import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inorbit - Creative Collaboration Network",
  description: "A social collaboration platform for creators with 3D graph visualization and vScript command language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

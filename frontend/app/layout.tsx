import type { Metadata } from "next";
import "./iframe.css";

export const metadata: Metadata = {
  title: "Dala — Unlock collective wisdom",
  description:
    "Your workplace has the answer. Ask Dala to find it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



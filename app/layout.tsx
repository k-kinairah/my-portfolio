import type { Metadata } from "next";
import InteractiveCursor from "./components/InteractiveCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "kinairah | Portfolio",
  description: "Portfolio website of Kin Ira J. Bantiling, BS Computer Science student.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <InteractiveCursor />
        {children}
      </body>
    </html>
  );
}

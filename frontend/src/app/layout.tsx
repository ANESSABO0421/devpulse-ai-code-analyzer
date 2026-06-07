import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ClientPageLoader } from "@/components/ui/ClientPageLoader";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DevPulse | AI-Powered Code Review Workspace",
  description: "DevPulse combines Claude-powered review feedback, real-time threaded comments, and GitHub integration in one premium workspace.",
  icons: {
    icon: "/devpulse-logo-mark.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem("devpulse-theme");
                  var theme = saved === "light" || saved === "dark"
                    ? saved
                    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch (error) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ClientPageLoader />
        <SmoothScroll>
          <div className="bg-mesh" />
          <div className="bg-grid" />
          <div className="bg-noise" />
          <Navbar />
          <main className="page-fade-in">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--surface-strong)",
                color: "var(--foreground)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                backdropFilter: "blur(12px)",
              },
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}

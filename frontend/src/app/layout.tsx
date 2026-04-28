import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ClientPageLoader } from "@/components/ui/ClientPageLoader";

export const metadata: Metadata = {
  title: "DevPulse | AI-Powered Code Review Workspace",
  description: "DevPulse combines Claude-powered review feedback, real-time threaded comments, and GitHub integration in one premium workspace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <Navbar />
          <main className="page-fade-in">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </SmoothScroll>
      </body>
    </html>
  );
}

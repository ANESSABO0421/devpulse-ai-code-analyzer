import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { PageLoader } from "@/components/ui/PageLoader";

export const metadata: Metadata = {
  title: "DevPulse | AI-Powered Code Review Workspace",
  description: "DevPulse combines Claude-powered review feedback, real-time threaded comments, and GitHub integration in one premium workspace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PageLoader />
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

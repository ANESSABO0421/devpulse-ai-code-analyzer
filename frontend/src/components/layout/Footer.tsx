import Link from "next/link";
import { Code, MessageSquare, Users } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-background/50 py-16 backdrop-blur-sm">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/">
              <Logo compact />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The premium workspace for AI-powered code reviews and team collaboration. Ship cleaner code, faster.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-muted hover:text-accent transition-colors"><Code size={20} /></a>
              <a href="#" className="text-muted hover:text-accent transition-colors"><MessageSquare size={20} /></a>
              <a href="#" className="text-muted hover:text-accent transition-colors"><Users size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[color:var(--foreground)]">Product</h4>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li><Link href="/features" className="transition-colors hover:text-[color:var(--foreground)]">Features</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-[color:var(--foreground)]">Pricing</Link></li>
              <li><Link href="/changelog" className="transition-colors hover:text-[color:var(--foreground)]">Changelog</Link></li>
              <li><Link href="/docs" className="transition-colors hover:text-[color:var(--foreground)]">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[color:var(--foreground)]">Company</h4>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li><Link href="/about" className="transition-colors hover:text-[color:var(--foreground)]">About Us</Link></li>
              <li><Link href="/careers" className="transition-colors hover:text-[color:var(--foreground)]">Careers</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-[color:var(--foreground)]">Blog</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-[color:var(--foreground)]">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[color:var(--foreground)]">Legal</h4>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li><Link href="/privacy" className="transition-colors hover:text-[color:var(--foreground)]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-[color:var(--foreground)]">Terms of Service</Link></li>
              <li><Link href="/cookie" className="transition-colors hover:text-[color:var(--foreground)]">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-white/5 pt-8 text-center text-xs text-muted">
          <p>© {new Date().getFullYear()} DevPulse Inc. All rights reserved. Built with passion for developers.</p>
        </div>
      </div>
    </footer>
  );
}

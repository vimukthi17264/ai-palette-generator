import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
    <div className="container py-12 md:py-16">
      {/* Footer Content */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <h3 className="text-xl font-bold tracking-tight">PaletteGPT</h3>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
          <p>© 2024 PaletteGPT. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors duration-200">
              About Us
            </Link>
          </div>
        </div>
      </div>
  
      
    </div>
  </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-foreground transition-colors">
        {children}
      </Link>
    </li>
  );
}
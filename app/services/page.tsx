import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ServicesContent } from "@/components/services-content"

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            JaanConnect
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-sm text-primary font-medium">
              Services
            </Link>
            <Link href="/providers" className="text-sm hover:text-primary transition-colors">
              Providers
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <ServicesContent />
    </div>
  )
}

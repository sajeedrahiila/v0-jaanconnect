"use client"

import { Button } from "@/components/ui/button"
import { Target, Heart, Lightbulb, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            JaanConnect
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-sm hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/providers" className="text-sm hover:text-primary transition-colors">
              Providers
            </Link>
            <Link href="/about" className="text-sm text-primary font-medium">
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

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-slide-up">
              Building bridges between businesses and service providers
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in">
              JaanConnect was founded with a simple mission: make it effortless for businesses to discover and
              collaborate with the best service providers in the industry. We believe that great partnerships drive
              innovation and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Excellence",
                description: "We set the highest standards for quality and performance",
              },
              {
                icon: Heart,
                title: "Trust",
                description: "Building lasting relationships through transparency",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "Constantly evolving to serve you better",
              },
              {
                icon: Users,
                title: "Community",
                description: "Growing together as a unified ecosystem",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2020, JaanConnect emerged from a simple observation: finding reliable service providers was
                unnecessarily complicated and time-consuming.
              </p>
              <p>
                We set out to create a platform that would streamline this process, making it as easy as possible for
                businesses to connect with the right professionals for their needs.
              </p>
              <p>
                Today, we're proud to serve over 20,000 businesses and 50,000 service providers, facilitating millions
                of successful collaborations. Our platform has become the trusted bridge connecting ambition with
                expertise.
              </p>
              <p>
                As we continue to grow, our commitment remains unchanged: empowering businesses and service providers to
                achieve extraordinary results together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ready to join us?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Become part of our growing community today
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

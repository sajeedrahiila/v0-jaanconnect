"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Users, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
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
            <Button size="sm" asChild className="group">
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-full text-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-medium">New: Now with Odoo 19 Integration</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance animate-slide-up">
            Connect with the{" "}
            <span className="text-primary relative">
              best service
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                <path
                  d="M2 10C50 3 100 2 150 5C200 8 250 10 298 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-draw-line"
                />
              </svg>
            </span>{" "}
            providers instantly
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-delay">
            Your trusted platform to discover, connect, and collaborate with top-tier service providers. Built for
            speed, reliability, and seamless integration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
            <Button size="lg" className="text-lg px-8 group" asChild>
              <Link href="/signup">
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/demo">Watch Demo</Link>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-sm">Trusted by 20,000+ businesses</div>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float-delay" />
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Why teams choose JaanConnect</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage service relationships in one powerful platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "10x Faster",
                description: "Connect with service providers in minutes, not days",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime guarantee",
              },
              {
                icon: Users,
                title: "50K+ Providers",
                description: "Access the largest network of verified professionals",
              },
              {
                icon: TrendingUp,
                title: "ROI Guaranteed",
                description: "Average 300% return on investment in the first year",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <feature.icon className="h-12 w-12 mb-4 text-primary relative z-10" />
                <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground relative z-10">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-primary/5"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { value: "50K+", label: "Active Providers" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-lg text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
                Ready to transform your business?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using JaanConnect to grow faster
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 group" asChild>
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

const providers = [
  {
    name: "TechVision Solutions",
    category: "Development",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    verified: true,
    image: "/tech-company-logo.jpg",
  },
  {
    name: "Creative Minds Studio",
    category: "Design",
    rating: 4.8,
    reviews: 94,
    location: "New York, NY",
    verified: true,
    image: "/design-studio-logo.png",
  },
  {
    name: "Growth Marketing Pro",
    category: "Marketing",
    rating: 5.0,
    reviews: 156,
    location: "Austin, TX",
    verified: true,
    image: "/marketing-agency-logo.png",
  },
  {
    name: "DataInsight Analytics",
    category: "Analytics",
    rating: 4.7,
    reviews: 83,
    location: "Seattle, WA",
    verified: true,
    image: "/analytics-company-logo.png",
  },
  {
    name: "SecureShield Systems",
    category: "Security",
    rating: 4.9,
    reviews: 112,
    location: "Boston, MA",
    verified: true,
    image: "/security-firm-logo.jpg",
  },
  {
    name: "Strategy First Consulting",
    category: "Consulting",
    rating: 4.8,
    reviews: 68,
    location: "Chicago, IL",
    verified: true,
    image: "/consulting-firm-logo.png",
  },
]

export default function ProvidersPage() {
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
            <Link href="/providers" className="text-sm text-primary font-medium">
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

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-slide-up">Top Service Providers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Verified professionals ready to bring your projects to life
          </p>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider, index) => (
              <Card
                key={index}
                className="group p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={provider.image || "/placeholder.svg"}
                    alt={provider.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-lg leading-tight">{provider.name}</h3>
                      {provider.verified && <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {provider.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{provider.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  {provider.location}
                </div>

                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to become a provider?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our network of professionals and grow your business
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

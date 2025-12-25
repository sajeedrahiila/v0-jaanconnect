"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Code, Palette, Megaphone, BarChart, Shield, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const services = [
  {
    icon: Code,
    title: "Development",
    description: "Full-stack, mobile, and web development services",
    providers: 12500,
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Design",
    description: "UI/UX, branding, and creative design solutions",
    providers: 8300,
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "Digital marketing, SEO, and content strategies",
    providers: 9800,
    color: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart,
    title: "Analytics",
    description: "Data analysis, reporting, and business intelligence",
    providers: 5600,
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Cybersecurity, audits, and compliance services",
    providers: 4200,
    color: "from-slate-500 to-zinc-500",
  },
  {
    icon: Zap,
    title: "Consulting",
    description: "Business strategy and technical consulting",
    providers: 6700,
    color: "from-yellow-500 to-amber-500",
  },
]

export function ServicesContent() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-slide-up">Explore Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
              Connect with expert providers across multiple categories
            </p>
            <div className="max-w-2xl mx-auto relative animate-fade-in-delay">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
                />
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-4`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {service.providers.toLocaleString()} providers
                    </span>
                    <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our team and we'll help you find the perfect service provider
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

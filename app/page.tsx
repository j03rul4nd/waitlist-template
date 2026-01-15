"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check } from "lucide-react"

export default function WaitlistPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-muted/30 text-muted-foreground text-sm mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground/60"></span>
              </span>
              Early access now open
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-6 text-balance leading-[1.1]">
              Your digital identity, <span className="text-muted-foreground">reimagined</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed text-pretty max-w-lg">
              A systematic approach to personal branding for founders and builders who think long-term. Early access is
              limited.
            </p>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 bg-background border-border/50 focus:border-foreground/20 transition-colors text-base"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-background border-border/50 focus:border-foreground/20 transition-colors text-base"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full sm:w-auto h-12 px-8 bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 font-medium group"
                >
                  {isLoading ? (
                    "Requesting access..."
                  ) : (
                    <>
                      Request access
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="flex items-start gap-4 p-6 rounded-2xl border border-border/50 bg-muted/30 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">You're on the list!</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We'll notify you when early access is ready. Check your inbox for confirmation.
                  </p>
                </div>
              </div>
            )}

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No spam, ever
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Your data is secure
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Unsubscribe anytime
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square w-full max-w-[600px] mx-auto">
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />

              {/* Main gradient orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/5 via-foreground/[0.02] to-transparent blur-3xl" />

                  {/* Main circle with subtle gradient */}
                  <div className="absolute inset-[50px] rounded-full border border-border/20 bg-gradient-to-br from-muted/50 via-background to-muted/30 backdrop-blur-sm shadow-2xl" />

                  {/* Inner circles for depth */}
                  <div className="absolute inset-[100px] rounded-full border border-border/10 bg-gradient-to-br from-muted/30 to-transparent" />
                  <div className="absolute inset-[150px] rounded-full border border-border/5 bg-gradient-to-br from-background/50 to-transparent" />

                  {/* Accent dots */}
                  <div className="absolute top-[20%] right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-foreground/10 to-foreground/5 border border-border/20 backdrop-blur-sm" />
                  <div className="absolute bottom-[25%] left-[10%] w-12 h-12 rounded-full bg-gradient-to-br from-foreground/8 to-foreground/3 border border-border/20 backdrop-blur-sm" />
                  <div className="absolute top-[35%] left-[20%] w-10 h-10 rounded-full bg-gradient-to-br from-foreground/6 to-foreground/2 border border-border/20 backdrop-blur-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

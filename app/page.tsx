"use client"

import WaitlistForm from "@/components/WaitlistForm"
import WaitlistVisual from "@/components/WaitlistVisual"

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-12">
          Your modern business card
        </h1>

        {/* Contenido */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <WaitlistForm />
          <WaitlistVisual />
        </div>

      </div>
    </div>
  )
}

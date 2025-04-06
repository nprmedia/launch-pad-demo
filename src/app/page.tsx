"use client"

import { useState } from 'react'
import { Check, Mail } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission (replace with Mailchimp form action or API call)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-black px-6 py-24 flex items-center justify-center">
      <div className="max-w-3xl w-full text-center space-y-10">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
          Launch Bold. Convert Fast.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
          This is the exact 1-page website we use to help solo coaches launch new offers, grow lists, and validate their niche — in days, not weeks.
        </p>

        {submitted ? (
          <div className="mt-8 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            <span className="font-medium">You&apos;re subscribed! Watch your inbox for launch access. 🚀</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your best email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full flex-1 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-black text-white font-medium hover:bg-black/90 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Get Launch Access
            </button>
          </form>
        )}

        <div className="mt-12 border-t pt-8">
          <p className="text-sm text-gray-400">
            Fully responsive · Mobile-first · SEO optimized · Mailchimp/ConvertKit ready
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Built with Next.js + Tailwind CSS · Deployed on Vercel
          </p>
        </div>
      </div>
    </main>
  )
}

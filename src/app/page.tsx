// Final $1000-level Launch Pad Demo
"use client"

import { useState } from 'react'
import {
  Mail,
  Zap,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ArrowDownCircle,
  Check
} from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showWhy, setShowWhy] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="bg-white text-black">
      {/* Walkthrough Toggle */}
      <button
        onClick={() => setShowWhy(!showWhy)}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full shadow-lg bg-black text-white text-sm font-medium hover:bg-black/90"
      >
        {showWhy ? 'Close Value Walkthrough' : 'Why This Costs $1,000?'}
      </button>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-32 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-full w-full bg-gradient-to-br from-green-100 via-white to-transparent rounded-full blur-2xl opacity-30 -z-10" />
        <div className="text-center max-w-2xl space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
            Launch Bold. Convert Fast.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            The exact 1-page framework we use to help solo coaches launch new offers, grow lists, and validate their niche — in days, not weeks.
          </p>
          {submitted ? (
            <div className="bg-green-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg inline-flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              <span className="font-medium">You&#39;re subscribed! Watch your inbox for launch access. 🚀</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-md bg-black text-white font-medium hover:bg-black/90 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Notify Me
              </button>
            </form>
          )}
          <p className="text-sm text-gray-400 mt-2">No spam. Unsubscribe anytime. 🔒</p>
        </div>
      </section>

      {/* Scroll Cue */}
      <div className="py-4 text-center animate-bounce">
        <ArrowDownCircle className="w-6 h-6 text-gray-400 mx-auto" />
      </div>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold">What You Get</h2>
          <div className="grid sm:grid-cols-2 gap-8 text-left">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Conversion-First Layout</h3>
                <p className="text-gray-600">Designed with copy hierarchy, trust triggers, and optimized CTAs to drive real signups.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Fully Mobile Responsive</h3>
                <p className="text-gray-600">Perfect viewing experience across phones, tablets, and desktop — no scroll hacks needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Built-In Email Capture</h3>
                <p className="text-gray-600">Includes setup for ConvertKit/Mailchimp, so you're collecting leads from day one.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Deploys in Minutes</h3>
                <p className="text-gray-600">Set up with Next.js + Vercel. No backend, no tech skills needed. It just works.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-sm uppercase tracking-widest text-gray-500">Used by Experts</p>
          <h3 className="text-2xl font-bold">
            This exact layout has powered 40+ high-converting launches for solo coaches and consultants.
          </h3>
        </div>
      </section>

      {/* Walkthrough Highlights */}
      {showWhy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40">
          {/* Hero */}
          <div className="absolute top-[22%] left-[10%] w-64 p-4 bg-white text-black rounded-xl shadow-xl">
            <p className="font-semibold">🔥 Premium Headline</p>
            <p className="text-sm">Emotional, results-driven headline built for top-of-funnel trust.</p>
          </div>
          <div className="absolute top-[18%] left-[48%] w-20 h-20 border-2 border-green-400 rounded-full animate-ping"></div>

          {/* Form */}
          <div className="absolute top-[34%] left-[10%] w-64 p-4 bg-white text-black rounded-xl shadow-xl">
            <p className="font-semibold">📩 Optimized Signup</p>
            <p className="text-sm">Input spacing + CTA tested for clarity, speed, and frictionless flow.</p>
          </div>
          <div className="absolute top-[32%] left-[50%] w-20 h-20 border-2 border-blue-400 rounded-full animate-pulse"></div>

          {/* Features */}
          <div className="absolute top-[67%] left-[10%] w-64 p-4 bg-white text-black rounded-xl shadow-xl">
            <p className="font-semibold">📦 Real Business Value</p>
            <p className="text-sm">Every feature saves time, increases conversions, or builds trust. It’s a system.</p>
          </div>
          <div className="absolute top-[64%] left-[47%] w-24 h-24 border-2 border-yellow-400 rounded-full animate-spin"></div>

          {/* Proof */}
          <div className="absolute bottom-[8%] left-[10%] w-64 p-4 bg-white text-black rounded-xl shadow-xl">
            <p className="font-semibold">💬 Launch Proven</p>
            <p className="text-sm">Built with real data from 40+ launches — this isn’t theory.</p>
          </div>
          <div className="absolute bottom-[6%] left-[46%] w-16 h-16 border-2 border-pink-400 rounded-full animate-bounce"></div>
        </div>
      )}
    </main>
  )
}

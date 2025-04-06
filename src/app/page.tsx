// updated Launch Pad demo with animated highlight overlay
"use client"

import { useState } from 'react'
import {
  Check,
  Mail,
  CheckCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowDownCircle
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
    <main className="bg-gradient-to-b from-white to-gray-50 text-black">
      {/* Toggle Overlay Button */}
      <button
        onClick={() => setShowWhy(!showWhy)}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full shadow-md bg-black text-white text-sm font-medium hover:bg-black/90"
      >
        {showWhy ? 'Close Value Walkthrough' : 'Why This Costs $1,000?'}
      </button>

      {/* Hero Section */}
      <section className="min-h-screen px-6 py-24 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-green-200 via-white to-transparent rounded-full blur-3xl opacity-20 animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-3xl w-full text-center space-y-10 relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Launch Bold. Convert Fast.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
            This is the exact 1-page website we use to help solo coaches launch new offers, grow lists, and validate their niche — in days, not weeks.
          </p>

          {submitted ? (
            <div className="mt-8 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              <span className="font-medium">You&#39;re subscribed! Watch your inbox for launch access. 🚀</span>
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

          <div className="text-sm text-gray-400 mt-4">
            <p>No spam. Unsubscribe anytime. 🔒</p>
          </div>

          <div className="mt-12 animate-bounce">
            <ArrowDownCircle className="w-6 h-6 text-gray-400 mx-auto" />
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-sm text-gray-400">
              Fully responsive · Mobile-first · SEO optimized · Mailchimp/ConvertKit ready
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Built with Next.js + Tailwind CSS · Deployed on Vercel
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold">What You Get</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Conversion-First Layout</h3>
                <p className="text-gray-600">Crafted with copy hierarchy and CTAs designed to drive action, not just look good.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Mobile Responsive</h3>
                <p className="text-gray-600">Pixel-perfect experience across mobile, tablet, and desktop devices.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Email Capture Built-In</h3>
                <p className="text-gray-600">Easily connect Mailchimp, ConvertKit, or any other email tool.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Lighting-Fast Deployment</h3>
                <p className="text-gray-600">Deploy to Vercel in minutes with zero backend setup or configuration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-500 text-sm uppercase tracking-wide">Trusted by Coaches</p>
          <h3 className="text-2xl font-semibold mt-2">Used in over 40+ niche launches across coaching, consulting, and personal brands.</h3>
        </div>
      </section>

      {/* Interactive Overlay Highlights */}
      {showWhy && (
        <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm text-white">
          {/* Hero highlight */}
          <div className="absolute top-[18%] left-[8%] w-60 p-4 bg-white text-black rounded-lg shadow-xl">
            <p className="font-semibold">Hero Design</p>
            <p className="text-sm">Polished glow and headline hierarchy designed to signal premium trust at a glance.</p>
          </div>
          <div className="absolute top-[15%] left-[45%] w-20 h-20 border-2 border-green-400 rounded-full animate-ping"></div>

          {/* Form highlight */}
          <div className="absolute top-[37%] left-[8%] w-60 p-4 bg-white text-black rounded-lg shadow-xl">
            <p className="font-semibold">Conversion Form</p>
            <p className="text-sm">Optimized field layout with proven opt-in flow — frictionless and persuasive.</p>
          </div>
          <div className="absolute top-[34%] left-[45%] w-20 h-20 border-2 border-blue-400 rounded-full animate-pulse"></div>

          {/* Features highlight */}
          <div className="absolute top-[64%] left-[8%] w-60 p-4 bg-white text-black rounded-lg shadow-xl">
            <p className="font-semibold">High-Impact Features</p>
            <p className="text-sm">Each block is a $100+ asset — conversion layout, CRM-ready opt-ins, and more.</p>
          </div>
          <div className="absolute top-[60%] left-[42%] w-24 h-24 border-2 border-yellow-400 rounded-full animate-spin"></div>

          {/* Social Proof highlight */}
          <div className="absolute bottom-[6%] left-[8%] w-60 p-4 bg-white text-black rounded-lg shadow-xl">
            <p className="font-semibold">Niche-Specific Credibility</p>
            <p className="text-sm">Targeted proof: builds trust for consultants, creators, and solo founders.</p>
          </div>
          <div className="absolute bottom-[5%] left-[42%] w-16 h-16 border-2 border-pink-400 rounded-full animate-bounce"></div>
        </div>
      )}
    </main>
  )
}

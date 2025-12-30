'use client'

import { useState } from "react"
import { supabase } from "@/src/lib/supabaseClient"
import { motion } from "framer-motion"
import { FiPackage } from "react-icons/fi"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  

  const signIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      alert(error.message)
      return
    }
    router.replace("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface rounded-2xl p-8 shadow-lg border border-border"
      >
        <div className="flex items-center gap-3 mb-8">
          <FiPackage className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">Admin Login</h1>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={signIn}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold disabled:opacity-60 transition-opacity"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

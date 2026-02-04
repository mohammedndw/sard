'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push(from)
    } catch (err) {
      console.error('Login error:', err)
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      } else if (err.code === 'auth/invalid-email') {
        setError('البريد الإلكتروني غير صالح')
      } else {
        setError('حدث خطأ في تسجيل الدخول')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="py-32 px-5">
          <div className="max-w-md mx-auto bg-white rounded-custom shadow-lg p-8">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-primary-text">تسجيل الدخول</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-right mb-2 text-primary-text font-medium">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-custom text-right focus:outline-none focus:border-accent-dark"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-right mb-2 text-primary-text font-medium">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-custom text-right focus:outline-none focus:border-accent-dark"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-4 bg-accent-dark text-white rounded-custom font-bold text-lg transition-colors hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
              </button>
            </form>
            
            <p className="text-center mt-6 text-primary-text">
              ليس لديك حساب؟ <Link href="/register" className="text-accent-dark hover:text-primary-text font-semibold">إنشاء حساب جديد</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

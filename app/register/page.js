'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      return setError('كلمة المرور غير متطابقة')
    }

    if (formData.password.length < 6) {
      return setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    }

    setLoading(true)

    try {
      await register(formData.email, formData.password, formData.name, formData.phone)
      router.push('/')
    } catch (err) {
      console.error('Registration error:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError('هذا البريد الإلكتروني مستخدم بالفعل')
      } else if (err.code === 'auth/invalid-email') {
        setError('البريد الإلكتروني غير صالح')
      } else if (err.code === 'auth/weak-password') {
        setError('كلمة المرور ضعيفة جداً')
      } else {
        setError('حدث خطأ في إنشاء الحساب')
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
            <h1 className="text-3xl font-extrabold text-center mb-6 text-primary-text">إنشاء حساب جديد</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-right mb-2 text-primary-text font-medium">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-custom text-right focus:outline-none focus:border-accent-dark"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-right mb-2 text-primary-text font-medium">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-custom text-right focus:outline-none focus:border-accent-dark"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-right mb-2 text-primary-text font-medium">
                  رقم الهاتف (اختياري)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="أدخل رقم هاتفك"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-custom text-right focus:outline-none focus:border-accent-dark"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-right mb-2 text-primary-text font-medium">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="أعد إدخال كلمة المرور"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-custom text-right focus:outline-none focus:border-accent-dark"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-4 bg-accent-dark text-white rounded-custom font-bold text-lg transition-colors hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'جاري التحميل...' : 'إنشاء الحساب'}
              </button>
            </form>
            
            <p className="text-center mt-6 text-primary-text">
              لديك حساب بالفعل؟ <Link href="/login" className="text-accent-dark hover:text-primary-text font-semibold">تسجيل الدخول</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

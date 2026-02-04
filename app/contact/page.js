'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Handle form submission here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <Header />
      <main>
        <section className="py-32 px-5">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-primary-text">تواصل معنا</h1>
            
            <div className="bg-white rounded-custom shadow-lg p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-xl text-green-600 font-bold">شكراً لك! تم إرسال رسالتك بنجاح.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-right mb-2 text-primary-text font-medium">
                      الاسم
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-custom text-right focus:outline-none focus:border-accent-dark"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-right mb-2 text-primary-text font-medium">
                      الرسالة
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-custom text-right focus:outline-none focus:border-accent-dark"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-accent-dark text-white rounded-custom font-bold text-lg transition-colors hover:bg-black"
                  >
                    إرسال الرسالة
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

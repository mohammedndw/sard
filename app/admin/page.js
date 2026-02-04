'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    registrations: 0,
    bookings: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const [eventsSnapshot, registrationsSnapshot, bookingsSnapshot] = await Promise.all([
        getDocs(collection(db, 'events')),
        getDocs(collection(db, 'registrations')),
        getDocs(collection(db, 'bookings'))
      ])

      setStats({
        events: eventsSnapshot.size,
        registrations: registrationsSnapshot.size,
        bookings: bookingsSnapshot.size
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">جاري التحميل...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary-text">لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-custom shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-primary-text">الفعاليات</h2>
          <p className="text-3xl font-bold text-accent-dark">{stats.events}</p>
        </div>
        
        <div className="bg-white p-6 rounded-custom shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-primary-text">التسجيلات</h2>
          <p className="text-3xl font-bold text-accent-dark">{stats.registrations}</p>
        </div>
        
        <div className="bg-white p-6 rounded-custom shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-primary-text">الحجوزات</h2>
          <p className="text-3xl font-bold text-accent-dark">{stats.bookings}</p>
        </div>
      </div>
    </div>
  )
}

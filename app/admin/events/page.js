'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function AdminEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const eventsRef = collection(db, 'events')
      const q = query(eventsRef, orderBy('startDate', 'asc'))
      const snapshot = await getDocs(q)
      
      const eventsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setEvents(eventsList)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(eventId) {
    if (!confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
      return
    }

    try {
      await deleteDoc(doc(db, 'events', eventId))
      setEvents(events.filter(e => e.id !== eventId))
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('حدث خطأ في حذف الفعالية')
    }
  }

  if (loading) {
    return <div className="text-center py-12">جاري التحميل...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-text">الفعاليات</h1>
        <Link 
          href="/admin/events/new"
          className="px-6 py-3 bg-accent-dark text-white rounded-custom font-semibold hover:bg-black transition-colors"
        >
          إضافة فعالية جديدة
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white p-8 rounded-custom shadow-lg text-center">
          <p className="text-xl text-gray-600">لا توجد فعاليات</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-custom shadow-lg overflow-hidden">
              {event.bannerUrl && (
                <img src={event.bannerUrl} alt={event.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary-text">{event.title}</h3>
                <div className="flex gap-2 mt-4">
                  <Link 
                    href={`/admin/events/${event.id}/edit`}
                    className="flex-1 text-center py-2 bg-accent-dark text-white rounded-custom font-semibold hover:bg-black transition-colors"
                  >
                    تعديل
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 py-2 bg-red-600 text-white rounded-custom font-semibold hover:bg-red-700 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

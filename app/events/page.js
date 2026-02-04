'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

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

  function formatDate(timestamp) {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true
    return true
  })

  return (
    <>
      <Header />
      <main>
        <section className="py-32 px-5">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-primary-text">الورش والفعاليات</h1>
            
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-custom font-semibold transition-colors ${
                  filter === 'all' 
                    ? 'bg-accent-dark text-white' 
                    : 'bg-gray-200 text-primary-text hover:bg-gray-300'
                }`}
              >
                الكل
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-xl text-primary-text">جاري التحميل...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-primary-text">لا توجد فعاليات متاحة حالياً</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-custom shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
                    {event.bannerUrl && (
                      <img 
                        src={event.bannerUrl} 
                        alt={event.title} 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-primary-text">{event.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      {event.startDate && (
                        <p className="text-sm text-accent-dark mb-4">
                          {formatDate(event.startDate)}
                        </p>
                      )}
                      <Link 
                        href={`/events/${event.id}`}
                        className="block text-center py-2 bg-accent-dark text-white rounded-custom font-semibold hover:bg-black transition-colors"
                      >
                        عرض التفاصيل
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

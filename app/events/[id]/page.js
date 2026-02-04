'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function EventDetails() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState(null)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

  async function fetchEvent() {
    try {
      const eventDoc = await getDoc(doc(db, 'events', params.id))
      if (eventDoc.exists()) {
        setEvent({ id: eventDoc.id, ...eventDoc.data() })
        
        // Fetch tickets
        const ticketsRef = collection(db, 'events', params.id, 'tickets')
        const ticketsSnapshot = await getDocs(ticketsRef)
        const ticketsList = ticketsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTickets(ticketsList)
      }
    } catch (error) {
      console.error('Error fetching event:', error)
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

  if (loading) {
    return (
      <>
        <Header />
        <main className="py-32 text-center">
          <p className="text-xl">جاري التحميل...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Header />
        <main className="py-32 text-center">
          <p className="text-xl">الفعالية غير موجودة</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <section className="py-20 px-5">
          <div className="max-w-4xl mx-auto">
            {event.bannerUrl && (
              <img 
                src={event.bannerUrl} 
                alt={event.title} 
                className="w-full h-96 object-cover rounded-custom mb-8"
              />
            )}
            
            <h1 className="text-4xl font-extrabold mb-4 text-primary-text">{event.title}</h1>
            
            {event.description && (
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{event.description}</p>
            )}
            
            <div className="bg-white p-6 rounded-custom shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 text-primary-text">معلومات الفعالية</h2>
              {event.startDate && (
                <p className="mb-2"><strong>التاريخ:</strong> {formatDate(event.startDate)}</p>
              )}
              {event.location && (
                <p className="mb-2"><strong>الموقع:</strong> {event.location}</p>
              )}
              {event.venueName && (
                <p className="mb-2"><strong>القاعة:</strong> {event.venueName}</p>
              )}
            </div>

            {tickets.length > 0 && (
              <div className="bg-white p-6 rounded-custom shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-primary-text">التذاكر</h2>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border-2 border-gray-200 rounded-custom p-4">
                      <h3 className="text-xl font-bold mb-2">{ticket.name}</h3>
                      <p className="mb-2">
                        {ticket.type === 'free' ? (
                          <span className="text-green-600 font-bold">مجاني</span>
                        ) : (
                          <span className="text-accent-dark font-bold">{ticket.price} ريال</span>
                        )}
                      </p>
                      {ticket.capacity && (
                        <p className="text-sm text-gray-600">السعة: {ticket.capacity}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    try {
      const bookingsRef = collection(db, 'bookings')
      const q = query(bookingsRef, orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      
      const bookingsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setBookings(bookingsList)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">جاري التحميل...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary-text">الحجوزات</h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-custom shadow-lg text-center">
          <p className="text-xl text-gray-600">لا توجد حجوزات</p>
        </div>
      ) : (
        <div className="bg-white rounded-custom shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-right text-primary-text font-bold">الاسم</th>
                <th className="p-4 text-right text-primary-text font-bold">البريد الإلكتروني</th>
                <th className="p-4 text-right text-primary-text font-bold">التاريخ</th>
                <th className="p-4 text-right text-primary-text font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-gray-200">
                  <td className="p-4">{booking.name || 'غير متوفر'}</td>
                  <td className="p-4">{booking.email || 'غير متوفر'}</td>
                  <td className="p-4">
                    {booking.date ? new Date(booking.date.seconds * 1000).toLocaleDateString('ar-SA') : 'غير متوفر'}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

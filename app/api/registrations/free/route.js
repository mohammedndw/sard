import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import admin from 'firebase-admin'

export async function POST(request) {
  try {
    const body = await request.json()
    const { eventId, ticketTypeId, quantity, userId, userName, userEmail } = body

    if (!eventId || !ticketTypeId || !quantity || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const ticketDoc = await db.collection('events').doc(eventId)
      .collection('tickets').doc(ticketTypeId).get()
    
    if (!ticketDoc.exists) {
      return NextResponse.json(
        { error: 'Ticket type not found' },
        { status: 404 }
      )
    }

    const ticket = ticketDoc.data()
    if (ticket.type !== 'free') {
      return NextResponse.json(
        { error: 'This ticket requires payment' },
        { status: 400 }
      )
    }

    const registrationsSnapshot = await db.collection('registrations')
      .where('eventId', '==', eventId)
      .where('ticketTypeId', '==', ticketTypeId)
      .where('status', 'in', ['pending', 'confirmed'])
      .get()

    let totalRegistered = 0
    registrationsSnapshot.forEach(doc => {
      totalRegistered += doc.data().quantity || 1
    })

    if (totalRegistered + quantity > ticket.capacity) {
      return NextResponse.json(
        { error: 'لا توجد أماكن كافية متاحة' },
        { status: 400 }
      )
    }

    const regRef = await db.collection('registrations').add({
      eventId,
      ticketTypeId,
      userId,
      userName: userName || '',
      userEmail: userEmail || '',
      quantity,
      amount: 0,
      status: 'confirmed',
      paymentStatus: 'not_required',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    return NextResponse.json({
      success: true,
      registrationId: regRef.id,
      message: 'تم التسجيل بنجاح'
    })
  } catch (error) {
    console.error('Error creating free registration:', error)
    return NextResponse.json(
      { error: 'Failed to create registration' },
      { status: 500 }
    )
  }
}

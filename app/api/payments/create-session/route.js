import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import { v4 as uuidv4 } from 'uuid'
import admin from 'firebase-admin'

export async function POST(request) {
  try {
    const body = await request.json()
    const { registrationId, eventId, ticketTypeId, quantity, userId } = body

    if (!eventId || !ticketTypeId || !quantity || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const eventDoc = await db.collection('events').doc(eventId).get()
    if (!eventDoc.exists) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
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
    const amount = ticket.price * quantity

    let regId = registrationId
    if (!regId) {
      const regRef = await db.collection('registrations').add({
        eventId,
        ticketTypeId,
        userId,
        quantity,
        amount,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      regId = regRef.id
    }

    const sessionId = uuidv4()
    await db.collection('payments').add({
      registrationId: regId,
      sessionId,
      amount,
      currency: 'SAR',
      status: 'pending',
      provider: 'generic',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    const paymentUrl = `/payment/${sessionId}?amount=${amount}&registrationId=${regId}`

    return NextResponse.json({
      success: true,
      sessionId,
      paymentUrl,
      registrationId: regId,
      amount
    })
  } catch (error) {
    console.error('Error creating payment session:', error)
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    )
  }
}

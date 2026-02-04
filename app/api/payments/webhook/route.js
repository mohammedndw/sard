import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import admin from 'firebase-admin'

export async function POST(request) {
  try {
    const body = await request.json()
    const { sessionId, status, transactionId } = body

    if (!sessionId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const paymentsSnapshot = await db.collection('payments')
      .where('sessionId', '==', sessionId)
      .limit(1)
      .get()

    if (paymentsSnapshot.empty) {
      return NextResponse.json(
        { error: 'Payment session not found' },
        { status: 404 }
      )
    }

    const paymentDoc = paymentsSnapshot.docs[0]
    const payment = paymentDoc.data()

    await paymentDoc.ref.update({
      status,
      transactionId: transactionId || null,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })

    if (status === 'completed' || status === 'success') {
      await db.collection('registrations').doc(payment.registrationId).update({
        paymentStatus: 'paid',
        status: 'confirmed',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
    } else if (status === 'failed' || status === 'cancelled') {
      await db.collection('registrations').doc(payment.registrationId).update({
        paymentStatus: 'failed',
        status: 'cancelled',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      })
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

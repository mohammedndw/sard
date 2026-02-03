import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;

admin.initializeApp({
  projectId: 'sard-283cc'
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/payments/create-session', async (req, res) => {
  try {
    const { registrationId, eventId, ticketTypeId, quantity, userId } = req.body;

    if (!eventId || !ticketTypeId || !quantity || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const eventDoc = await db.collection('events').doc(eventId).get();
    if (!eventDoc.exists) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const ticketDoc = await db.collection('events').doc(eventId)
      .collection('tickets').doc(ticketTypeId).get();
    if (!ticketDoc.exists) {
      return res.status(404).json({ error: 'Ticket type not found' });
    }

    const ticket = ticketDoc.data();
    const amount = ticket.price * quantity;

    let regId = registrationId;
    if (!regId) {
      const regRef = await db.collection('registrations').add({
        eventId,
        ticketTypeId,
        userId,
        quantity,
        amount,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      regId = regRef.id;
    }

    const sessionId = uuidv4();
    await db.collection('payments').add({
      registrationId: regId,
      sessionId,
      amount,
      currency: 'SAR',
      status: 'pending',
      provider: 'generic',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const paymentUrl = `/payment/${sessionId}?amount=${amount}&registrationId=${regId}`;

    res.json({
      success: true,
      sessionId,
      paymentUrl,
      registrationId: regId,
      amount
    });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
});

app.post('/api/payments/webhook', async (req, res) => {
  try {
    const { sessionId, status, transactionId } = req.body;

    if (!sessionId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const paymentsSnapshot = await db.collection('payments')
      .where('sessionId', '==', sessionId)
      .limit(1)
      .get();

    if (paymentsSnapshot.empty) {
      return res.status(404).json({ error: 'Payment session not found' });
    }

    const paymentDoc = paymentsSnapshot.docs[0];
    const payment = paymentDoc.data();

    await paymentDoc.ref.update({
      status,
      transactionId: transactionId || null,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    if (status === 'completed' || status === 'success') {
      await db.collection('registrations').doc(payment.registrationId).update({
        paymentStatus: 'paid',
        status: 'confirmed',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } else if (status === 'failed' || status === 'cancelled') {
      await db.collection('registrations').doc(payment.registrationId).update({
        paymentStatus: 'failed',
        status: 'cancelled',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    res.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

app.post('/api/registrations/free', async (req, res) => {
  try {
    const { eventId, ticketTypeId, quantity, userId, userName, userEmail } = req.body;

    if (!eventId || !ticketTypeId || !quantity || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ticketDoc = await db.collection('events').doc(eventId)
      .collection('tickets').doc(ticketTypeId).get();
    
    if (!ticketDoc.exists) {
      return res.status(404).json({ error: 'Ticket type not found' });
    }

    const ticket = ticketDoc.data();
    if (ticket.type !== 'free') {
      return res.status(400).json({ error: 'This ticket requires payment' });
    }

    const registrationsSnapshot = await db.collection('registrations')
      .where('eventId', '==', eventId)
      .where('ticketTypeId', '==', ticketTypeId)
      .where('status', 'in', ['pending', 'confirmed'])
      .get();

    let totalRegistered = 0;
    registrationsSnapshot.forEach(doc => {
      totalRegistered += doc.data().quantity || 1;
    });

    if (totalRegistered + quantity > ticket.capacity) {
      return res.status(400).json({ error: 'لا توجد أماكن كافية متاحة' });
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
    });

    res.json({
      success: true,
      registrationId: regRef.id,
      message: 'تم التسجيل بنجاح'
    });
  } catch (error) {
    console.error('Error creating free registration:', error);
    res.status(500).json({ error: 'Failed to create registration' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});

export { app };

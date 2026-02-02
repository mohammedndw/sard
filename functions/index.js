import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const contactMessages = [];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'الاسم مطلوب' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'البريد الإلكتروني غير صالح' });
  }

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'الرسالة مطلوبة' });
  }

  const contactEntry = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  contactMessages.push(contactEntry);
  console.log('New contact message received:', contactEntry);

  res.status(200).json({
    success: true,
    message: 'تم استلام رسالتك بنجاح',
    id: contactEntry.id
  });
});

app.get('/api/contacts', (req, res) => {
  res.json(contactMessages);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});

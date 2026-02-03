import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import '../styles/event-details.css';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  async function fetchEvent() {
    try {
      const eventDoc = await getDoc(doc(db, 'events', id));
      if (!eventDoc.exists()) {
        navigate('/events');
        return;
      }
      
      setEvent({ id: eventDoc.id, ...eventDoc.data() });
      
      const ticketsSnapshot = await getDocs(collection(db, 'events', id, 'tickets'));
      const ticketsList = ticketsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTickets(ticketsList);
      
      if (ticketsList.length > 0) {
        setSelectedTicket(ticketsList[0]);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function formatTime(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async function handleRegister() {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: `/events/${id}` } } });
      return;
    }

    if (!selectedTicket) {
      setMessage({ type: 'error', text: 'الرجاء اختيار نوع التذكرة' });
      return;
    }

    setRegistering(true);
    setMessage({ type: '', text: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      if (selectedTicket.type === 'free') {
        const response = await fetch(`${apiUrl}/api/registrations/free`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventId: id,
            ticketTypeId: selectedTicket.id,
            quantity,
            userId: currentUser.uid,
            userName: currentUser.displayName || '',
            userEmail: currentUser.email
          })
        });

        const data = await response.json();
        
        if (response.ok) {
          setMessage({ type: 'success', text: 'تم التسجيل بنجاح! ستتلقى رسالة تأكيد على بريدك الإلكتروني.' });
        } else {
          setMessage({ type: 'error', text: data.error || 'حدث خطأ في التسجيل' });
        }
      } else {
        const response = await fetch(`${apiUrl}/api/payments/create-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventId: id,
            ticketTypeId: selectedTicket.id,
            quantity,
            userId: currentUser.uid
          })
        });

        const data = await response.json();
        
        if (response.ok && data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          setMessage({ type: 'error', text: data.error || 'حدث خطأ في إنشاء جلسة الدفع' });
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', text: 'حدث خطأ في الاتصال بالخادم' });
    } finally {
      setRegistering(false);
    }
  }

  if (loading) {
    return (
      <section className="event-details-page" style={{ paddingTop: '120px' }}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>جاري التحميل...</p>
        </div>
      </section>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <section className="event-details-page" style={{ paddingTop: '120px' }}>
      <div className="event-details-container">
        <div className="event-banner">
          {event.bannerUrl ? (
            <img src={event.bannerUrl} alt={event.title} />
          ) : (
            <div className="banner-placeholder">
              <i className="fas fa-calendar-alt"></i>
            </div>
          )}
        </div>

        <div className="event-content-wrapper">
          <div className="event-main-content">
            <h1>{event.title}</h1>
            
            <div className="event-info-grid">
              <div className="info-item">
                <i className="fas fa-calendar"></i>
                <div>
                  <strong>التاريخ</strong>
                  <span>{formatDate(event.startDate)}</span>
                </div>
              </div>
              
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>الوقت</strong>
                  <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
                </div>
              </div>
              
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>الموقع</strong>
                  <span>{event.location || 'مركز سرد الثقافي'}</span>
                </div>
              </div>
              
              {event.organizer && (
                <div className="info-item">
                  <i className="fas fa-user"></i>
                  <div>
                    <strong>المنظم</strong>
                    <span>{event.organizer}</span>
                  </div>
                </div>
              )}
            </div>

            {event.description && (
              <div className="event-description">
                <h3>تفاصيل الفعالية</h3>
                <p>{event.description}</p>
              </div>
            )}

            {event.speakers && event.speakers.length > 0 && (
              <div className="event-speakers">
                <h3>المتحدثون</h3>
                <div className="speakers-list">
                  {event.speakers.map((speaker, index) => (
                    <span key={index} className="speaker-tag">{speaker}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="event-sidebar">
            <div className="ticket-selection">
              <h3>اختر التذكرة</h3>
              
              {tickets.length === 0 ? (
                <p className="no-tickets">لا توجد تذاكر متاحة حالياً</p>
              ) : (
                <>
                  <div className="tickets-list">
                    {tickets.map(ticket => (
                      <div 
                        key={ticket.id}
                        className={`ticket-option ${selectedTicket?.id === ticket.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <div className="ticket-info">
                          <h4>{ticket.name}</h4>
                          {ticket.description && <p>{ticket.description}</p>}
                        </div>
                        <div className="ticket-price">
                          {ticket.type === 'free' ? 'مجاني' : `${ticket.price} ريال`}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedTicket && (
                    <div className="quantity-selector">
                      <label>الكمية:</label>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button 
                          onClick={() => setQuantity(Math.min(selectedTicket.maxPerOrder || 10, quantity + 1))}
                          disabled={quantity >= (selectedTicket.maxPerOrder || 10)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedTicket && selectedTicket.type === 'paid' && (
                    <div className="total-price">
                      <span>المجموع:</span>
                      <strong>{selectedTicket.price * quantity} ريال</strong>
                    </div>
                  )}

                  {message.text && (
                    <div className={`message ${message.type}`}>
                      {message.text}
                    </div>
                  )}

                  <button 
                    className="register-button"
                    onClick={handleRegister}
                    disabled={registering || !selectedTicket}
                  >
                    {registering ? 'جاري المعالجة...' : 
                     selectedTicket?.type === 'free' ? 'سجل الآن' : 'اشترِ الآن'}
                  </button>

                  {!currentUser && (
                    <p className="login-prompt">
                      يجب <a href="/login">تسجيل الدخول</a> للتسجيل في الفعالية
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;

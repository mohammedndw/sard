import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('startDate', 'asc'));
      const snapshot = await getDocs(q);
      
      const eventsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setEvents(eventsList);
    } catch (error) {
      console.error('Error fetching events:', error);
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

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'free') return event.ticketType === 'free';
    if (filter === 'paid') return event.ticketType === 'paid';
    return true;
  });

  if (loading) {
    return (
      <section className="events-page" style={{ paddingTop: '120px' }}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>جاري تحميل الفعاليات...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="events-page" style={{ paddingTop: '120px' }}>
      <div className="events-container">
        <div className="events-header">
          <h1>الفعاليات والورش</h1>
          <p>اكتشف فعالياتنا القادمة وسجل الآن</p>
        </div>

        <div className="events-filter">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            الكل
          </button>
          <button 
            className={filter === 'free' ? 'active' : ''} 
            onClick={() => setFilter('free')}
          >
            مجاني
          </button>
          <button 
            className={filter === 'paid' ? 'active' : ''} 
            onClick={() => setFilter('paid')}
          >
            مدفوع
          </button>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <h3>لا توجد فعاليات حالياً</h3>
            <p>تابعنا لمعرفة الفعاليات القادمة</p>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <Link to={`/events/${event.id}`} key={event.id} className="event-card">
                <div className="event-image">
                  {event.bannerUrl ? (
                    <img src={event.bannerUrl} alt={event.title} />
                  ) : (
                    <div className="event-placeholder">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                  )}
                  <span className={`event-badge ${event.ticketType}`}>
                    {event.ticketType === 'free' ? 'مجاني' : 'مدفوع'}
                  </span>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span className="event-date">
                      <i className="fas fa-calendar"></i>
                      {formatDate(event.startDate)}
                    </span>
                    <span className="event-time">
                      <i className="fas fa-clock"></i>
                      {formatTime(event.startDate)}
                    </span>
                    <span className="event-location">
                      <i className="fas fa-map-marker-alt"></i>
                      {event.location || 'مركز سرد الثقافي'}
                    </span>
                  </div>
                  {event.ticketType === 'paid' && event.price && (
                    <div className="event-price">
                      {event.price} ريال
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;

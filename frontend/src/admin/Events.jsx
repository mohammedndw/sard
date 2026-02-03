import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const q = query(collection(db, 'events'), orderBy('startDate', 'desc'));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(eventId) {
    if (!window.confirm('هل أنت متأكد من حذف هذه الفعالية؟')) return;
    
    setDeleting(eventId);
    try {
      await deleteDoc(doc(db, 'events', eventId));
      setEvents(events.filter(e => e.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('حدث خطأ في حذف الفعالية');
    } finally {
      setDeleting(null);
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ar-SA');
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>إدارة الفعاليات</h1>
        <Link to="/admin/events/new" className="btn btn-primary">
          <i className="fas fa-plus"></i>
          إضافة فعالية
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-calendar-alt"></i>
          <h3>لا توجد فعاليات</h3>
          <p>ابدأ بإضافة فعالية جديدة</p>
          <Link to="/admin/events/new" className="btn btn-primary">
            إضافة فعالية
          </Link>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>العنوان</th>
                <th>التاريخ</th>
                <th>الموقع</th>
                <th>نوع التذكرة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>
                    <div className="event-title-cell">
                      {event.bannerUrl && (
                        <img src={event.bannerUrl} alt="" className="event-thumb" />
                      )}
                      <span>{event.title}</span>
                    </div>
                  </td>
                  <td>{formatDate(event.startDate)}</td>
                  <td>{event.location || '-'}</td>
                  <td>
                    <span className={`badge ${event.ticketType}`}>
                      {event.ticketType === 'free' ? 'مجاني' : 'مدفوع'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/events/${event.id}/edit`} className="btn btn-sm btn-secondary">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <Link to={`/admin/events/${event.id}/registrations`} className="btn btn-sm btn-info">
                        <i className="fas fa-users"></i>
                      </Link>
                      <Link to={`/admin/events/${event.id}/attendees`} className="btn btn-sm btn-success">
                        <i className="fas fa-check-circle"></i>
                      </Link>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="btn btn-sm btn-danger"
                        disabled={deleting === event.id}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminEvents;

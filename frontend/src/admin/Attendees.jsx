import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

function AdminAttendees() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const eventDoc = await getDoc(doc(db, 'events', id));
      if (eventDoc.exists()) {
        setEvent({ id: eventDoc.id, ...eventDoc.data() });
      }

      const q = query(
        collection(db, 'registrations'),
        where('eventId', '==', id),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      setRegistrations(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (error) {
      console.error('Error fetching attendees:', error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsAttended(regId) {
    setUpdating(regId);
    try {
      await updateDoc(doc(db, 'registrations', regId), {
        status: 'attended'
      });
      setRegistrations(registrations.map(r => 
        r.id === regId ? { ...r, status: 'attended' } : r
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('حدث خطأ في تحديث الحالة');
    } finally {
      setUpdating(null);
    }
  }

  const confirmedRegistrations = registrations.filter(r => 
    r.status === 'confirmed' || r.status === 'attended'
  );

  const filteredRegistrations = confirmedRegistrations.filter(r => {
    const matchesSearch = 
      (r.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (r.userEmail?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || r.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const attendedCount = registrations.filter(r => r.status === 'attended').length;
  const totalConfirmed = confirmedRegistrations.length;

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
        <div>
          <Link to="/admin/events" className="back-link">
            <i className="fas fa-arrow-right"></i> العودة للفعاليات
          </Link>
          <h1>الحضور: {event?.title}</h1>
        </div>
      </div>

      <div className="stats-row">
        <div className="mini-stat">
          <strong>{totalConfirmed}</strong>
          <span>المسجلون</span>
        </div>
        <div className="mini-stat attended">
          <strong>{attendedCount}</strong>
          <span>حضروا</span>
        </div>
        <div className="mini-stat pending">
          <strong>{totalConfirmed - attendedCount}</strong>
          <span>لم يحضروا بعد</span>
        </div>
        <div className="mini-stat">
          <strong>{totalConfirmed > 0 ? Math.round((attendedCount / totalConfirmed) * 100) : 0}%</strong>
          <span>نسبة الحضور</span>
        </div>
      </div>

      <div className="filters-row">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={filterStatus === 'all' ? 'active' : ''}
            onClick={() => setFilterStatus('all')}
          >
            الكل
          </button>
          <button 
            className={filterStatus === 'confirmed' ? 'active' : ''}
            onClick={() => setFilterStatus('confirmed')}
          >
            لم يحضر
          </button>
          <button 
            className={filterStatus === 'attended' ? 'active' : ''}
            onClick={() => setFilterStatus('attended')}
          >
            حضر
          </button>
        </div>
      </div>

      {filteredRegistrations.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-user-check"></i>
          <h3>لا توجد نتائج</h3>
          <p>لم يتم العثور على مسجلين مطابقين</p>
        </div>
      ) : (
        <div className="attendees-grid">
          {filteredRegistrations.map(reg => (
            <div key={reg.id} className={`attendee-card ${reg.status}`}>
              <div className="attendee-info">
                <div className="attendee-avatar">
                  {(reg.userName || 'U')[0].toUpperCase()}
                </div>
                <div className="attendee-details">
                  <h4>{reg.userName || 'مستخدم'}</h4>
                  <p>{reg.userEmail || '-'}</p>
                  <span className="ticket-count">{reg.quantity || 1} تذكرة</span>
                </div>
              </div>
              <div className="attendee-actions">
                {reg.status === 'attended' ? (
                  <span className="attended-badge">
                    <i className="fas fa-check-circle"></i> حضر
                  </span>
                ) : (
                  <button
                    onClick={() => markAsAttended(reg.id)}
                    disabled={updating === reg.id}
                    className="btn btn-success"
                  >
                    {updating === reg.id ? 'جاري...' : 'تسجيل الحضور'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminAttendees;

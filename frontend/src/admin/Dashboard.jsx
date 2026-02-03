import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    paidRegistrations: 0,
    freeRegistrations: 0,
    pendingBookings: 0
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const registrationsSnapshot = await getDocs(collection(db, 'registrations'));
      
      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('status', '==', 'new')
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);

      let paidCount = 0;
      let freeCount = 0;
      registrationsSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.paymentStatus === 'paid') {
          paidCount++;
        } else if (data.paymentStatus === 'not_required') {
          freeCount++;
        }
      });

      setStats({
        totalEvents: eventsSnapshot.size,
        totalRegistrations: registrationsSnapshot.size,
        paidRegistrations: paidCount,
        freeRegistrations: freeCount,
        pendingBookings: bookingsSnapshot.size
      });

      const upcomingQuery = query(
        collection(db, 'events'),
        orderBy('startDate', 'asc'),
        limit(5)
      );
      const upcomingSnapshot = await getDocs(upcomingQuery);
      setUpcomingEvents(upcomingSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));

      const recentQuery = query(
        collection(db, 'registrations'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const recentSnapshot = await getDocs(recentQuery);
      setRecentRegistrations(recentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
        <h1>لوحة التحكم</h1>
        <Link to="/admin/events/new" className="btn btn-primary">
          <i className="fas fa-plus"></i>
          إضافة فعالية
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon events">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalEvents}</h3>
            <p>إجمالي الفعاليات</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon registrations">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalRegistrations}</h3>
            <p>إجمالي التسجيلات</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon paid">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.paidRegistrations}</h3>
            <p>تسجيلات مدفوعة</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon free">
            <i className="fas fa-gift"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.freeRegistrations}</h3>
            <p>تسجيلات مجانية</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bookings">
            <i className="fas fa-building"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.pendingBookings}</h3>
            <p>طلبات حجز جديدة</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>الفعاليات القادمة</h2>
            <Link to="/admin/events">عرض الكل</Link>
          </div>
          <div className="card-content">
            {upcomingEvents.length === 0 ? (
              <p className="empty-message">لا توجد فعاليات قادمة</p>
            ) : (
              <ul className="event-list">
                {upcomingEvents.map(event => (
                  <li key={event.id}>
                    <Link to={`/admin/events/${event.id}/edit`}>
                      <span className="event-title">{event.title}</span>
                      <span className="event-date">{formatDate(event.startDate)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>آخر التسجيلات</h2>
          </div>
          <div className="card-content">
            {recentRegistrations.length === 0 ? (
              <p className="empty-message">لا توجد تسجيلات بعد</p>
            ) : (
              <ul className="registration-list">
                {recentRegistrations.map(reg => (
                  <li key={reg.id}>
                    <div className="reg-info">
                      <span className="reg-name">{reg.userName || reg.userEmail || 'مستخدم'}</span>
                      <span className="reg-date">{formatDate(reg.createdAt)}</span>
                    </div>
                    <span className={`status-badge ${reg.status}`}>
                      {reg.status === 'confirmed' ? 'مؤكد' : 
                       reg.status === 'pending' ? 'قيد الانتظار' : 
                       reg.status === 'cancelled' ? 'ملغي' : reg.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

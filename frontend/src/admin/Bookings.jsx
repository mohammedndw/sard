import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setBookings(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(bookingId, newStatus) {
    setUpdating(bookingId);
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: newStatus
      });
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('حدث خطأ في تحديث الحالة');
    } finally {
      setUpdating(null);
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ar-SA');
  }

  function getStatusLabel(status) {
    const labels = {
      new: 'جديد',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      completed: 'مكتمل'
    };
    return labels[status] || status;
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
        <h1>طلبات الحجز</h1>
      </div>

      <div className="stats-row">
        <div className="mini-stat">
          <strong>{bookings.length}</strong>
          <span>إجمالي الطلبات</span>
        </div>
        <div className="mini-stat new">
          <strong>{bookings.filter(b => b.status === 'new').length}</strong>
          <span>جديد</span>
        </div>
        <div className="mini-stat approved">
          <strong>{bookings.filter(b => b.status === 'approved').length}</strong>
          <span>موافق عليه</span>
        </div>
        <div className="mini-stat completed">
          <strong>{bookings.filter(b => b.status === 'completed').length}</strong>
          <span>مكتمل</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-building"></i>
          <h3>لا توجد طلبات حجز</h3>
          <p>لم يتم استلام أي طلبات حجز بعد</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>التاريخ المطلوب</th>
                <th>التفاصيل</th>
                <th>الحالة</th>
                <th>تاريخ الطلب</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.name || '-'}</td>
                  <td>{booking.email || '-'}</td>
                  <td>{booking.requestedDate || '-'}</td>
                  <td className="details-cell">{booking.details || '-'}</td>
                  <td>
                    <span className={`badge booking-${booking.status}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </td>
                  <td>{formatDate(booking.createdAt)}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      disabled={updating === booking.id}
                      className="status-select"
                    >
                      <option value="new">جديد</option>
                      <option value="approved">موافق عليه</option>
                      <option value="rejected">مرفوض</option>
                      <option value="completed">مكتمل</option>
                    </select>
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

export default AdminBookings;

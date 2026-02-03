import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

function AdminRegistrations() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

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
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(regId, newStatus) {
    setUpdating(regId);
    try {
      await updateDoc(doc(db, 'registrations', regId), {
        status: newStatus
      });
      setRegistrations(registrations.map(r => 
        r.id === regId ? { ...r, status: newStatus } : r
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
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      cancelled: 'ملغي',
      attended: 'حضر'
    };
    return labels[status] || status;
  }

  function getPaymentLabel(status) {
    const labels = {
      pending: 'قيد الانتظار',
      paid: 'مدفوع',
      failed: 'فشل',
      not_required: 'غير مطلوب'
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
        <div>
          <Link to="/admin/events" className="back-link">
            <i className="fas fa-arrow-right"></i> العودة للفعاليات
          </Link>
          <h1>التسجيلات: {event?.title}</h1>
        </div>
      </div>

      <div className="stats-row">
        <div className="mini-stat">
          <strong>{registrations.length}</strong>
          <span>إجمالي التسجيلات</span>
        </div>
        <div className="mini-stat">
          <strong>{registrations.filter(r => r.status === 'confirmed').length}</strong>
          <span>مؤكد</span>
        </div>
        <div className="mini-stat">
          <strong>{registrations.filter(r => r.status === 'pending').length}</strong>
          <span>قيد الانتظار</span>
        </div>
        <div className="mini-stat">
          <strong>{registrations.reduce((sum, r) => sum + (r.quantity || 1), 0)}</strong>
          <span>إجمالي التذاكر</span>
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-users"></i>
          <h3>لا توجد تسجيلات</h3>
          <p>لم يتم التسجيل في هذه الفعالية بعد</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الكمية</th>
                <th>حالة الدفع</th>
                <th>الحالة</th>
                <th>التاريخ</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(reg => (
                <tr key={reg.id}>
                  <td>{reg.userName || '-'}</td>
                  <td>{reg.userEmail || '-'}</td>
                  <td>{reg.quantity || 1}</td>
                  <td>
                    <span className={`badge payment-${reg.paymentStatus}`}>
                      {getPaymentLabel(reg.paymentStatus)}
                    </span>
                  </td>
                  <td>
                    <span className={`badge status-${reg.status}`}>
                      {getStatusLabel(reg.status)}
                    </span>
                  </td>
                  <td>{formatDate(reg.createdAt)}</td>
                  <td>
                    <select
                      value={reg.status}
                      onChange={(e) => updateStatus(reg.id, e.target.value)}
                      disabled={updating === reg.id}
                      className="status-select"
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="confirmed">مؤكد</option>
                      <option value="cancelled">ملغي</option>
                      <option value="attended">حضر</option>
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

export default AdminRegistrations;

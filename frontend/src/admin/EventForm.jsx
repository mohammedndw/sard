import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection, getDocs, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

function AdminEventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    venueName: '',
    bannerUrl: '',
    logoUrl: '',
    categories: [],
    organizer: '',
    speakers: [],
    ticketType: 'free'
  });

  const [tickets, setTickets] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newSpeaker, setNewSpeaker] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchEvent();
    }
  }, [id]);

  async function fetchEvent() {
    try {
      const eventDoc = await getDoc(doc(db, 'events', id));
      if (!eventDoc.exists()) {
        navigate('/admin/events');
        return;
      }

      const data = eventDoc.data();
      const startDate = data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate);
      const endDate = data.endDate?.toDate ? data.endDate.toDate() : new Date(data.endDate);

      setEventData({
        ...data,
        startDate: startDate.toISOString().split('T')[0],
        startTime: startDate.toTimeString().slice(0, 5),
        endDate: endDate.toISOString().split('T')[0],
        endTime: endDate.toTimeString().slice(0, 5),
        categories: data.categories || [],
        speakers: data.speakers || []
      });

      const ticketsSnapshot = await getDocs(collection(db, 'events', id, 'tickets'));
      setTickets(ticketsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  }

  async function handleImageUpload(e, type) {
    const file = e.target.files[0];
    if (!file) return;

    const setter = type === 'banner' ? setUploadingBanner : setUploadingLogo;
    setter(true);

    try {
      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `events/${filename}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setEventData({
        ...eventData,
        [type === 'banner' ? 'bannerUrl' : 'logoUrl']: url
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ في رفع الصورة');
    } finally {
      setter(false);
    }
  }

  function addCategory() {
    if (newCategory.trim() && !eventData.categories.includes(newCategory.trim())) {
      setEventData({
        ...eventData,
        categories: [...eventData.categories, newCategory.trim()]
      });
      setNewCategory('');
    }
  }

  function removeCategory(cat) {
    setEventData({
      ...eventData,
      categories: eventData.categories.filter(c => c !== cat)
    });
  }

  function addSpeaker() {
    if (newSpeaker.trim() && !eventData.speakers.includes(newSpeaker.trim())) {
      setEventData({
        ...eventData,
        speakers: [...eventData.speakers, newSpeaker.trim()]
      });
      setNewSpeaker('');
    }
  }

  function removeSpeaker(speaker) {
    setEventData({
      ...eventData,
      speakers: eventData.speakers.filter(s => s !== speaker)
    });
  }

  function addTicket() {
    setTickets([...tickets, {
      id: `new_${Date.now()}`,
      name: '',
      type: 'free',
      price: 0,
      capacity: 100,
      minPerOrder: 1,
      maxPerOrder: 10,
      description: '',
      isNew: true
    }]);
  }

  function updateTicket(index, field, value) {
    const updated = [...tickets];
    updated[index] = { ...updated[index], [field]: value };
    setTickets(updated);
  }

  function removeTicket(index) {
    setTickets(tickets.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const startDateTime = new Date(`${eventData.startDate}T${eventData.startTime}`);
      const endDateTime = new Date(`${eventData.endDate}T${eventData.endTime}`);

      const eventPayload = {
        title: eventData.title,
        description: eventData.description,
        startDate: Timestamp.fromDate(startDateTime),
        endDate: Timestamp.fromDate(endDateTime),
        location: eventData.location,
        venueName: eventData.venueName,
        bannerUrl: eventData.bannerUrl,
        logoUrl: eventData.logoUrl,
        categories: eventData.categories,
        organizer: eventData.organizer,
        speakers: eventData.speakers,
        ticketType: eventData.ticketType,
        updatedAt: serverTimestamp()
      };

      let eventId = id;

      if (isEditing) {
        await setDoc(doc(db, 'events', id), eventPayload, { merge: true });
      } else {
        eventPayload.createdAt = serverTimestamp();
        const newDoc = await addDoc(collection(db, 'events'), eventPayload);
        eventId = newDoc.id;
      }

      for (const ticket of tickets) {
        const ticketData = {
          name: ticket.name,
          type: ticket.type,
          price: ticket.type === 'paid' ? Number(ticket.price) : 0,
          capacity: Number(ticket.capacity),
          minPerOrder: Number(ticket.minPerOrder),
          maxPerOrder: Number(ticket.maxPerOrder),
          description: ticket.description
        };

        if (ticket.isNew) {
          await addDoc(collection(db, 'events', eventId, 'tickets'), ticketData);
        } else {
          await setDoc(doc(db, 'events', eventId, 'tickets', ticket.id), ticketData);
        }
      }

      navigate('/admin/events');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('حدث خطأ في حفظ الفعالية');
    } finally {
      setSaving(false);
    }
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
        <h1>{isEditing ? 'تعديل الفعالية' : 'إضافة فعالية جديدة'}</h1>
      </div>

      <div className="form-steps">
        <button 
          className={`step ${step === 1 ? 'active' : ''}`}
          onClick={() => setStep(1)}
        >
          1. تفاصيل الفعالية
        </button>
        <button 
          className={`step ${step === 2 ? 'active' : ''}`}
          onClick={() => setStep(2)}
        >
          2. التذاكر
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        {step === 1 && (
          <div className="form-section">
            <div className="form-group">
              <label>عنوان الفعالية *</label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
                placeholder="أدخل عنوان الفعالية"
              />
            </div>

            <div className="form-group">
              <label>الوصف</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                rows={5}
                placeholder="أدخل وصف الفعالية"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>تاريخ البدء *</label>
                <input
                  type="date"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>وقت البدء *</label>
                <input
                  type="time"
                  name="startTime"
                  value={eventData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>تاريخ الانتهاء *</label>
                <input
                  type="date"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>وقت الانتهاء *</label>
                <input
                  type="time"
                  name="endTime"
                  value={eventData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>الموقع</label>
                <input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  placeholder="مثال: الرياض، المملكة العربية السعودية"
                />
              </div>
              <div className="form-group">
                <label>اسم المكان</label>
                <input
                  type="text"
                  name="venueName"
                  value={eventData.venueName}
                  onChange={handleChange}
                  placeholder="مثال: مركز سرد الثقافي"
                />
              </div>
            </div>

            <div className="form-group">
              <label>المنظم</label>
              <input
                type="text"
                name="organizer"
                value={eventData.organizer}
                onChange={handleChange}
                placeholder="اسم المنظم"
              />
            </div>

            <div className="form-group">
              <label>صورة البانر</label>
              <div className="image-upload">
                {eventData.bannerUrl && (
                  <img src={eventData.bannerUrl} alt="Banner" className="preview-image" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'banner')}
                  disabled={uploadingBanner}
                />
                {uploadingBanner && <span>جاري الرفع...</span>}
              </div>
            </div>

            <div className="form-group">
              <label>شعار الفعالية</label>
              <div className="image-upload">
                {eventData.logoUrl && (
                  <img src={eventData.logoUrl} alt="Logo" className="preview-image small" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  disabled={uploadingLogo}
                />
                {uploadingLogo && <span>جاري الرفع...</span>}
              </div>
            </div>

            <div className="form-group">
              <label>التصنيفات</label>
              <div className="tags-input">
                {eventData.categories.map((cat, i) => (
                  <span key={i} className="tag">
                    {cat}
                    <button type="button" onClick={() => removeCategory(cat)}>&times;</button>
                  </span>
                ))}
                <div className="tag-add">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="أضف تصنيف"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                  />
                  <button type="button" onClick={addCategory}>+</button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>المتحدثون</label>
              <div className="tags-input">
                {eventData.speakers.map((speaker, i) => (
                  <span key={i} className="tag">
                    {speaker}
                    <button type="button" onClick={() => removeSpeaker(speaker)}>&times;</button>
                  </span>
                ))}
                <div className="tag-add">
                  <input
                    type="text"
                    value={newSpeaker}
                    onChange={(e) => setNewSpeaker(e.target.value)}
                    placeholder="أضف متحدث"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpeaker())}
                  />
                  <button type="button" onClick={addSpeaker}>+</button>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setStep(2)} className="btn btn-primary">
                التالي: التذاكر
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <div className="tickets-section">
              <div className="section-header">
                <h3>التذاكر</h3>
                <button type="button" onClick={addTicket} className="btn btn-secondary">
                  <i className="fas fa-plus"></i> إضافة تذكرة
                </button>
              </div>

              {tickets.length === 0 ? (
                <div className="empty-tickets">
                  <p>لم تتم إضافة تذاكر بعد</p>
                  <button type="button" onClick={addTicket} className="btn btn-primary">
                    إضافة تذكرة
                  </button>
                </div>
              ) : (
                <div className="tickets-list">
                  {tickets.map((ticket, index) => (
                    <div key={ticket.id} className="ticket-form-card">
                      <div className="ticket-header">
                        <h4>تذكرة {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeTicket(index)}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>اسم التذكرة *</label>
                          <input
                            type="text"
                            value={ticket.name}
                            onChange={(e) => updateTicket(index, 'name', e.target.value)}
                            required
                            placeholder="مثال: تذكرة عادية"
                          />
                        </div>
                        <div className="form-group">
                          <label>نوع التذكرة</label>
                          <select
                            value={ticket.type}
                            onChange={(e) => updateTicket(index, 'type', e.target.value)}
                          >
                            <option value="free">مجاني</option>
                            <option value="paid">مدفوع</option>
                          </select>
                        </div>
                      </div>

                      {ticket.type === 'paid' && (
                        <div className="form-group">
                          <label>السعر (ريال) *</label>
                          <input
                            type="number"
                            value={ticket.price}
                            onChange={(e) => updateTicket(index, 'price', e.target.value)}
                            min="0"
                            required
                          />
                        </div>
                      )}

                      <div className="form-row">
                        <div className="form-group">
                          <label>السعة</label>
                          <input
                            type="number"
                            value={ticket.capacity}
                            onChange={(e) => updateTicket(index, 'capacity', e.target.value)}
                            min="1"
                          />
                        </div>
                        <div className="form-group">
                          <label>الحد الأدنى للطلب</label>
                          <input
                            type="number"
                            value={ticket.minPerOrder}
                            onChange={(e) => updateTicket(index, 'minPerOrder', e.target.value)}
                            min="1"
                          />
                        </div>
                        <div className="form-group">
                          <label>الحد الأقصى للطلب</label>
                          <input
                            type="number"
                            value={ticket.maxPerOrder}
                            onChange={(e) => updateTicket(index, 'maxPerOrder', e.target.value)}
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>وصف التذكرة</label>
                        <textarea
                          value={ticket.description}
                          onChange={(e) => updateTicket(index, 'description', e.target.value)}
                          rows={2}
                          placeholder="وصف مختصر للتذكرة"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
                السابق
              </button>
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? 'جاري الحفظ...' : isEditing ? 'حفظ التعديلات' : 'إنشاء الفعالية'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default AdminEventForm;

import { useState } from 'react'
import '../styles/contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: null })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null })
        setFormData({ name: '', email: '', address: '', phone: '', message: '' })
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'حدث خطأ' })
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'فشل في الاتصال بالخادم' })
    }
  }

  return (
    <section className="contact-page" style={{ paddingTop: '100px' }}>
      <div className="section-inner-container">
        <div className="contact-info-cards">
          <div className="card email-card">
            <div className="icon-box"><i className="fas fa-envelope"></i></div>
            <h3 className="card-title">البريد الإلكتروني</h3>
            <p><a href="mailto:info@sardculturalc.com">info@sardculturalc.com</a></p>
          </div>

          <div className="card address-card">
            <div className="icon-box"><i className="fas fa-map-marker-alt"></i></div>
            <h3 className="card-title">العنوان</h3>
            <p>مركز سرد الثقافي - جامعة الملك سعود</p>
            <p className="subtitle">(الرياض، المملكة العربية السعودية)</p>
          </div>

          <div className="card phone-card">
            <div className="icon-box"><i className="fas fa-phone"></i></div>
            <h3 className="card-title">رقم الجوال</h3>
            <p><a href="tel:+966541333413">+966 54 1333413</a></p>
            <p className="subtitle">(للاتصال والدعم الفني والاستفسارات)</p>
          </div>
        </div>

        <div className="content-section">
          <div className="form-container">
            <h2>كن دائمًا على تواصل</h2>
            <p className="intro-text">
              نحن نطمح دائماً إلى الاستماع منك ومساعدتك فيما تحتاج.<br />
              إذا كان لديك أي استفسار أو اقتراح، فلا تتردد في التواصل معنا هنا لنقدم لك الدعم الذي تحتاجه.
            </p>

            {status.success && (
              <div className="success-message">
                تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
              </div>
            )}

            {status.error && (
              <div className="error-message">
                {status.error}
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group-row">
                <input 
                  type="text" 
                  name="name"
                  placeholder="الاسم بالكامل" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="البريد الإلكتروني" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-row">
                <input 
                  type="text" 
                  name="address"
                  placeholder="العنوان" 
                  value={formData.address}
                  onChange={handleChange}
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="رقم الجوال" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <textarea 
                name="message"
                placeholder="التفاصيل" 
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit" disabled={status.loading}>
                {status.loading ? 'جاري الإرسال...' : 'إرسال'}
              </button>
            </form>
          </div>

          <div className="image-container">
            <img src="/assets/countact2.jpg" alt="صورة توضيحية لمركز سرد" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

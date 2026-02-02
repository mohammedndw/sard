import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>تابعونا</h3>
          <div className="social-icons">
            <a href="https://twitter.com/alsard_center" target="_blank" rel="noopener noreferrer" aria-label="حساب مركز سرد على تويتر">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://www.instagram.com/al_sard_cultural_center/" target="_blank" rel="noopener noreferrer" aria-label="حساب مركز سرد على انستغرام">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.snapchat.com/@sardculturalc" target="_blank" rel="noopener noreferrer" aria-label="حساب مركز سرد على سناب شات">
              <i className="fa-brands fa-snapchat"></i>
            </a>
            <a href="https://www.tiktok.com/@sardculturalc" target="_blank" rel="noopener noreferrer" aria-label="حساب مركز سرد على تيك توك">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="https://www.youtube.com/@SardCulturalC" target="_blank" rel="noopener noreferrer" aria-label="قناة مركز سرد على يوتيوب">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>تواصل معنا</h3>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <a href="https://maps.app.goo.gl/ZXvBnfAQuooKQp737" target="_blank" rel="noopener noreferrer">
              مركز سرد الثقافي - جامعة الملك سعود
            </a>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <a href="tel:+966541333413">+966 54 1333413</a>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href="mailto:info@sardculturalc.com">info@sardculturalc.com</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>روابط سريعة</h3>
          <ul className="footer-links">
            <li><Link to="/courses">جميع الدورات</Link></li>
            <li><Link to="/booking">الورش والفعاليات</Link></li>
            <li><Link to="/">سياسة الخصوصية</Link></li>
            <li><Link to="/">شروط الاستخدام</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 جميع الحقوق محفوظة لمركز سرد الثقافي</p>
      </div>
    </footer>
  )
}

export default Footer

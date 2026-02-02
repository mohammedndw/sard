import { Link } from 'react-router-dom'
import '../styles/services.css'

const services = [
  { id: 1, name: 'تأجير المسرح', image: '/assets/service1.jpg' },
  { id: 2, name: 'مسرح سرد', image: '/assets/service2.jpg' },
  { id: 3, name: 'الورش', image: '/assets/service3.jpg' },
  { id: 4, name: 'بهو سرد', image: '/assets/contact1.jpg' },
  { id: 5, name: 'مسرح العارض', image: '/assets/service4.jpg' },
]

function Services() {
  return (
    <section style={{ paddingTop: '100px' }}>
      <h2 className="page-title">الخدمات لدينا</h2>
      <div className="courses-container">
        {services.map((service) => (
          <div className="courses-card" key={service.id}>
            <div className="courses-img">
              <img src={service.image} alt={service.name} />
            </div>
            <h3>{service.name}</h3>
            <div className="courses-bottom">
              <Link to="/services" className="detail-btn">لمزيد من التفاصيل</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services

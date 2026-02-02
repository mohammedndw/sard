import { Link } from 'react-router-dom'
import '../styles/courses.css'

const courseCategories = [
  { id: 1, name: 'الدورات الموسيقية', link: '/musical-courses' },
  { id: 2, name: 'الدورات الفنية', link: '/courses' },
  { id: 3, name: 'المسرح والتمثيل', link: '/courses' },
  { id: 4, name: 'الدورات التصويرية', link: '/courses' },
]

function Courses() {
  return (
    <section style={{ paddingTop: '100px' }}>
      <h2 className="page-title">دوراتنا التعليمية</h2>
      <div className="courses-container">
        {courseCategories.map((category) => (
          <div className="courses-card" key={category.id}>
            <div className="courses-img">
              <img src="/assets/courses.png" alt={category.name} />
            </div>
            <h3>{category.name}</h3>
            <div className="courses-bottom">
              <Link to={category.link} className="detail-btn">لمزيد من التفاصيل</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Courses

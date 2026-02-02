import { Link } from 'react-router-dom'
import '../styles/courses.css'

const musicalCourses = [
  { id: 1, name: 'دورة الجيتار', image: '/assets/courses.png' },
  { id: 2, name: 'دورة البيانو', image: '/assets/courses.png' },
  { id: 3, name: 'دورة العود', image: '/assets/courses.png' },
]

function MusicalCourses() {
  return (
    <section style={{ paddingTop: '100px' }}>
      <h2 className="page-title">الدورات الموسيقية</h2>
      <div className="courses-container">
        {musicalCourses.map((course) => (
          <div className="courses-card" key={course.id}>
            <div className="courses-img">
              <img src={course.image} alt={course.name} />
            </div>
            <h3>{course.name}</h3>
            <div className="courses-bottom">
              <Link to="/courses" className="detail-btn">لمزيد من التفاصيل</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MusicalCourses

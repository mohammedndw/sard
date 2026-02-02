import { Link } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleDropdownEnter = (name) => {
    setOpenDropdown(name)
  }

  const handleDropdownLeave = () => {
    setOpenDropdown(null)
  }

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/assets/Sard_Arbab_logo.svg" alt="شعار مركز سرد الثقافي" />
        </Link>
      </div>
      <nav aria-label="قائمة التنقل الرئيسية">
        <ul id="menu">
          <li><Link to="/">الرئيسية</Link></li>
          <li><Link to="/about">من نحن</Link></li>
          
          <li 
            className="dropdown"
            onMouseEnter={() => handleDropdownEnter('services')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/services">خدمتنا</Link>
            <ul className={`dropdown-menu ${openDropdown === 'services' ? 'show' : ''}`}>
              <li><Link to="/services">تأجير المسرح</Link></li>
              <li><Link to="/services">مسرح سرد</Link></li>
              <li><Link to="/services">الورش</Link></li>
              <li><Link to="/services">بهو سرد</Link></li>
              <li><Link to="/services">مسرح العارض</Link></li>
            </ul>
          </li>

          <li 
            className="dropdown"
            onMouseEnter={() => handleDropdownEnter('courses')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/courses">دورات</Link>
            <ul className={`dropdown-menu ${openDropdown === 'courses' ? 'show' : ''}`}>
              <li><Link to="/musical-courses">الدورات الموسيقية</Link></li>
              <li><Link to="/courses">الدورات الفنية</Link></li>
              <li><Link to="/courses">المسرح والتمثيل</Link></li>
              <li><Link to="/courses">الدورات التصويرية</Link></li>
            </ul>
          </li>

          <li 
            className="dropdown"
            onMouseEnter={() => handleDropdownEnter('events')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link to="/booking">الورش والفعاليات</Link>
            <ul className={`dropdown-menu ${openDropdown === 'events' ? 'show' : ''}`}>
              <li><Link to="/calendar">التقويم</Link></li>
            </ul>
          </li>

          <li><a href="https://center-site.com" target="_blank" rel="noopener noreferrer">معهد لعب</a></li>
          <li><a href="https://library-site.com" target="_blank" rel="noopener noreferrer">أدبي الرياض</a></li>
          <li><Link to="/contact">تواصل معنا</Link></li>
        </ul>
      </nav>
      
      <div className="header-controls">
        <Link to="/cart" className="cart-icon" aria-label="سلة الشراء">
          <i className="fas fa-shopping-cart"></i>
        </Link>
        <button id="langBtn">English</button>
      </div>
    </header>
  )
}

export default Header

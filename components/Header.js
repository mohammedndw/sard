'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null)
  const auth = useAuth() || {}
  const { currentUser = null, isAdmin = false, logout = () => {} } = auth
  const router = useRouter()

  const handleDropdownEnter = (name) => {
    setOpenDropdown(name)
  }

  const handleDropdownLeave = () => {
    setOpenDropdown(null)
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-black text-white py-4 px-8 flex items-center justify-between shadow-lg sticky top-0 z-50">
      <div className="logo">
        <Link href="/">
          <img src="/assets/Sard_Arbab_logo.svg" alt="شعار مركز سرد الثقافي" className="h-12 brightness-0 invert" />
        </Link>
      </div>
      <nav aria-label="قائمة التنقل الرئيسية" className="flex-grow flex justify-center">
        <ul className="list-none flex gap-3">
          <li><Link href="/" className="text-white text-lg font-bold hover:text-accent-dark transition-colors">الرئيسية</Link></li>
          <li><Link href="/about" className="text-white text-lg font-bold hover:text-accent-dark transition-colors">من نحن</Link></li>
          
          <li 
            className="relative"
            onMouseEnter={() => handleDropdownEnter('services')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link href="/services" className="text-white text-lg font-bold hover:text-accent-dark transition-colors">خدمتنا</Link>
            {openDropdown === 'services' && (
              <ul className="absolute top-full right-0 bg-black min-w-[180px] py-2 rounded-custom mt-1 shadow-xl">
                <li><Link href="/services" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">تأجير المسرح</Link></li>
                <li><Link href="/services" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">مسرح سرد</Link></li>
                <li><Link href="/services" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">الورش</Link></li>
                <li><Link href="/services" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">بهو سرد</Link></li>
                <li><Link href="/services" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">مسرح العارض</Link></li>
              </ul>
            )}
          </li>

          <li 
            className="relative"
            onMouseEnter={() => handleDropdownEnter('courses')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link href="/courses" className="text-white text-lg font-bold hover:text-accent-dark transition-colors">دورات</Link>
            {openDropdown === 'courses' && (
              <ul className="absolute top-full right-0 bg-black min-w-[180px] py-2 rounded-custom mt-1 shadow-xl">
                <li><Link href="/musical-courses" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">الدورات الموسيقية</Link></li>
                <li><Link href="/courses" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">الدورات الفنية</Link></li>
                <li><Link href="/courses" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">المسرح والتمثيل</Link></li>
                <li><Link href="/courses" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">الدورات التصويرية</Link></li>
              </ul>
            )}
          </li>

          <li 
            className="relative"
            onMouseEnter={() => handleDropdownEnter('events')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link href="/events" className="text-white text-lg font-bold hover:text-accent-dark transition-colors">الورش والفعاليات</Link>
            {openDropdown === 'events' && (
              <ul className="absolute top-full right-0 bg-black min-w-[180px] py-2 rounded-custom mt-1 shadow-xl">
                <li><Link href="/events" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">جميع الفعاليات</Link></li>
                <li><Link href="/calendar" className="block px-4 py-2 text-white hover:bg-accent-dark transition-colors">التقويم</Link></li>
              </ul>
            )}
          </li>

          <li><a href="https://center-site.com" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-bold hover:text-accent-dark transition-colors">معهد لعب</a></li>
          <li><a href="https://library-site.com" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-bold hover:text-accent-dark transition-colors">أدبي الرياض</a></li>
          <li><Link href="/contact" className="text-white text-lg font-bold hover:text-accent-dark transition-colors">تواصل معنا</Link></li>
        </ul>
      </nav>
      
      <div className="flex items-center gap-4">
        <Link href="/cart" className="text-white text-2xl hover:text-accent-dark transition-colors" aria-label="سلة الشراء">
          <i className="fas fa-shopping-cart"></i>
        </Link>
        
        {currentUser ? (
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link href="/admin" className="px-4 py-2 rounded-md text-sm font-semibold bg-transparent border border-accent-dark text-accent-dark hover:bg-accent-dark hover:text-white transition-all">
                لوحة التحكم
              </Link>
            )}
            <button onClick={handleLogout} className="px-4 py-2 rounded-md text-sm font-semibold bg-transparent border border-gray-600 text-white hover:bg-gray-800 hover:border-gray-800 transition-all">
              تسجيل الخروج
            </button>
          </div>
        ) : (
          <Link href="/login" className="px-4 py-2 rounded-md text-sm font-semibold bg-accent-dark text-white hover:bg-accent-light hover:text-primary-text transition-all">
            تسجيل الدخول
          </Link>
        )}
        
        <button className="bg-transparent text-white p-0 font-bold border-none cursor-pointer text-lg hover:text-accent-dark transition-colors">English</button>
      </div>
    </header>
  )
}

'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  
  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-black text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
            <Link href="/" className="text-white hover:text-accent-dark transition-colors">
              العودة للموقع
            </Link>
          </div>
        </nav>
        
        <div className="flex">
          <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-64px)] p-4">
            <nav className="space-y-2">
              <Link 
                href="/admin" 
                className={`block p-3 rounded-custom transition-colors ${
                  pathname === '/admin' 
                    ? 'bg-accent-dark text-white' 
                    : 'text-primary-text hover:bg-gray-100'
                }`}
              >
                لوحة التحكم
              </Link>
              <Link 
                href="/admin/events" 
                className={`block p-3 rounded-custom transition-colors ${
                  pathname?.startsWith('/admin/events') 
                    ? 'bg-accent-dark text-white' 
                    : 'text-primary-text hover:bg-gray-100'
                }`}
              >
                الفعاليات
              </Link>
              <Link 
                href="/admin/bookings" 
                className={`block p-3 rounded-custom transition-colors ${
                  pathname === '/admin/bookings' 
                    ? 'bg-accent-dark text-white' 
                    : 'text-primary-text hover:bg-gray-100'
                }`}
              >
                الحجوزات
              </Link>
            </nav>
          </aside>
          
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

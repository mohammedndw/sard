import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

export const metadata = {
  title: 'مركز سرد الثقافي',
  description: 'منصة فنية عالمية ترسم الآفاق لتعيد تعريف الموسيقى والفن والثقافة',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

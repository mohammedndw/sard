import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Booking() {
  return (
    <>
      <Header />
      <main>
        <section className="py-32 px-5">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold mb-8 text-primary-text">الورش والفعاليات</h1>
            <p className="text-xl text-gray-700 mb-8">سجل في ورشنا وفعالياتنا المميزة</p>
            <Link href="/events" className="btn primary-btn text-lg">
              عرض جميع الفعاليات
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

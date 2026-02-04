import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Services() {
  return (
    <>
      <Header />
      <main>
        <section className="py-32 px-5">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-primary-text">خدماتنا</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-custom shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
                <img src="/assets/service1.jpg" alt="تأجير المسرح" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-primary-text">تأجير المسرح</h2>
                  <p className="text-gray-600 mb-4">نوفر مساحات احترافية لتقديم عروضك الفنية</p>
                </div>
              </div>
              
              <div className="bg-white rounded-custom shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
                <img src="/assets/service2.jpg" alt="مسرح سرد" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-primary-text">مسرح سرد</h2>
                  <p className="text-gray-600 mb-4">مسرح متكامل بجميع الإمكانيات</p>
                </div>
              </div>
              
              <div className="bg-white rounded-custom shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
                <img src="/assets/service3.jpg" alt="الورش" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-primary-text">الورش</h2>
                  <p className="text-gray-600 mb-4">ورش عمل متخصصة في مختلف المجالات الفنية</p>
                </div>
              </div>
              
              <div className="bg-white rounded-custom shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
                <img src="/assets/service4.jpg" alt="بهو سرد" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-primary-text">بهو سرد</h2>
                  <p className="text-gray-600 mb-4">مساحة للاستقبالات والمعارض</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

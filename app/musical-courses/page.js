import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MusicalCourses() {
  return (
    <>
      <Header />
      <main>
        <section className="py-32 px-5">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-primary-text">الدورات الموسيقية</h1>
            <div className="text-center">
              <img src="/assets/guitar.webp" alt="الدورات الموسيقية" className="max-w-full h-auto mx-auto rounded-custom shadow-lg" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

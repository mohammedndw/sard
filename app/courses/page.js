import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Courses() {
  return (
    <>
      <Header />
      <main>
        <section className="py-32 px-5">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-primary-text">الدورات التعليمية</h1>
            <div className="text-center">
              <img src="/assets/courses.png" alt="الدورات" className="max-w-full h-auto mx-auto rounded-custom shadow-lg" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

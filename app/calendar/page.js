import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Calendar() {
  return (
    <>
      <Header />
      <main>
        <section className="py-32 px-5">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-primary-text">التقويم</h1>
            <div className="bg-white rounded-custom shadow-lg p-8 text-center">
              <p className="text-xl text-gray-600">التقويم قريباً</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="h-[85vh] relative bg-black bg-[url('/assets/main1.jpg')] bg-cover bg-center overflow-hidden">
          <div className="absolute inset-0 bg-black/65 flex justify-center items-center text-center">
            <div className="text-white max-w-3xl px-5">
              <h1 className="text-[#efe1c5] text-5xl mb-5">مجتمع ثقافي يحوّل حلمك إلى واقع</h1>
              <p className="text-accent-light text-xl mb-9">منصة فنية عالمية ترسم الآفاق لتعيد تعريف الموسيقى والفن والثقافة والمحتوى الفني من خلال تنظيم فعاليات فريدة في الشرق الأوسط.</p>
              <div className="flex gap-5 justify-center">
                <Link href="/booking" className="btn primary-btn">الورشات والفعاليات</Link>
                <Link href="/contact" className="btn secondary-btn">تواصل معنا</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 px-5">
          <div className="bg-white p-10 rounded-custom shadow-lg max-w-5xl mx-auto text-right flex gap-10 items-start">
            <div className="flex-1 pr-5 text-base">
              <h2 className="text-primary-text text-right mb-2 border-b-3 border-accent-dark pb-2 inline-block">من نحن</h2>
              <h4 className="text-primary-text font-bold text-right mb-6">لمحة عن مركز سرد الثقافي</h4>
              <p className="text-primary-text text-justify font-medium">
                <strong>مركز سرد الثقافي هو أول مركز ثقافي خاص في المملكة العربية السعودية (تأسس 2024) بدعم من الصندوق الثقافي، وجاء استجابة لحاجة المشهد المحلي لمنصة فنية شاملة.</strong>
              </p>
              <ul className="list-none p-0 mt-4">
                <li className="mb-2"><strong>رسالتنا: بناء وتعزيز الثقافة والفن المحلي والمساهمة في تحقيق أهداف رؤية 2030.</strong></li>
                <li className="mb-2"><strong>دورنا: تقديم بيئة داعمة للمبدعين والفنانين، تعكس التنوع الثقافي للمملكة من خلال فعالياتنا، ونسعى لأن نصبح منصة عالمية للتبادل الثقافي والإبداعي.</strong></li>
                <li className="mb-2"><strong>ماذا نقدم؟ تجارب ثقافية وفنية مبتكرة، دمج الإبداع بالتكنولوجيا، وتنظيم ورش عمل، أمسيات، وعروض فنية لإحياء التراث وتشجيع الفن المعاصر.</strong></li>
              </ul>
            </div>
            <div className="flex-1 min-w-[45%] self-stretch">
              <img src="/assets/about1.jpg" alt="صورة لقاعة مسرح" className="w-full h-full object-cover rounded-custom shadow-lg" />
            </div>
          </div>
        </section>

        <section className="py-24 px-5">
          <div className="bg-white rounded-custom p-12 max-w-7xl mx-auto my-8 flex items-center justify-between gap-12 shadow-xl transition-transform hover:-translate-y-1">
            <h2 className="text-black text-5xl mb-1 text-right">تعرف على خدمتنا</h2>
            <div className="flex-1 min-w-[300px] h-auto overflow-visible rounded-custom flex justify-center items-center relative">
              <Link href="/services" aria-label="انتقل لصفحة الخدمات">
                <img src="/assets/sector2.png" alt="صورة للخدمات" className="max-w-full h-full object-cover rounded-custom" />
              </Link>
            </div>
          </div>
        </section>

        <section className="text-center pt-10">
          <h3 className="text-center text-accent-dark font-bold mb-1 font-secondary">تعلم مع سرد</h3>
          <h2>دوراتنا التعليمية</h2>
          <div className="grid grid-cols-1 gap-10 max-w-6xl mx-auto my-12">
            <div className="flex flex-col items-stretch bg-white rounded-custom overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
              <Link href="/courses" aria-label="انتقل لصفحة الدورات">
                <img src="/assets/courses.png" alt="صورة لدورة" className="w-full h-[500px] object-cover" />
              </Link>
            </div>
          </div>
        </section>

        <section className="text-center pt-10">
          <h2>الورش والفعاليات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <figure className="card" key={num}>
                <img src={`/assets/pic${num}.png`} alt={`ورشة ${num}`} className="w-full h-[350px] object-cover flex-shrink-0" />
                <figcaption className="p-4 flex-grow flex flex-col justify-between">
                  <Link href="/booking" className="text-accent-dark font-bold block text-lg text-center py-2 border-t border-gray-200 mt-2">سجل الان</Link>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="py-20 px-5">
          <div className="flex max-w-6xl h-[450px] bg-white rounded-custom overflow-hidden shadow-xl mx-auto my-8 items-stretch transition-transform hover:-translate-y-1">
            <div className="flex-1">
              <img src="/assets/contact1.jpg" alt="بيئة ثقافية" className="w-full h-full object-cover block" />
            </div>
            <div className="flex-[1.2] p-16 flex flex-col justify-center text-black text-right">
              <h2 className="text-black text-5xl mb-4">انضم إلى مجتمعنا</h2>
              <p className="mb-8 text-black text-xl">نحتضن مواهب الفنون الأدائية، ونطورها بإقامة ورش بمعايير عالمية تساهم في نهضة الثقافة، حتّى نصنع المواهب والمحتوى الاستثنائي محلياً وعالمياً. مهتم تكون جزء من مجتمعنا؟</p>
              <Link href="/contact" className="w-[70%] max-w-[300px] py-4 px-9 bg-accent-dark text-white rounded-custom font-bold text-lg transition-colors text-center hover:bg-black hover:text-white">
                تواصل معنا
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-none py-24 px-5">
          <div className="bg-white rounded-custom p-12 max-w-7xl mx-auto my-8 flex items-center justify-between gap-12 shadow-xl transition-transform hover:-translate-y-1">
            <div className="flex-[1.5] text-right text-black">
              <h2 className="text-black text-5xl mb-5">مشاريعنا</h2>
              <p className="text-black text-lg leading-relaxed">اكتشف المزيد عن تاريخ سرد، ودعمها لقطاع فنون الشرق الأوسط!</p>
            </div>
            <div className="flex-1 min-w-[250px] h-[350px] overflow-hidden rounded-custom">
              <img src="/assets/project.png" alt="صورة لمشاريع مركز سرد" className="max-w-full h-full object-cover rounded-custom" />
            </div>
          </div>
        </section>

        <section className="max-w-none bg-background py-16 px-5">
          <div className="bg-accent-light p-10 rounded-custom shadow-xl max-w-4xl mx-auto text-primary-text flex flex-col items-center gap-5 text-center">
            <div className="flex-shrink-0 mb-2">
              <img src="/assets/culturalde.png" alt="شعار النشرة الإخبارية" className="w-[90%] h-auto" />
            </div>
            <p className="flex-grow text-xl font-bold text-primary-text leading-normal">اشترك في نشرتنا الإخبارية لتصلك آخر الدورات والفعاليات والكتب الجديدة فور إصدارها!</p>
            <form className="flex gap-3 flex-shrink-0 w-full max-w-md justify-center flex-wrap">
              <input 
                type="email" 
                placeholder="اكتب بريدك الإلكتروني" 
                required 
                className="py-3 px-5 border-2 border-accent-dark rounded-custom flex-grow text-base bg-white text-primary-text text-right"
              />
              <button 
                type="submit" 
                className="bg-accent-dark text-white border-none py-3 px-6 rounded-custom cursor-pointer font-bold transition-colors hover:bg-primary-text hover:text-white"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

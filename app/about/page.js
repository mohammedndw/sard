import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-background py-32 px-5">
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
      </main>
      <Footer />
    </>
  )
}

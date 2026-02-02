function About() {
  return (
    <section className="about-us" style={{ paddingTop: '120px' }}>
      <div className="about-card">
        <div className="about-text">
          <h2>من نحن</h2>
          <h4>لمحة عن مركز سرد الثقافي</h4>
          <p>
            <strong>مركز سرد الثقافي هو أول مركز ثقافي خاص في المملكة العربية السعودية (تأسس 2024) بدعم من الصندوق الثقافي، وجاء استجابة لحاجة المشهد المحلي لمنصة فنية شاملة.</strong>
          </p>
          <ul className="aboutus">
            <li><strong>رسالتنا: بناء وتعزيز الثقافة والفن المحلي والمساهمة في تحقيق أهداف رؤية 2030.</strong></li>
            <li><strong>دورنا: تقديم بيئة داعمة للمبدعين والفنانين، تعكس التنوع الثقافي للمملكة من خلال فعالياتنا، ونسعى لأن نصبح منصة عالمية للتبادل الثقافي والإبداعي.</strong></li>
            <li><strong>ماذا نقدم؟ تجارب ثقافية وفنية مبتكرة، دمج الإبداع بالتكنولوجيا، وتنظيم ورش عمل، أمسيات، وعروض فنية لإحياء التراث وتشجيع الفن المعاصر.</strong></li>
          </ul>
        </div>
        <div className="about-image">
          <img src="/assets/about1.jpg" alt="صورة لقاعة مسرح" />
        </div>
      </div>
    </section>
  )
}

export default About

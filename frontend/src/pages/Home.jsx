import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>مجتمع ثقافي يحوّل حلمك إلى واقع</h1>
            <p>منصة فنية عالمية ترسم الآفاق لتعيد تعريف الموسيقى والفن والثقافة والمحتوى الفني من خلال تنظيم فعاليات فريدة في الشرق الأوسط.</p>
            <div className="hero-buttons">
              <Link to="/booking" className="btn primary-btn">الورشات والفعاليات</Link>
              <Link to="/contact" className="btn secondary-btn">تواصل معنا</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-us">
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

      <section className="sectors">
        <div className="sector-card">
          <h2>تعرف على خدمتنا</h2>
          <div className="sector-image">
            <Link to="/services" aria-label="انتقل لصفحة الخدمات">
              <img src="/assets/sector2.png" alt="صورة للخدمات" />
            </Link>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <h3 className="small-title">تعلم مع سرد</h3>
        <h2>دوراتنا التعليمية</h2>
        <div className="courses-grid">
          <div className="course-item">
            <Link to="/courses" aria-label="انتقل لصفحة الدورات">
              <img src="/assets/courses.png" alt="صورة لدورة" />
            </Link>
          </div>
        </div>
      </section>

      <section className="workshops-events">
        <h2>الورش والفعاليات</h2>
        <div className="cards-container">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <figure className="card" key={num}>
              <img src={`/assets/pic${num}.png`} alt={`ورشة ${num}`} />
              <figcaption>
                <Link to="/booking" className="card-btn">سجل الان</Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="contact-box">
        <div className="contact-container">
          <div className="contact-img">
            <img src="/assets/contact1.jpg" alt="بيئة ثقافية" />
          </div>
          <div className="contact-text">
            <h2>انضم إلى مجتمعنا</h2>
            <p>نحتضن مواهب الفنون الأدائية، ونطورها بإقامة ورش بمعايير عالمية تساهم في نهضة الثقافة، حتّى نصنع المواهب والمحتوى الاستثنائي محلياً وعالمياً. مهتم تكون جزء من مجتمعنا؟</p>
            <Link to="/contact" className="contact-btn">تواصل معنا</Link>
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="projects-container">
          <div className="projects-text">
            <h2>مشاريعنا</h2>
            <p>اكتشف المزيد عن تاريخ سرد، ودعمها لقطاع فنون الشرق الأوسط!</p>
          </div>
          <div className="projects-image">
            <img src="/assets/project.png" alt="صورة لمشاريع مركز سرد" />
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-box">
          <div className="newsletter-icon">
            <img src="/assets/culturalde.png" alt="شعار النشرة الإخبارية" />
          </div>
          <p className="newsletter-text">اشترك في نشرتنا الإخبارية لتصلك آخر الدورات والفعاليات والكتب الجديدة فور إصدارها!</p>
          <form className="newsletter-form">
            <input type="email" placeholder="اكتب بريدك الإلكتروني" required />
            <button type="submit">اشترك الآن</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Home

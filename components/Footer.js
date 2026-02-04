import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#EFE8DA] py-12 text-primary-text font-secondary border-t border-black/5">
      <div className="max-w-6xl mx-auto px-5 pb-10 flex justify-around flex-wrap gap-10 text-right">
        <div className="flex-1 min-w-[250px] text-right">
          <h3 className="text-primary-text mb-5 text-2xl text-right border-b-2 border-accent-dark pb-1 inline-block">
            تابعونا
          </h3>
          <div className="flex justify-start gap-4 mt-4">
            <a href="https://twitter.com/alsard_center" target="_blank" rel="noopener noreferrer" aria-label="حساب مركز سرد على تويتر" className="text-black text-3xl hover:text-accent-dark transition-colors">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://www.instagram.com/al_sard_cultural_center/" target="_blank" rel="noopener noreferrer" aria-label="حساب مركز سرد على انستغرام" className="text-black text-3xl hover:text-accent-dark transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.snapchat.com/@sardculturalc" target="_blank" rel="noopener noreferrer" aria-label="حساب مركز سرد على سناب شات" className="text-black text-3xl hover:text-accent-dark transition-colors">
              <i className="fa-brands fa-snapchat"></i>
            </a>
            <a href="https://www.tiktok.com/@sardculturalc" target="_blank" rel="noopener noreferrer" aria-label="حساب مركز سرد على تيك توك" className="text-black text-3xl hover:text-accent-dark transition-colors">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="https://www.youtube.com/@SardCulturalC" target="_blank" rel="noopener noreferrer" aria-label="قناة مركز سرد على يوتيوب" className="text-black text-3xl hover:text-accent-dark transition-colors">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] text-right">
          <h3 className="text-primary-text mb-5 text-2xl text-right border-b-2 border-accent-dark pb-1 inline-block">
            تواصل معنا
          </h3>
          <div className="flex items-center justify-start mb-4">
            <i className="fas fa-map-marker-alt text-black ml-2 mr-0 flex-shrink-0"></i>
            <a href="https://maps.app.goo.gl/ZXvBnfAQuooKQp737" target="_blank" rel="noopener noreferrer" className="text-primary-text hover:text-accent-dark transition-colors">
              مركز سرد الثقافي - جامعة الملك سعود
            </a>
          </div>
          <div className="flex items-center justify-start mb-4">
            <i className="fas fa-phone text-black ml-2 mr-0 flex-shrink-0"></i>
            <a href="tel:+966541333413" className="text-primary-text hover:text-accent-dark transition-colors">+966 54 1333413</a>
          </div>
          <div className="flex items-center justify-start mb-4">
            <i className="fas fa-envelope text-black ml-2 mr-0 flex-shrink-0"></i>
            <a href="mailto:info@sardculturalc.com" className="text-primary-text hover:text-accent-dark transition-colors">info@sardculturalc.com</a>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] text-right">
          <h3 className="text-primary-text mb-5 text-2xl text-right border-b-2 border-accent-dark pb-1 inline-block">
            روابط سريعة
          </h3>
          <ul className="list-none text-right p-0">
            <li className="mb-2"><Link href="/courses" className="text-primary-text block hover:text-accent-dark transition-colors">جميع الدورات</Link></li>
            <li className="mb-2"><Link href="/booking" className="text-primary-text block hover:text-accent-dark transition-colors">الورش والفعاليات</Link></li>
            <li className="mb-2"><Link href="/" className="text-primary-text block hover:text-accent-dark transition-colors">سياسة الخصوصية</Link></li>
            <li className="mb-2"><Link href="/" className="text-primary-text block hover:text-accent-dark transition-colors">شروط الاستخدام</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t border-black/10 py-5 px-5 text-sm text-gray-600">
        <p>© 2025 جميع الحقوق محفوظة لمركز سرد الثقافي</p>
      </div>
    </footer>
  )
}

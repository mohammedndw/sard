import { Link } from 'react-router-dom'
import '../styles/cart.css'

function Cart() {
  return (
    <section className="cart-section" style={{ paddingTop: '100px' }}>
      <h2>سلة الشراء</h2>
      <div className="cart-container">
        <div className="empty-cart">
          <i className="fas fa-shopping-cart"></i>
          <p>سلة الشراء فارغة</p>
          <Link to="/courses" className="btn primary-btn">تصفح الدورات</Link>
        </div>
      </div>
    </section>
  )
}

export default Cart

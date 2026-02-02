import { Link } from 'react-router-dom'

function Booking() {
  return (
    <section className="workshops-events" style={{ paddingTop: '100px' }}>
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
  )
}

export default Booking

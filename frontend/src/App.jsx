import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Courses from './pages/Courses'
import MusicalCourses from './pages/MusicalCourses'
import Booking from './pages/Booking'
import Calendar from './pages/Calendar'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="courses" element={<Courses />} />
          <Route path="musical-courses" element={<MusicalCourses />} />
          <Route path="booking" element={<Booking />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

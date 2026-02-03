import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
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
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/Dashboard'
import AdminEvents from './admin/Events'
import AdminEventForm from './admin/EventForm'
import AdminRegistrations from './admin/Registrations'
import AdminBookings from './admin/Bookings'
import AdminAttendees from './admin/Attendees'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
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
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="events/new" element={<AdminEventForm />} />
            <Route path="events/:id/edit" element={<AdminEventForm />} />
            <Route path="events/:id/registrations" element={<AdminRegistrations />} />
            <Route path="events/:id/attendees" element={<AdminAttendees />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

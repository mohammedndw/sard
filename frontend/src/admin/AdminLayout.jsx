import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './admin.css';

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <Link to="/">
            <img src="/assets/Sard_Arbab_logo.svg" alt="سرد" />
          </Link>
          <span>لوحة التحكم</span>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin" className={isActive('/admin') && location.pathname === '/admin' ? 'active' : ''}>
            <i className="fas fa-chart-line"></i>
            الرئيسية
          </Link>
          <Link to="/admin/events" className={isActive('/admin/events') ? 'active' : ''}>
            <i className="fas fa-calendar-alt"></i>
            الفعاليات
          </Link>
          <Link to="/admin/bookings" className={isActive('/admin/bookings') ? 'active' : ''}>
            <i className="fas fa-building"></i>
            طلبات الحجز
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="back-to-site">
            <i className="fas fa-arrow-right"></i>
            العودة للموقع
          </Link>
          <button onClick={handleLogout} className="logout-button">
            <i className="fas fa-sign-out-alt"></i>
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

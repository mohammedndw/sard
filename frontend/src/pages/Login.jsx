import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else if (err.code === 'auth/invalid-email') {
        setError('البريد الإلكتروني غير صالح');
      } else {
        setError('حدث خطأ في تسجيل الدخول');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page" style={{ paddingTop: '120px' }}>
      <div className="auth-container">
        <h1>تسجيل الدخول</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="أدخل كلمة المرور"
            />
          </div>
          
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>
        
        <p className="auth-link">
          ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

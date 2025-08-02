import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, clearError } from '../store/actions/userActions'
import WelcomeCard from '../components/WelcomeCard'
import logo from '../assets/logo.png'
import './SignIn.css'

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [userType, setUserType] = useState('customer') // 'customer' or 'seller'
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector(state => state.auth)
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])
  
  useEffect(() => {
    // Clear error when component unmounts
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.username && formData.password) {
      dispatch(loginUser(formData, userType))
    }
  }
  
  return (
    <div className="signin-container">
      <div className="signin-layout">
        <div className="signin-welcome">
          <WelcomeCard isSignUp={false} />
        </div>
        <div className="signin-form-section">
          <div className="signin-card">
            <div className="signin-header">
              <img src={logo} alt="Shopistire" className="signin-logo" />
              <h2>Giriş Yap</h2>
            </div>
            
            {error && <div className="error-message">{error}</div>}
                        
            <form onSubmit={handleSubmit} className="signin-form">
              <div className="form-group">
                <label>Giriş Türü</label>
                <div className="user-type-selector">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="userType"
                      value="customer"
                      checked={userType === 'customer'}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <span>Müşteri</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="userType"
                      value="seller"
                      checked={userType === 'seller'}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <span>Satıcı</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="username">Kullanıcı Adı veya Email</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Kullanıcı adınızı veya email adresinizi girin"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Şifre</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Şifrenizi girin"
                />
              </div>
              
              <button 
                type="submit" 
                className="signin-button"
                disabled={loading}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>
            
            <div className="signin-footer">
              <p>
                Hesabınız yok mu? <Link to="/signup">Kayıt Ol</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn

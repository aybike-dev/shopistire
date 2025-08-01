import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, clearError } from '../store/actions/userActions'
import WelcomeCard from '../components/WelcomeCard'
import logo from '../assets/logo.png'
import './SignUp.css'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  
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
    
    // Clear field error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      })
    }
  }
  
  const validateForm = () => {
    const errors = {}
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'Ad alanı zorunludur'
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Soyad alanı zorunludur'
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Kullanıcı adı zorunludur'
    } else if (formData.username.length < 3) {
      errors.username = 'Kullanıcı adı en az 3 karakter olmalıdır'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email alanı zorunludur'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Geçerli bir email adresi girin'
    }
    
    if (!formData.password) {
      errors.password = 'Şifre zorunludur'
    } else if (formData.password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalıdır'
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Şifre tekrarı zorunludur'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const { confirmPassword, ...userData } = formData
      dispatch(registerUser(userData))
    }
  }
  
  return (
    <div className="signup-container">
      <div className="signup-layout">
        <div className="signup-welcome">
          <WelcomeCard isSignUp={true} />
        </div>
        <div className="signup-form-section">
          <div className="signup-card">
            <div className="signup-header">
              <img src={logo} alt="Shopistire" className="signup-logo" />
              <h2>Kayıt Ol</h2>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Ad</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Adınızı girin"
              />
              {formErrors.firstName && <span className="field-error">{formErrors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Soyad</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Soyadınızı girin"
              />
              {formErrors.lastName && <span className="field-error">{formErrors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Kullanıcı adınızı girin"
            />
            {formErrors.username && <span className="field-error">{formErrors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email adresinizi girin"
            />
            {formErrors.email && <span className="field-error">{formErrors.email}</span>}
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
            {formErrors.password && <span className="field-error">{formErrors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Şifre Tekrar</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Şifrenizi tekrar girin"
            />
            {formErrors.confirmPassword && <span className="field-error">{formErrors.confirmPassword}</span>}
          </div>
          
          <button 
            type="submit" 
            className="signup-button"
            disabled={loading}
          >
            {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
          </button>
        </form>
        
        <div className="signup-footer">
          <p>
            Zaten hesabınız var mı? <Link to="/signin">Giriş Yap</Link>
          </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp

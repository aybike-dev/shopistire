import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/index.js'
import './Checkout.css'
import { loadUserCart } from '../store/slices/cartSlice.js'
import { 
  FaArrowLeft, 
  FaCreditCard, 
  FaLock, 
  FaCheck, 
  FaTruck, 
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa'

const Checkout = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { items: cartItems } = useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    
    // Payment Info
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Options
    saveCard: false,
    fastDelivery: false,
    giftWrap: false
  })

  const [errors, setErrors] = useState({})

  // Load user's cart when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(loadUserCart({ userId: user.id }))
    }
  }, [dispatch, isAuthenticated, user])

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    navigate('/signin')
    return null
  }

  // Redirect to cart if no items
  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₺', '').replace('.', ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = formData.fastDelivery ? 30 : 0
  const giftWrap = formData.giftWrap ? 15 : 0
  const total = subtotal + shipping + giftWrap

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'Ad zorunludur'
      if (!formData.lastName) newErrors.lastName = 'Soyad zorunludur'
      if (!formData.email) newErrors.email = 'E-posta zorunludur'
      if (!formData.phone) newErrors.phone = 'Telefon zorunludur'
      if (!formData.address) newErrors.address = 'Adres zorunludur'
      if (!formData.city) newErrors.city = 'Şehir zorunludur'
      if (!formData.district) newErrors.district = 'İlçe zorunludur'
      if (!formData.postalCode) newErrors.postalCode = 'Posta kodu zorunludur'
    }
    
    if (step === 2) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Kart numarası zorunludur'
      if (!formData.cardName) newErrors.cardName = 'Kart üzerindeki isim zorunludur'
      if (!formData.expiryDate) newErrors.expiryDate = 'Son kullanma tarihi zorunludur'
      if (!formData.cvv) newErrors.cvv = 'CVV zorunludur'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    if (validateStep(2)) {
      // Simulate payment processing
      alert('Ödeme başarılı! Bu demo amaçlı bir mesajdır. Gerçek uygulamada sipariş onayı sayfasına yönlendirilirsiniz.')
      navigate('/home')
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData(prev => ({ ...prev, cardNumber: formatted }))
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/cart')}
          className="back-btn"
        >
          <FaArrowLeft /> Sepete Dön
        </Button>
        <h1>Ödeme</h1>
      </div>

      <div className="checkout-content">
        <div className="checkout-steps">
          <div className="steps-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span className="step-number">
                {currentStep > 1 ? <FaCheck /> : '1'}
              </span>
              <span className="step-title">Teslimat Bilgileri</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span className="step-number">
                {currentStep > 2 ? <FaCheck /> : '2'}
              </span>
              <span className="step-title">Ödeme Bilgileri</span>
            </div>
          </div>

          <div className="step-content">
            {currentStep === 1 && (
              <div className="shipping-form">
                <h3><FaTruck /> Teslimat Bilgileri</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Ad *</label>
                    <div className="input-with-icon">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'error' : ''}
                        placeholder="Adınız"
                      />
                    </div>
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Soyad *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Soyadınız"
                    />
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>E-posta *</label>
                    <div className="input-with-icon">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="ornek@email.com"
                      />
                    </div>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Telefon *</label>
                    <div className="input-with-icon">
                      <FaPhone className="input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'error' : ''}
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Adres *</label>
                  <div className="input-with-icon">
                    <FaMapMarkerAlt className="input-icon" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'error' : ''}
                      placeholder="Tam adresinizi yazın"
                      rows="3"
                    />
                  </div>
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Şehir *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                      placeholder="İstanbul"
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>İlçe *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={errors.district ? 'error' : ''}
                      placeholder="Kadıköy"
                    />
                    {errors.district && <span className="error-text">{errors.district}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>Posta Kodu *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={errors.postalCode ? 'error' : ''}
                      placeholder="34000"
                    />
                    {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                  </div>
                </div>

                <div className="delivery-options">
                  <h4>Teslimat Seçenekleri</h4>
                  <div className="option">
                    <input
                      type="checkbox"
                      id="fastDelivery"
                      name="fastDelivery"
                      checked={formData.fastDelivery}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="fastDelivery">
                      Hızlı Teslimat (1-2 gün) - ₺30
                    </label>
                  </div>
                  <div className="option">
                    <input
                      type="checkbox"
                      id="giftWrap"
                      name="giftWrap"
                      checked={formData.giftWrap}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="giftWrap">
                      Hediye Paketi - ₺15
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="payment-form">
                <h3><FaCreditCard /> Ödeme Bilgileri</h3>
                
                <div className="payment-security">
                  <FaLock className="security-icon" />
                  <span>Ödeme bilgileriniz SSL ile korunmaktadır</span>
                </div>

                <div className="form-group">
                  <label>Kart Numarası *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className={errors.cardNumber ? 'error' : ''}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                </div>

                <div className="form-group">
                  <label>Kart Üzerindeki İsim *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={errors.cardName ? 'error' : ''}
                    placeholder="AD SOYAD"
                    style={{ textTransform: 'uppercase' }}
                  />
                  {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Son Kullanma Tarihi *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={errors.expiryDate ? 'error' : ''}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={errors.cvv ? 'error' : ''}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="option">
                  <input
                    type="checkbox"
                    id="saveCard"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="saveCard">
                    Kart bilgilerimi güvenli şekilde kaydet
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="step-actions">
            {currentStep > 1 && (
              <Button variant="secondary" onClick={handlePrevious}>
                Geri
              </Button>
            )}
            {currentStep < 2 && (
              <Button variant="primary" onClick={handleNext}>
                Devam Et
              </Button>
            )}
            {currentStep === 2 && (
              <Button variant="primary" onClick={handleSubmit}>
                Ödemeyi Tamamla
              </Button>
            )}
          </div>
        </div>

        <div className="order-summary">
          <div className="summary-card">
            <h3>Sipariş Özeti</h3>
            
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">Adet: {item.quantity}</span>
                  </div>
                  <span className="item-price">
                    {(parseFloat(item.price.replace('₺', '').replace('.', '')) * item.quantity).toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-calculations">
              <div className="calc-row">
                <span>Ara Toplam</span>
                <span>₺{subtotal.toLocaleString('tr-TR')}</span>
              </div>
              {formData.fastDelivery && (
                <div className="calc-row">
                  <span>Hızlı Teslimat</span>
                  <span>₺{shipping}</span>
                </div>
              )}
              {formData.giftWrap && (
                <div className="calc-row">
                  <span>Hediye Paketi</span>
                  <span>₺{giftWrap}</span>
                </div>
              )}
              <div className="calc-divider"></div>
              <div className="calc-row total">
                <span>Toplam</span>
                <span>₺{total.toLocaleString('tr-TR')}</span>
              </div>
            </div>

            <div className="payment-info">
              <p>• 256-bit SSL şifreleme</p>
              <p>• 14 gün ücretsiz iade</p>
              <p>• 7/24 müşteri hizmetleri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

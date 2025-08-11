import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/index.js'
import './Cart.css'
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa'
import { loadUserCart, removeItemFromCart, updateItemQuantity } from '../store/slices/cartSlice.js'

const Cart = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { items: cartItems, isLoading } = useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Load user's cart when component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(loadUserCart({ userId: user.id }))
    }
  }, [dispatch, isAuthenticated, user])

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <FaShoppingBag className="empty-icon" />
          <h2>Sepetinizi görüntülemek için giriş yapın</h2>
          <p>Sepetinizdeki ürünleri görmek ve alışverişe devam etmek için önce hesabınıza giriş yapmalısınız.</p>
          <div className="empty-actions">
            <Button 
              variant="primary" 
              onClick={() => navigate('/signin')}
            >
              Giriş Yap
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/home')}
            >
              Alışverişe Devam Et
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    if (isAuthenticated && user) {
      dispatch(updateItemQuantity({
        userId: user.id,
        productId: id,
        quantity: newQuantity
      }))
    }
  }

  const removeItem = (id) => {
    if (isAuthenticated && user) {
      dispatch(removeItemFromCart({
        userId: user.id,
        productId: id
      }))
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₺', '').replace('.', ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <FaShoppingBag className="empty-icon" />
          <h2>Sepetiniz Boş</h2>
          <p>Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünleri keşfedin!</p>
          <div className="empty-actions">
            <Button 
              variant="primary" 
              onClick={() => navigate('/home')}
            >
              Alışverişe Başla
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/home')}
          className="back-btn"
        >
          <FaArrowLeft /> Alışverişe Devam Et
        </Button>
        <h1>Sepetim ({cartItems.length} ürün)</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-price">{item.price}</p>
              </div>

              <div className="item-controls">
                <div className="quantity-controls">
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    <FaMinus />
                  </Button>
                  <span className="quantity">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <FaPlus />
                  </Button>
                </div>

                <Button
                  variant="danger"
                  size="small"
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Sipariş Özeti</h3>
            
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{(parseFloat(item.price.replace('₺', '').replace('.', '')) * item.quantity).toLocaleString('tr-TR')} ₺</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Toplam</span>
              <span className="total-price">₺{calculateTotal().toLocaleString('tr-TR')}</span>
            </div>

            <Button 
              variant="primary" 
              size="large"
              onClick={handleCheckout}
              className="checkout-btn"
            >
              Ödemeye Geç
            </Button>

            <div className="summary-info">
              <p>• Ücretsiz kargo (200₺ üzeri)</p>
              <p>• 14 gün ücretsiz iade</p>
              <p>• Güvenli ödeme</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

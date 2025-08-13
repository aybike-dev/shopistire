import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './ProductCard.css'
import Button from './Button/index.js'
import { mockSellers } from '../mockData/sellers.js'
import { addItemToCart } from '../store/slices/cartSlice.js'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const seller = mockSellers.find(s => s.id === product.sellerId)
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to sign in if not authenticated
      navigate('/signin')
      window.scrollTo(0, 0)
      return
    }
    
    // Add product to cart
    dispatch(addItemToCart({
      userId: user.id,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      }
    }))
    
    // Show success message (you could replace this with a toast notification)
    alert(`${product.name} sepete eklendi!`)
  }
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-badge">
          {product.stock > 0 ? 'Stokta' : 'Tükendi'}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-details">
          <div className="product-rating">
            <span className="rating-stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="rating-value">({product.rating})</span>
          </div>
          
          <div className="product-category">
            <span className={`category-badge ${product.category.toLowerCase()}`}>
              {product.category}
            </span>
          </div>
        </div>

        {seller && (
          <div className="seller-info">
            <div className="seller-details">
              <span className="seller-name">🏪 {seller.name}</span>
              <span className="seller-rating">
                ★ {seller.rating}
              </span>
            </div>
          </div>
        )}
        
        <div className="product-footer">
          <div className="product-price">
            <span className="price">{product.price}</span>
            <span className="stock">Stok: {product.stock}</span>
          </div>
          
          <Button 
            variant={product.stock > 0 ? "primary" : "secondary"}
            size="medium"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="add-to-cart-btn"
          >
            {product.stock > 0 ? 'Sepete Ekle' : 'Tükendi'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

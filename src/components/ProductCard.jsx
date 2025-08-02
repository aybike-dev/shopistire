import './ProductCard.css'
import Button from './Button'
import { mockSellers } from '../mockData/sellers'

const ProductCard = ({ product }) => {
  const seller = mockSellers.find(s => s.id === product.sellerId)
  
  const handleAddToCart = () => {
    // In a real app, this would dispatch an action to add to cart
    alert(`${product.name} sepete eklendi! (Demo amaçlı)`)
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
                ⭐ {seller.rating}
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

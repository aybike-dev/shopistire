import './ProductCard.css'

const ProductCard = ({ product }) => {
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
        
        <div className="product-footer">
          <div className="product-price">
            <span className="price">${product.price}</span>
            <span className="stock">Stok: {product.stock}</span>
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Sepete Ekle' : 'Tükendi'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

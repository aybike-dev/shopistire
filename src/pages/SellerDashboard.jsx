import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { mockProducts } from '../mockData/products'
import Button from '../components/Button'
import { FaPlus, FaEdit, FaTrash, FaEye, FaStar, FaBox, FaTruck } from 'react-icons/fa'
import './SellerDashboard.css'

const SellerDashboard = () => {
  const { user, userType } = useSelector(state => state.auth)
  const [sellerProducts, setSellerProducts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [viewingProduct, setViewingProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('products')
  
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Electronics',
    image: '',
    stock: ''
  })

  useEffect(() => {
    if (user && userType === 'seller') {
      // Filter products that belong to this seller
      const products = mockProducts.filter(product => product.sellerId === user.id)
      setSellerProducts(products)
    }
  }, [user, userType])

  const handleInputChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingProduct) {
      // Update existing product
      const updatedProducts = sellerProducts.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...product, 
              ...productForm,
              price: productForm.price + ' TL',
              stock: parseInt(productForm.stock)
            }
          : product
      )
      setSellerProducts(updatedProducts)
      setEditingProduct(null)
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...mockProducts.map(p => p.id)) + 1,
        ...productForm,
        price: productForm.price + ' TL',
        stock: parseInt(productForm.stock),
        rating: 0,
        sellerId: user.id,
        image: productForm.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop"
      }
      setSellerProducts([...sellerProducts, newProduct])
    }
    
    // Reset form
    setProductForm({
      name: '',
      price: '',
      description: '',
      category: 'Electronics',
      image: '',
      stock: ''
    })
    setShowAddForm(false)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      price: product.price.replace(' TL', ''),
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock.toString()
    })
    setShowAddForm(true)
  }

  const handleDelete = (productId) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      setSellerProducts(sellerProducts.filter(product => product.id !== productId))
    }
  }

  const handleView = (product) => {
    setViewingProduct(product)
  }

  const closeViewModal = () => {
    setViewingProduct(null)
  }

  const resetForm = () => {
    setProductForm({
      name: '',
      price: '',
      description: '',
      category: 'Electronics',
      image: '',
      stock: ''
    })
    setEditingProduct(null)
    setViewingProduct(null)
    setShowAddForm(false)
  }

  // Calculate stats
  const totalProducts = sellerProducts.length
  const totalStock = sellerProducts.reduce((sum, product) => sum + product.stock, 0)
  const averageRating = sellerProducts.length > 0 
    ? (sellerProducts.reduce((sum, product) => sum + (product.rating || 0), 0) / sellerProducts.length).toFixed(1)
    : 0

  if (userType !== 'seller') {
    return (
      <div className="seller-dashboard">
        <div className="unauthorized">
          <h2>Yetkisiz Erişim</h2>
          <p>Bu sayfaya sadece satıcılar erişebilir.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Satıcı Paneli</h1>
        <p>Merhaba, {user?.sellerInfo?.name || user?.firstName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{totalProducts}</h3>
            <p>Toplam Ürün</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaTruck />
          </div>
          <div className="stat-info">
            <h3>{totalStock}</h3>
            <p>Toplam Stok</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaStar />
          </div>
          <div className="stat-info">
            <h3>{averageRating}</h3>
            <p>Ortalama Puan</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <Button 
          variant="tab"
          className={activeTab === 'products' ? 'btn--active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Ürünlerim
        </Button>
        <Button 
          variant="tab"
          className={activeTab === 'profile' ? 'btn--active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Mağaza Bilgileri
        </Button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="products-section">
          <div className="section-header">
            <h2>Ürünlerim ({totalProducts})</h2>
            <Button 
              variant="primary"
              onClick={() => setShowAddForm(true)}
            >
              <FaPlus /> Yeni Ürün Ekle
            </Button>
          </div>

          {/* Add/Edit Product Form */}
          {showAddForm && (
            <div className="product-form-modal">
              <div className="modal-overlay" onClick={resetForm}></div>
              <div className="product-form">
                <h3>{editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Ürün Adı *</label>
                      <input
                        type="text"
                        name="name"
                        value={productForm.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ürün adını girin"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Fiyat (TL) *</label>
                      <input
                        type="text"
                        name="price"
                        value={productForm.price}
                        onChange={handleInputChange}
                        required
                        placeholder="1.299,99"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Kategori *</label>
                      <select
                        name="category"
                        value={productForm.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Home">Home</option>
                        <option value="Sports">Sports</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Stok Adedi *</label>
                      <input
                        type="number"
                        name="stock"
                        value={productForm.stock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="100"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Açıklama *</label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      placeholder="Ürün açıklamasını girin"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Görsel URL</label>
                    <input
                      type="url"
                      name="image"
                      value={productForm.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="form-actions">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={resetForm}
                    >
                      İptal
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      {editingProduct ? 'Güncelle' : 'Ekle'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Product Detail View Modal */}
          {viewingProduct && (
            <div className="product-form-modal">
              <div className="modal-overlay" onClick={closeViewModal}></div>
              <div className="product-detail-modal">
                <div className="modal-header">
                  <h3>Ürün Detayları</h3>
                  <Button 
                    variant="close" 
                    onClick={closeViewModal}
                  >
                    ×
                  </Button>
                </div>
                
                <div className="product-detail-content">
                  <div className="product-detail-image">
                    <img src={viewingProduct.image} alt={viewingProduct.name} />
                  </div>
                  
                  <div className="product-detail-info">
                    <h2>{viewingProduct.name}</h2>
                    <p className="detail-description">{viewingProduct.description}</p>
                    
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Fiyat:</span>
                        <span className="detail-value price-value">{viewingProduct.price}</span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">Kategori:</span>
                        <span className="detail-value">{viewingProduct.category}</span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">Stok:</span>
                        <span className="detail-value">{viewingProduct.stock} adet</span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">Puan:</span>
                        <span className="detail-value">
                          <FaStar style={{color: '#ffc107', marginRight: '5px'}} />
                          {viewingProduct.rating || 0}/5
                        </span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">Ürün ID:</span>
                        <span className="detail-value">#{viewingProduct.id}</span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="detail-label">Durum:</span>
                        <span className={`detail-value status ${viewingProduct.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                          {viewingProduct.stock > 0 ? 'Stokta' : 'Tükendi'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="detail-actions">
                      <Button 
                        variant="secondary"
                        onClick={() => {
                          closeViewModal()
                          handleEdit(viewingProduct)
                        }}
                      >
                        <FaEdit /> Düzenle
                      </Button>
                      <Button 
                        variant="danger"
                        onClick={() => {
                          closeViewModal()
                          handleDelete(viewingProduct.id)
                        }}
                      >
                        <FaTrash /> Sil
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products List */}
          <div className="products-grid">
            {sellerProducts.length === 0 ? (
              <div className="no-products">
                <FaBox size={48} />
                <h3>Henüz ürününüz yok</h3>
                <p>İlk ürününüzü eklemek için "Yeni Ürün Ekle" butonuna tıklayın.</p>
              </div>
            ) : (
              sellerProducts.map(product => (
                <div key={product.id} className="seller-product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-actions">
                      <Button 
                        variant="action"
                        className="btn--view"
                        onClick={() => handleView(product)}
                        title="Görüntüle"
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="action"
                        className="btn--edit"
                        onClick={() => handleEdit(product)}
                        title="Düzenle"
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="action"
                        className="btn--delete"
                        onClick={() => handleDelete(product.id)}
                        title="Sil"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-details">
                      <div className="price">
                        <strong>{product.price}</strong>
                      </div>
                      <div className="stock">
                        Stok: {product.stock}
                      </div>
                      <div className="category">
                        {product.category}
                      </div>
                      <div className="rating">
                        <FaStar /> {product.rating || 0}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="profile-section">
          <h2>Mağaza Bilgileri</h2>
          <div className="seller-info-card">
            <div className="seller-header">
              <img 
                src={user?.sellerInfo?.logo} 
                alt={user?.sellerInfo?.name}
                className="seller-logo"
              />
              <div className="seller-details">
                <h3>{user?.sellerInfo?.name}</h3>
                <p>{user?.sellerInfo?.description}</p>
                <div className="seller-rating">
                  <FaStar /> {user?.sellerInfo?.rating} ({user?.sellerInfo?.reviewCount} değerlendirme)
                </div>
              </div>
            </div>
            
            <div className="seller-contact">
              <h4>İletişim Bilgileri</h4>
              <p><strong>Telefon:</strong> {user?.sellerInfo?.contact?.phone}</p>
              <p><strong>Email:</strong> {user?.sellerInfo?.contact?.email}</p>
              <p><strong>Website:</strong> {user?.sellerInfo?.contact?.website}</p>
              <p><strong>Konum:</strong> {user?.sellerInfo?.location}</p>
              <p><strong>Üyelik Tarihi:</strong> {user?.sellerInfo?.joinDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerDashboard

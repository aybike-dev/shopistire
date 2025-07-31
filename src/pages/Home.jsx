import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterByCategory, searchProducts, clearFilters, fetchProducts } from '../store/actions/productActions'
import { productCategories } from '../mockData/products'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const { filteredProducts, loading, selectedCategory, searchQuery } = useSelector(state => state.products)
  const { user } = useSelector(state => state.auth)
  
  // Get categories from mock data
  const categories = productCategories
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
  const handleCategoryChange = (category) => {
    dispatch(filterByCategory(category))
  }
  
  const handleSearch = (query) => {
    dispatch(searchProducts(query))
  }
  
  const handleClearFilters = () => {
    dispatch(clearFilters())
  }
  
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Hoş geldin, {user ? user.firstName : 'Misafir'}!</h1>
        <p>En iyi ürünleri keşfedin</p>
      </div>
      
      <div className="filters-section">
        <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onClearFilters={handleClearFilters}
        />
      </div>
      
      <div className="products-section">
        <div className="products-header">
          <h2>Ürünler ({filteredProducts.length})</h2>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Filtreleri Temizle
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="loading">Ürünler yükleniyor...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>Ürün bulunamadı</h3>
            <p>Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Tüm Ürünleri Göster
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

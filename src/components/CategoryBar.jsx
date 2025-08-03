import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { filterByCategory } from '../store/actions/productActions'
import { productCategories } from '../mockData/products'
import Button from './Button'
import './CategoryBar.css'

const CategoryBar = ({ isSearchOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedCategory } = useSelector(state => state.products)

  // Category translations
  const categoryTranslations = {
    'All': 'Tümü',
    'Electronics': 'Elektronik',
    'Fashion': 'Moda',
    'Gaming': 'Oyun',
    'Home': 'Ev',
    'Sports': 'Spor',
    'Books': 'Kitap',
    'Beauty': 'Güzellik',
    'Automotive': 'Otomotiv',
    'Kitchen': 'Mutfak',
    'Garden': 'Bahçe',
    'Music': 'Müzik',
    'Travel': 'Seyahat',
    'Toys': 'Oyuncak',
    'Health': 'Sağlık',
    'Office': 'Ofis',
    'Art': 'Sanat',
    'Pet': 'Evcil Hayvan'
  }

  const handleCategoryChange = (category) => {
    if (location.pathname !== '/home') {
      navigate('/home')
    }
    dispatch(filterByCategory(category))
  }

  // Show CategoryBar on home page for all users
  const { isAuthenticated } = useSelector(state => state.auth)
  
  // Always show CategoryBar on home page, regardless of authentication
  if (location.pathname !== '/' && location.pathname !== '/home') {
    return null
  }

  return (
    <div className={`category-bar ${isSearchOpen ? 'search-open' : ''}`}>
      <div className="category-bar-container">
        <div className="category-list">
          {productCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "ghost"}
              size="small"
              onClick={() => handleCategoryChange(category)}
              className="category-item"
            >
              {categoryTranslations[category] || category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryBar

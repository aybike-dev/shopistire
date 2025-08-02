import './CategoryFilter.css'
import Button from './Button'

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, onClearFilters }) => {
  return (
    <div className="category-filter">
      <div className="category-header">
        <h3>Kategoriler</h3>
        {selectedCategory !== 'All' && (
          <Button 
            variant="secondary" 
            size="small"
            onClick={onClearFilters}
            className="clear-category-btn"
          >
            Temizle
          </Button>
        )}
      </div>
      
      <div className="category-buttons">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "outline-primary"}
            size="small"
            onClick={() => onCategoryChange(category)}
            className="category-btn"
          >
            {category === 'All' ? 'Tümü' : category}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter

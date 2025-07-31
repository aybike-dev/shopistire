import './CategoryFilter.css'

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, onClearFilters }) => {
  return (
    <div className="category-filter">
      <div className="category-header">
        <h3>Kategoriler</h3>
        {selectedCategory !== 'All' && (
          <button className="clear-category-btn" onClick={onClearFilters}>
            Temizle
          </button>
        )}
      </div>
      
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category === 'All' ? 'Tümü' : category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter

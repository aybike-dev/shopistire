import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../store/actions/userActions'
import { searchProducts } from '../store/actions/productActions'
import Button from './Button'
import logo from '../assets/logo.png'
import './Navbar.css'
import { FaMoon, FaSun, FaSearch, FaBars, FaTimes, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { AiOutlineSun } from 'react-icons/ai'

const Navbar = ({ isDarkMode, toggleDarkMode, isSearchOpen, setIsSearchOpen }) => {
  const { user, isAuthenticated, userType } = useSelector(state => state.auth)
  const { searchQuery } = useSelector(state => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(searchQuery || '')
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin')
    setIsMenuOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (location.pathname !== '/home') {
      navigate('/home')
    }
    dispatch(searchProducts(searchInput))
    closeSearch() // Close search bar after search on mobile
  }

  const handleSearchClear = () => {
    setSearchInput('')
    if (location.pathname === '/home') {
      dispatch(searchProducts(''))
    }
    closeSearch() // Close search bar after clearing on mobile
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  // Close menu when clicking outside or pressing escape
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeMenu()
    }
  }

  // Add event listener for escape key
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSearchOpen && !e.target.closest('.navbar-search-mobile') && !e.target.closest('.search-toggle-btn')) {
        closeSearch()
      }
    }

    if (isSearchOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isSearchOpen])
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-brand" onClick={closeMenu}>
          <img src={logo} alt="Shopistire" className="navbar-logo" />
          Shopistire
        </Link>
        
        {/* Search Bar */}
        <div className="navbar-search">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="clear-search-btn"
                  aria-label="Aramayı temizle"
                >
                  ✕
                </button>
              )}
            </div>
            <Button 
              type="submit" 
              variant="ghost"
              size="small"
              className="search-btn"
            >
              <FaSearch />
            </Button>
          </form>
        </div>

        {/* Mobile Controls */}
        <div className="navbar-mobile-controls">
          {/* Favorites Button */}
          <Button
            variant="ghost"
            className="favorites-btn"
            onClick={() => navigate('/signin')}
            aria-label="Favoriler"
          >
            <FaHeart />
          </Button>

          {/* Cart Button */}
          <Button
            variant="ghost"
            className="cart-btn"
            onClick={() => navigate('/signin')}
            aria-label="Sepetim"
          >
            <FaShoppingCart />
          </Button>

          {/* Mobile Search Toggle Button */}
          <Button
            variant="ghost"
            className="search-toggle-btn"
            onClick={toggleSearch}
            aria-label={isSearchOpen ? "Aramayı kapat" : "Aramayı aç"}
          >
            <FaSearch />
          </Button>

          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </Button>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'navbar-menu--open' : ''}`}>
          {/* Mobile overlay */}
          {isMenuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
          
          {/* Menu Header */}
          {/* <div className="menu-header">
            <h3>Menü</h3>
          </div> */}
          
          {/* Quick Actions */}
          <div className="menu-section">
            <h4>Hızlı İşlemler</h4>
            <Link 
              to="/signin" 
              className={`navbar-link ${location.pathname === '/signin' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <FaHeart /> Favoriler
            </Link>
            <Link 
              to="/signin" 
              className={`navbar-link ${location.pathname === '/signin' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <FaShoppingCart /> Sepetim
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="menu-section">
            <h4>Sayfalar</h4>
            <Link 
              to="/home" 
              className={`navbar-link ${location.pathname === '/home' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Ana Sayfa
            </Link>
            {isAuthenticated && (
              <>
                {userType === 'seller' ? (
                  <Link 
                    to="/seller" 
                    className={`navbar-link ${location.pathname === '/seller' ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    Satıcı Paneli
                  </Link>
                ) : (
                  <Link 
                    to="/profile" 
                    className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    Profil
                  </Link>
                )}
              </>
            )}
          </div>
          
          {/* User Section */}
          {isAuthenticated ? (
            <div className="menu-section menu-user">
              <div className="user-info">
                <span className="user-greeting">
                  {userType === 'seller' ? 
                    `${user?.firstName} (Satıcı)` : 
                    `${user?.firstName}`
                  }
                </span>
              </div>
              <Button 
                variant="logout" 
                size="small"
                onClick={handleLogout}
                className="logout-btn"
              >
                Çıkış Yap
              </Button>
            </div>
          ) : (
            <div className="menu-section">
              <h4>Hesap</h4>
              <Link 
                to="/signin" 
                className={`navbar-link ${location.pathname === '/signin' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Giriş Yap
              </Link>
              <Link 
                to="/signup" 
                className={`navbar-link signup-link ${location.pathname === '/signup' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Kayıt Ol
              </Link>
            </div>
          )}
          
          {/* Theme Toggle */}
          <div className="menu-section">
            <Button 
              variant="theme" 
              onClick={toggleDarkMode}
              className="theme-toggle"
            >
              {isDarkMode ? (
                <>
                  <AiOutlineSun />
                  <span>Açık Tema</span>
                </>
              ) : (
                <>
                  <FaMoon />
                  <span>Koyu Tema</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search (shown only when search toggle is active) */}
        <div className={`navbar-search-mobile ${isSearchOpen ? 'navbar-search-mobile--open' : ''}`}>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
                autoFocus={isSearchOpen}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="clear-search-btn"
                  aria-label="Aramayı temizle"
                >
                  ✕
                </button>
              )}
            </div>
            <Button 
              type="submit" 
              variant="primary"
              size="small"
              className="search-btn"
            >
              <FaSearch />
            </Button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

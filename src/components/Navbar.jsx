import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../store/actions/userActions'
import logo from '../assets/logo.png'
import './Navbar.css'
import { FaMoon, FaSun } from 'react-icons/fa'
import { AiOutlineSun } from 'react-icons/ai'

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* <Link to="/home" className="navbar-brand">
          � Shopistire
        </Link> */}
         <Link to="/home" className="navbar-brand">
          <img src={logo} alt="Shopistire" className="navbar-logo" />
          Shopistire
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link 
                to="/home" 
                className={`navbar-link ${location.pathname === '/home' ? 'active' : ''}`}
              >
                Ana Sayfa
              </Link>
              <Link 
                to="/profile" 
                className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}
              >
                Profil
              </Link>
              <div className="navbar-user">
                <span className="user-greeting">
                  Merhaba, {user?.firstName}
                </span>
                <button className="btn-logout" onClick={handleLogout}>Çıkış</button>
                {/* <button className="logout-btn" onClick={handleLogout}>
                  Çıkış
                </button> */}
              </div>
            </>
          ) : (
            <div className="navbar-auth">
              <Link 
                to="/signin" 
                className={`navbar-link ${location.pathname === '/signin' ? 'active' : ''}`}
              >
                Giriş Yap
              </Link>
              <Link 
                to="/signup" 
                className={`navbar-link signup-link ${location.pathname === '/signup' ? 'active' : ''}`}
              >
                Kayıt Ol
              </Link>
            </div>
          )}
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? 
            <AiOutlineSun></AiOutlineSun>
            : <FaMoon></FaMoon>}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

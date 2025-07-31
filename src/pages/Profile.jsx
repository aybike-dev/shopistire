import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/actions/userActions'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || ''
  })
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form to original values when canceling
      setEditForm({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        username: user?.username || ''
      })
    }
    setIsEditing(!isEditing)
  }
  
  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSave = () => {
    // In a real app, you would dispatch an action to update user profile
    console.log('Saving profile:', editForm)
    setIsEditing(false)
    // For demo purposes, we'll just show a success message
    alert('Profil güncellendi! (Demo amaçlı)')
  }
  
  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Profil bulunamadı</h2>
          <p>Lütfen giriş yapın.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{user.firstName?.[0]}{user.lastName?.[0]}</span>
          </div>
          <h2>{user.firstName} {user.lastName}</h2>
          <p className="profile-role">{user.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}</p>
        </div>
        
        <div className="profile-content">
          <div className="profile-section">
            <h3>Kişisel Bilgiler</h3>
            
            <div className="profile-info">
              <div className="info-group">
                <label>Ad</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{user.firstName}</span>
                )}
              </div>
              
              <div className="info-group">
                <label>Soyad</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{user.lastName}</span>
                )}
              </div>
              
              <div className="info-group">
                <label>Kullanıcı Adı</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{user.username}</span>
                )}
              </div>
              
              <div className="info-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>
              
              <div className="info-group">
                <label>Rol</label>
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  Kaydet
                </button>
                <button className="cancel-btn" onClick={handleEditToggle}>
                  İptal
                </button>
              </div>
            ) : (
              <button className="edit-btn" onClick={handleEditToggle}>
                Profili Düzenle
              </button>
            )}
            
            <button className="logout-btn" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

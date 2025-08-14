import React from 'react'
import './WelcomeCard.css'
import logo from '../assets/logo.png'

const WelcomeCard = ({ isSignUp = false }) => {
  return (
    <div className="welcome-card">
      <div className="welcome-content">
        <div className="welcome-header">
          <img src={logo} alt="Shopistire" className="welcome-logo" />
          <h1 className="welcome-title">Shopistire</h1>
        </div>
        
        <div className="welcome-body">
          {isSignUp ? (
            <>
              <h2>Hoş Geldiniz!</h2>
              <p>
                Shopistire ailesine katılmak üzeresiniz. 
                Binlerce ürün arasından seçim yapın ve 
                güvenli alışverişin keyfini çıkarın.
              </p>
              <ul className="welcome-features">
                <li>✨ Geniş ürün yelpazesi</li>
                <li>🚚 Hızlı teslimat</li>
                <li>🔒 Güvenli ödeme</li>
                <li>💯 Müşteri memnuniyeti</li>
              </ul>
            </>
          ) : (
            <>
              <h2>Tekrar Hoş Geldiniz!</h2>
              <p>
                Shopistire'de alışverişe devam etmek için 
                hesabınıza giriş yapın. En yeni ürünler ve 
                özel fırsatlar sizi bekliyor.
              </p>
              <ul className="welcome-features">
                <li>🛍️ Kişisel öneriler</li>
                <li>⭐ Favori ürünleriniz</li>
                <li>📦 Sipariş takibi</li>
                <li>🎁 Özel kampanyalar</li>
              </ul>
            </>
          )}
        </div>
        
        <div className="welcome-footer">
          <div className="welcome-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Mutlu Müşteri</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Ürün</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Güvenilirlik</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeCard

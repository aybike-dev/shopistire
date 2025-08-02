import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo ve Açıklama */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/src/assets/logo.png" alt="Shopistire" className="footer-logo-img" />
              <h3>Shopistire</h3>
            </div>
            <p className="footer-description">
              Modern e-ticaret deneyimi için güvenilir adresiniz. 
              Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="footer-section">
            <h4>Hızlı Linkler</h4>
            <ul className="footer-links">
              <li><a href="/">Ana Sayfa</a></li>
              <li><a href="/products">Ürünler</a></li>
              <li><a href="/categories">Kategoriler</a></li>
              <li><a href="/offers">Kampanyalar</a></li>
              <li><a href="/contact">İletişim</a></li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div className="footer-section">
            <h4>Müşteri Hizmetleri</h4>
            <ul className="footer-links">
              <li><a href="/help">Yardım Merkezi</a></li>
              <li><a href="/shipping">Kargo Bilgileri</a></li>
              <li><a href="/returns">İade & Değişim</a></li>
              <li><a href="/warranty">Garanti Koşulları</a></li>
              <li><a href="/faq">Sık Sorulan Sorular</a></li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div className="footer-section">
            <h4>İletişim</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>0850 000 00 00</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>info@shopistire.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>İstanbul, Türkiye</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕒</span>
                <span>7/24 Müşteri Hizmetleri</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; 2025 Shopistire. Tüm hakları saklıdır.</p>
            </div>
            <div className="footer-legal">
              <a href="/privacy">Gizlilik Politikası</a>
              <a href="/terms">Kullanım Koşulları</a>
              <a href="/cookies">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

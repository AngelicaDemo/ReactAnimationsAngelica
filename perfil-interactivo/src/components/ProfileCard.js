import React, { useState, useRef, useEffect } from 'react';
import './ProfileCard.css'; // Crearemos este archivo más adelante

const ProfileCard = () => {
  // Estados (variables que pueden cambiar y causan que el componente se actualice)
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [typing, setTyping] = useState('');
  
  // Referencia para acceder al elemento DOM
  const cardRef = useRef(null);
  
  // Texto para el efecto de escritura
  const fullText = "My passion is to create and design experiences";
  
  // Efecto para la animación de escritura
  useEffect(() => {
    if (isExpanded) {
      let currentText = '';
      const interval = setInterval(() => {
        if (currentText.length < fullText.length) {
          currentText = fullText.slice(0, currentText.length + 1);
          setTyping(currentText);
        } else {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setTyping('');
    }
  }, [isExpanded]);
  
  // Funciones para manejar eventos
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  const handleClick = () => {
    setIsExpanded(!isExpanded);
    
    if (!isExpanded) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Clases CSS que cambiarán según el estado
  const cardClass = `profile-card ${isHovering ? 'hover' : ''} ${isExpanded ? 'expanded' : ''}`;
  
  return (
    <div 
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={cardRef}
    >
      <div className="profile-content">
        {/* Contenedor de la imagen */}
        <div className="profile-image-container">
          <img 
            src="/perfil.jpg.jpg" 
            alt="Foto de perfil" 
            className="profile-image"
          />
        </div>
        
        {/* Contenido que aparece cuando la tarjeta está expandida */}
        {isExpanded && (
          <div className="expanded-content">
            <h1 className="profile-name">Angelica Morales</h1>
            <h2 className="profile-title">UX and Front End Designer</h2>
            <p className="profile-bio typewriter-text">{typing}</p>
            
            <div className="profile-links">
              <h3>Let's connect!</h3>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  LinkedIn
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  GitHub
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  Twitter
                </a>
              </div>
            </div>
            
            <div className="contact-info">
              <h3>Find me here!</h3>
              <p>Email: hello.angelica.morales@gmail.com</p>
              <p>Location: Toronto, Canada</p>
            </div>
            
            <button className="close-button" onClick={(e) => {
              e.stopPropagation(); // Evita que el clic se propague a la tarjeta
              setIsExpanded(false);
            }}>
              Close
            </button>
          </div>
        )}
        
        {/* Contenido que aparece cuando la tarjeta NO está expandida */}
        {!isExpanded && (
          <div className="normal-content">
            <h2 className="profile-name-small">Angelica Morales</h2>
            <p className="profile-title-small">Designer and Developer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
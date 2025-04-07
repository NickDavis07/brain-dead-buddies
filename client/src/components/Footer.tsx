import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleGoBack = () => {
    if(window.history.length > 1) { //Check if there is a previous page in the history stack
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  return (
    <footer className="w-100 mt-auto bg-black p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <div style={{
            display: "inline-block",
            width: "140px", 
            height: "44px",
            position: "relative",
            marginBottom: "12px"
          }}>
            <button
              className="btn"
              style={{
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                padding: '6px 16px',
                backgroundColor: isHovered ? '#333333' : 'transparent',
                color: isHovered ? '#ffffff' : '#ff0000',
                border: isHovered ? 'none' : '2px solid #780000',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isHovered ? '140px' : '110px',
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
              onClick={handleGoBack}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Left-pointing arrow that appears on hover */}
              {isHovered && (
                <span 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.25rem'
                  }}
                >
                  ←
                </span>
              )}
              
              {/* Button text */}
              <span style={{
                marginLeft: isHovered ? '15px' : '0',
                transition: 'margin-left 0.3s ease'
              }}>
                Go Back
              </span>
            </button>
          </div>
        )}
        <h4 style={{ color: 'lightgrey' }}>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="brain"
            aria-hidden="false"
          >
            🧠
          </span>{' '}
          by group 8.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
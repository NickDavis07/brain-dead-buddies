import React from 'react';

interface LifeBarProps {
  // Current health percentage (0-100)
  healthPercentage: number;
  // Optional label
  label?: string;
}

const SurvivalLifeBar: React.FC<LifeBarProps> = ({ 
  healthPercentage = 100, 
  label = "Survival Health"
}) => {
  // Ensure health is between 0-100
  const health = Math.max(0, Math.min(100, healthPercentage));
  
  // Dynamic color calculation based on health percentage
  const getHealthColor = () => {
    // Start with red (low health)
    let r = 255;
    let g = 0;
    let b = 0;
    
    if (health <= 50) {
      // From red to yellow (increase green as health increases)
      g = Math.floor((health / 50) * 255);
    } else {
      // From yellow to green (decrease red as health increases)
      g = 255;
      r = Math.floor(255 - ((health - 50) / 50) * 255);
    }
    
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  // Determine text to show based on health level
  const getHealthStatus = () => {
    if (health > 75) return 'Healthy';
    if (health > 50) return 'Minor Injuries';
    if (health > 25) return 'Injured';
    if (health > 0) return 'Critical';
    return 'Infected';
  };

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      {/* Label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{label}</span>
        <span style={{ color: getHealthColor(), fontWeight: 'bold' }}>
          {getHealthStatus()} ({health}%)
        </span>
      </div>
      
      {/* Life bar container */}
      <div 
        style={{ 
          width: '100%', 
          height: '24px', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid #444', 
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Progress bar */}
        <div 
          style={{ 
            width: `${health}%`, 
            height: '100%', 
            backgroundColor: getHealthColor(),
            borderRadius: '10px',
            transition: 'width 0.5s ease-in-out, background-color 0.5s ease-in-out',
            position: 'relative',
            zIndex: 1
          }}
        />
        
        {/* Striped pattern overlay */}
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            zIndex: 2,
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.5) 10px,
              rgba(255, 255, 255, 0.5) 20px
            )`
          }}
        />
        
        {/* Pulse effect for critical health */}
        {health <= 25 && (
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${health}%`,
              height: '100%',
              backgroundColor: getHealthColor(),
              borderRadius: '10px',
              opacity: 0.3,
              zIndex: 3,
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />
        )}
      </div>
      
      {/* Add this CSS for the pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.3; }
            50% { opacity: 0.7; }
            100% { opacity: 0.3; }
          }
        `}
      </style>
    </div>
  );
};

export default SurvivalLifeBar;

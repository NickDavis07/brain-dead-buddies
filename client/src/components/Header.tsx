import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import logo from "../assets/Zombie_logo.png";
import logo2 from "../assets/scared_brain.png";
import { useState } from "react";

const Header = () => {
  const logout = () => {
    Auth.logout();
  };
  
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  return (
    <header 
      className="text-light mb-4 py-3" 
      style={{ 
        backgroundImage: "url('/src/assets/header_background.png')", // Use an absolute path
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
    >
      <div className="container mx-auto">
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "100px 1fr 100px", 
          alignItems: "center" 
        }}>
          {/* Left: Zombie Logo */}
          <div>
            <img 
              src={logo} 
              alt="Brain Dead Buddies Logo" 
              className="logo" 
              style={{ width: "100px", height: "100px" }} 
            />
          </div>
          
          {/* Center: Title, Description and Buttons */}
          <div className="text-center" style={{ flex: 1, margin: "0 20px" }}>
            <Link className="text-decoration-none" to="/">
              {/* Military-style font title */}
              <h1 className="m-0" style={{
                fontFamily: "'Black Ops One', 'Orbitron', sans-serif",
                fontSize: "2.6rem",
                letterSpacing: "3px",
                color: "#FFFFFF",
                textTransform: "uppercase",
                fontWeight: "400",
                textShadow: "2px 2px 0px #990000, 4px 4px 0px rgba(0, 0, 0, 0.5)",
                margin: "0 auto 10px auto",
                padding: "5px 0"
              }}>
                Brain Dead Buddies
              </h1>
            </Link>
            
            {/* Add this in your index.html head section or CSS file:
            <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
            */}
            
            <p className="m-0 mb-2">
              Brain Dead Buddies is a zombie survival checklist and tips forum to help you outsmart the brain-dead before they get your brains.
            </p>
            
            {/* Navigation Buttons */}
            <div className="mt-2">
              {Auth.loggedIn() ? (
                <>
                  <Link className="btn btn-lg btn-secondary m-2" to="/checklist">
                    <strong>Survival Checklist</strong>
                  </Link>
                  <Link className="btn btn-lg btn-secondary m-2" to="/blog">
                    <strong>Blog</strong>
                  </Link>
                  <button className="btn btn-lg btn-light m-2" onClick={logout}>
                    <strong>Logout</strong>
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-lg btn-secondary m-2" to="/login">
                    <strong>Login</strong>
                  </Link>
                  <Link className="btn btn-lg btn-light m-2" to="/signup">
                    <strong>Sign Up</strong>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Right: Profile */}
          <div className="text-center">
            {Auth.loggedIn() && (
              <div className="text-right">
                <Link 
                  to="/me" 
                  className="text-decoration-none"
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                >
                  {/* Dark box container with the profile */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      boxShadow: isProfileHovered ? "0 0 8px 2px #990000, 0 0 12px 4px rgba(153, 0, 0, 0.5)" : "none",
                      transition: "all 0.3s ease",
                      width: "fit-content",
                      minWidth: "140px"
                    }}
                  >
                    {/* Username */}
                    <span 
                      style={{ 
                        fontSize: "16px", 
                        fontWeight: "500",
                        color: isProfileHovered ? "#ff3333" : "#ffffff",
                        textShadow: isProfileHovered ? "0 0 5px rgba(153, 0, 0, 0.8)" : "none",
                        marginBottom: "6px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {Auth.getProfile().data.username}
                    </span>
                    
                    {/* Profile image - below the username */}
                    <img
                      src={logo2}
                      alt="Profile Icon"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        filter: isProfileHovered ? "drop-shadow(0 0 3px rgba(153, 0, 0, 0.8))" : "none",
                        transition: "all 0.3s ease"
                      }}
                    />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import logo from "../assets/Zombie_logo.png"; // Adjust path if necessary
import logo2 from "../assets/scared_brain.png"; // Use this as the profile icon
import { useState } from "react";

const Header = () => {
  const logout = () => {
    Auth.logout();
  };
  
  // State to track hover for the profile
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  return (
    <header 
      className="text-light mb-4 py-3" 
      style={{ 
      backgroundImage: "url('src/assets/header_background.png')", // Ensure you have this image in your public/assets folder
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
            <Link className="text-light" to="/">
              <h1 className="m-0">Brain Dead Buddies</h1>
            </Link>
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
                  {/* Container with glowing box effect */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: isProfileHovered ? "rgba(0, 255, 0, 0.1)" : "transparent",
                      boxShadow: isProfileHovered ? "0 0 10px 3px rgba(0, 255, 0, 0.7)" : "none",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {/* Username with glow effect */}
                    <span 
                      className="mb-1" 
                      style={{ 
                        fontSize: "24px", 
                        fontWeight: "bold",
                        color: isProfileHovered ? "#00ff00" : "#fff",
                        textShadow: isProfileHovered ? "0 0 5px rgba(0, 255, 0, 0.8)" : "none",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {Auth.getProfile().data.username}
                    </span>
                    
                    {/* Profile image container */}
                    <div style={{
                      position: "relative",
                      width: "80px",
                      height: "60px",
                      borderRadius: "50%"
                    }}>
                      {/* The actual profile image */}
                      <img
                        src={logo2}
                        alt="Profile Icon"
                        style={{
                          width: "90px",
                          height: "65px",
                          borderRadius: "50%",
                          filter: isProfileHovered ? "drop-shadow(0 0 3px rgba(0, 255, 0, 0.8))" : "none",
                          transition: "all 0.3s ease"
                        }}
                      />
                    </div>
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

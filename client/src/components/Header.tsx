import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import logo from "../assets/Zombie_logo.png";
import logo2 from "../assets/scared_brain.png";
import headerBackground from "../assets/header_background.png"; // Import the background image
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
        backgroundImage: `url(${headerBackground})`, // Use the imported image
        backgroundSize: "cover", 
        backgroundPosition: "top center", 
        backgroundRepeat: "no-repeat", 
        minHeight: "200px", // Use minHeight to allow dynamic adjustment
        display: "flex", 
        alignItems: "flex-start", // Align content to the top
        justifyContent: "center", // Center content horizontally
        position: "relative", // Enable absolute positioning for child elements
        marginBottom: "100px", // Reduced bottom margin to prevent excessive spacing
      }}
    >
      {/* Left: Zombie Logo */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
      >
        <img 
          src={logo} 
          alt="Brain Dead Buddies Logo" 
          className="logo" 
          style={{ width: "80px", height: "80px" }} 
        />
      </div>

      {/* Right: Profile */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10, // Ensure it stays above other elements
        }}
      >
        {Auth.loggedIn() && (
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
                boxShadow: isProfileHovered
                  ? "0 0 8px 2px #990000, 0 0 12px 4px rgba(153, 0, 0, 0.5)"
                  : "none",
                transition: "all 0.3s ease",
                width: "fit-content",
                minWidth: "140px",
              }}
            >
              {/* Username */}
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: isProfileHovered ? "#ff3333" : "#ffffff",
                  textShadow: isProfileHovered
                    ? "0 0 5px rgba(153, 0, 0, 0.8)"
                    : "none",
                  marginBottom: "6px",
                  transition: "all 0.3s ease",
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
                  filter: isProfileHovered
                    ? "drop-shadow(0 0 3px rgba(153, 0, 0, 0.8))"
                    : "none",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          </Link>
        )}
      </div>

      {/* Center: Title, Description, and Buttons */}
      <div className="container mx-auto" style={{ 
        paddingTop: "10px", 
        textAlign: "center", 
        position: "relative", // Ensure buttons stay within the header
        zIndex: 1 // Ensure buttons are above the background image
      }}>
        <Link className="text-decoration-none" to="/">
          {/* Military-style font title */}
          <h1 className="m-0" style={{
            fontFamily: "'Black Ops One', 'Orbitron', sans-serif",
            fontSize: "2.2rem", // Adjusted font size
            letterSpacing: "3px",
            color: "#FFFFFF",
            textTransform: "uppercase",
            fontWeight: "400",
            textShadow: "2px 2px 0px #990000, 4px 4px 0px rgba(0, 0, 0, 0.5)",
            margin: "0 auto 5px auto", // Reduced bottom margin
            padding: "5px 0"
          }}>
            Brain Dead Buddies
          </h1>
        </Link>
        
        <p className="m-0 mb-2" style={{ fontSize: "1rem" }}> {/* Adjusted font size */}
          Brain Dead Buddies is a zombie survival checklist and tips forum to help you outsmart the brain-dead before they get your brains.
        </p>
        
        {/* Navigation Buttons */}
        <div className="mt-2" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-secondary m-1" to="/checklist"> {/* Adjusted button size */}
                <strong>Survival Checklist</strong>
              </Link>
              <Link className="btn btn-lg btn-secondary m-1" to="/blog"> {/* Adjusted button size */}
                <strong>Blog</strong>
              </Link>
              <button className="btn btn-lg btn-light m-1" onClick={logout}> {/* Adjusted button size */}
                <strong>Logout</strong>
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-secondary m-1" to="/login"> {/* Adjusted button size */}
                <strong>Login</strong>
              </Link>
              <Link className="btn btn-lg btn-light m-1" to="/signup"> {/* Adjusted button size */}
                <strong>Sign Up</strong>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

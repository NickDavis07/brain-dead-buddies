import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import logo from "../assets/Zombie_logo.png"; // Adjust path if necessary
import logo2 from "../assets/scared_brain.png"; // Use this as the profile icon

const Header = () => {
  const logout = () => {
    Auth.logout();
  };

  return (
    <header className="bg-dark text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        {/* Left Logo */}
        <div className="d-flex align-items-center" style={{ position: "absolute", left: "30px" }}>
          <img src={logo} alt="Brain Dead Buddies Logo" className="logo" style={{ width: "100px", height: "100px" }} />
        </div>

        {/* Center Title and Description */}
        <div className="d-flex flex-column align-items-center">
          <Link className="text-light" to="/">
            <h1 className="m-0">Brain Dead Buddies</h1>
          </Link>
          <p className="m-0">
            Brain Dead Buddies is a zombie survival checklist and tips forum to help you outsmart the brain-dead before they get your brains.
          </p>
        </div>

        {/* Profile Button (Top Right) */}
        {Auth.loggedIn() && (
          <Link
            to="/me"
            //make the below button a dark gray color utilizing tailwind
            className="btn btn-dark m-2"
            // Add custom styles for the profile button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "5px 10px",
              borderRadius: "20px",
              textDecoration: "none",
            }}
          >
            {/* User's Name */}
            <span
              className="text-light"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              {Auth.getProfile().data.username}
            </span>
            {/* Profile Icon */}
            <img
              src={logo2} // Use the scared_brain.png asset as the profile icon
              alt="Profile Icon"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
            />
          </Link>
        )}

        {/* Buttons */}
        <div>
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
    </header>
  );
};

export default Header;

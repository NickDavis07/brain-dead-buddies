
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import logo from "../assets/Zombie_logo.png"; // Adjust path if necessary
import logo2 from "../assets/scared_brain.png"; // Optional: if you want to use a different logo for the right side

const Header = () => {
  const logout = () => {
    Auth.logout();
  };
  return (
    <header className="bg-dark text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="d-flex align-items-center" style={{ position: "absolute", left: "30px" }}>
          <img src={logo} alt="Brain Dead Buddies Logo" className="logo" style={{ width: "100px", height: "100px" }} />
        </div>
        <div className="d-flex align-items-center" style={{ position: "absolute", right: "30px" }}>
          <img src={logo2} alt="scared Brain" className="logo" style={{ width: "100px", height: "100px" }} />
        </div>
        <div className="d-flex flex-column align-items-center">
          <Link className="text-light" to="/">
            <h1 className="m-0">Brain Dead Buddies</h1> 
          </Link>
          <p className="m-0">
            Brain Dead Buddies is a zombie survival checklist and tips forum to help you outsmart the brain-dead before they get your brains.
          </p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-secondary m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <Link className="btn btn-lg btn-secondary m-2" to="/checklist">
                Survival Checklist
              </Link>
              <Link className="btn btn-lg btn-secondary m-2" to="/blog">
                Blog
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-secondary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

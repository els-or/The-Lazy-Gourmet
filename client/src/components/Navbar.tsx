import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
      <h1>Welcome to Lazy Gourmet Selection Screen!</h1>
      <div>
        {!loginCheck ? (
          <button className="btn" type="button">
            <Link to="/login">Login</Link>
          </button>
        ) : (
          <div>
            <Link to="/history" className="btn">
              History
            </Link>
            <button
              className="btn"
              type="button"
              onClick={() => {
                auth.logout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

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
    <div className="display-flex justify-space-between bg-background-secondary p-5">
      <h1 className="font-header">The Lazy Gourmet</h1>
      <div>
        {!loginCheck ? (
          <Link to="/login">
            <button className="btn w-20 m-2" type="button">
              Login
            </button>
          </Link>
        ) : (
          <div className="display-flex flex-row justify-space-between">
            <Link to="/history">
              <button className="btn w-35 m-2" type="button">
                Recipe History
              </button>
            </Link>
            <button
              className="btn w-20 m-2"
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

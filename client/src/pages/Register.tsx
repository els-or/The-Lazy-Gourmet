import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState<{
    username?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
  }>({});
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      // go to login page

      navigate("/login");
    } catch (err) {
      console.error("Failed to register user", err);
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  return (
    <div className="form-container bg-background-tertiary p-5 mx-auto rounded-lg shadow-xl">
      <form className="form login-form" onSubmit={handleSubmit}>
        <h1 className="font-header">New User Registration</h1>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={userData.username || ""}
            onChange={handleChange}
            placeholder="username"
          />
        </div>
        <div className="form-group">
          <label>E-Mail</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={userData.email || ""}
            onChange={handleChange}
            placeholder="lazychez@gourmet.net"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={userData.password || ""}
            onChange={handleChange}
            placeholder="password"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

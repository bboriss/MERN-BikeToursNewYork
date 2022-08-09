import React, { useState } from "react";

const Login = (props) => {
  const initialUserState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { email, value } = event.target;
    setUser({ ...user, [email]: value });
  };

  const login = () => {
    props.login(user);
    props.history.push("/");
  };

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            value={user.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            required
            value={user.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

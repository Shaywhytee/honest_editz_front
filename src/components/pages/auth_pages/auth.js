import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth_context";
import { withRouter } from "react-router-dom";

function AdminLogin({history }) {
  const { loginError, setLoginError, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/verify', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const { token } = response.data;
      localStorage.setItem('token', token);
      login(token);
      history.push("/home")
    } catch (error) {
      setLoginError(true);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      <h1>AdminLogin</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {loginError && <p>Invalid username or password</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}


export default withRouter(AdminLogin);
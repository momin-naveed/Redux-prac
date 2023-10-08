import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button, Input, Space } from 'antd';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('momin876@gmail.com');
  const [password, setPassword] = useState('Momin@123');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    console.log('========', user);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await axios.post('http://localhost:3003/login', {
      email,
      password,
    });
    dispatch({ type: 'LOGGED_IN_USER', payload: result.data });
    navigate('/profile');
    console.log(result.data);
  };

  const handleLogoutSubmit = async () => {
    setLoading(true);
    dispatch({ type: 'LOGGED_OUT_USER', payload: null });
  };

  return (
    <div className="container p-5 mt-20">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              autoFocus
            />
            <input
              type="password"
              password="Your password should be more then 6 charcters"
              className="form-control mt-3"
              value={password}
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-between ">
              <Button onClick={handleLoginSubmit} className="mt-3">
                Login
              </Button>
              <Button onClick={handleLogoutSubmit} className="mt-3">
                Log Out
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

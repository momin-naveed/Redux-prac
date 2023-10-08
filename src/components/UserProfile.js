import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { user } = useSelector((s) => s);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.result.firstName);
      setLastName(user.result.lastName);
      setEmail(user.result.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const result = await axios.put('http://localhost:3003/update', {
        userId: user.result._id,
        email,
        firstName,
        lastName,
      });
      const tmp = {
        result: result.data,
        accessToken: user.accessToken,
        msg: user.msg,
      };
      dispatch({ type: 'UPDATE_USER', payload: tmp });
      console.log(tmp);
      setError('');
    } catch (err) {
      setError(err.response.data.msg);
      console.log('ERRRRRRR====>', error);
    }
  };

  return (
    <div
      style={{ height: '600px' }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div style={{ width: '50%' }}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            FirstName :
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="FirstName"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={firstName}
            onChange={(e) => {
              setError('');
              setFirstName(e.target.value);

              if (e.target.value === '') {
                setError('First Name is missing...');
              }
            }}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            LastName :
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="lastName"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={lastName}
            onChange={(e) => {
              setError('');
              setLastName(e.target.value);
              if (e.target.value === '') {
                setError('Last Name is missing...');
              }
            }}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Email :
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between ">
          <span>{error}</span>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

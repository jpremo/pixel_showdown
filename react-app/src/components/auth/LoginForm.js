import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login, demoLogin } from "../../services/auth";
import { useDispatch, useSelector } from 'react-redux'
import { loginDemoUser, setUser } from '../../store/session'
import { setLoginModal, setSignupModal } from '../../store/modal'

//login form component; used inside of ModalContainer
const LoginForm = ({ authenticated, setAuthenticated, endRoute=null }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false)
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const openSignup = (e) => {
    dispatch(setSignupModal(true))
    dispatch(setLoginModal(false))
  }
  const cancel = (e) => {
    dispatch(setLoginModal(false))
    if(endRoute && confirmed) {
      history.push(endRoute)
    }
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUser(user))
      setConfirmed(true)
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async () => {
    const user = await dispatch(loginDemoUser());
    if (!user.errors) {
      setAuthenticated(true);
      setConfirmed(true)
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  if (confirmed) {
    return (
      <>
        <h1 className='modal-title'>Success!</h1>
        <div className='modal-text'>Thanks for logging in {user.firstName}! Go out there and create some awesome art!</div>
        <div className='modal-button-box'>
          <div className='modal-link-div'>
            <div className='modal-link modal-button' onClick={cancel}> Close</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <form onSubmit={onLogin}>
      <h1 className='modal-title'>Log In</h1>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='modal-form-div'>
        <label htmlFor="email">Email/Username</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='modal-form-div'>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <div className='modal-button-box'>
          <div className='modal-link-div'>
            <div className='modal-link modal-button' onClick={onLogin}>Login</div>
          </div>
          <div className='modal-link-div'>
            <div className='modal-link modal-button' onClick={openSignup}> Sign Up</div>
          </div>
          <div className='modal-link-div'>
            <div className='modal-link modal-button' onClick={cancel}> Close</div>
          </div>
        </div>
        <div className='modal-button-box'>
          <div className='modal-link-div'>
            <div className='modal-link modal-button' onClick={demoLogin}>Demo Login</div>
          </div>
        </div>

      </div>
    </form >
  );
};

export default LoginForm;

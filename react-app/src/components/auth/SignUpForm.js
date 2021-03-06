import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { setLoginModal, setSignupModal } from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/session'

//sign up form component; used inside of ModalContainer
const SignUpForm = ({ authenticated, setAuthenticated, endRoute=null }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false)
  const [biography, setBiography] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const openLogin = (e) => {
    dispatch(setSignupModal(false))
    dispatch(setLoginModal(true))
  }
  const cancel = (e) => {
    dispatch(setSignupModal(false))
    if(endRoute && confirmed) {
      history.push(endRoute)
    }
  }

  const onSignUp = async (e) => {
    e.preventDefault();

    const user = await signUp(username, email, password, repeatPassword, firstName, lastName, biography);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(setUser(user))
      setConfirmed(true)
    } else {
      setErrors(user.errors);
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateBiography = (e) => {
    setBiography(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  if (confirmed) {
    return (
      <>
        <h1 className='modal-title'>Success!</h1>
        <div className='modal-text'>Thanks for signing up {user.firstName}! Get out there and start on your first masterpiece!</div>
        <div className='modal-button-box'>
          <div className='modal-link-div'>
            <div className='modal-link modal-button' onClick={cancel}> Close</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <form onSubmit={onSignUp}>
      <h1 className='modal-title'>Sign Up</h1>
      <div>
        {errors.map((error, ind) => (
          <div className='modal-errors' key={ind}>{error}</div>
        ))}
      </div>
      <div className='side-align'>
        <div className='modal-form-div'>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div className='modal-form-div'>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
      </div>
      <div className='side-align'>
        <div className='modal-form-div'>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className='modal-form-div'>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
      </div>
      <div className='side-align'>
        <div className='modal-form-div'>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='modal-form-div'>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
          ></input>
        </div>
      </div>
      <div className='modal-form-div'>
        <label htmlFor="body">Biography</label>
        <textarea
          id='sign-up-biography'
          name="body"
          placeholder="(optional)"
          value={biography}
          onChange={updateBiography}
          maxLength={1000} />
        <div className='word-counter'>{biography.length}/1000</div>
      </div>
      <div className='modal-button-box'>
        <div className='modal-link-div'>
          <div className='modal-link modal-button' onClick={onSignUp}>Sign Up</div>
        </div>
        <div className='modal-link-div'>
          <div className='modal-link modal-button' onClick={openLogin}>Log In</div>
        </div>
        <div className='modal-link-div'>
          <div className='modal-link modal-button' onClick={cancel}>Close</div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;

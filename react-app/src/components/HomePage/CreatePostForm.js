import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/session'
import { setCreatePostModal } from '../../store/modal'

//login form component; used inside of ModalContainer
const CreatePostForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)


  const cancel = (e) => {
    dispatch(setCreatePostModal(false))
  }

  const onPost = async (e) => {

  };



  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form>
      <h1 className='modal-title'>New Post</h1>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className='modal-form-div'>
        <label htmlFor="email">Email</label>
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
            <div className='modal-link modal-button' onClick={cancel}> Close</div>
          </div>
        </div>

      </div>
    </form >
  );
};

export default CreatePostForm;

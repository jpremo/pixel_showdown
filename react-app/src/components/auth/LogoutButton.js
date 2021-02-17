import React from "react";
import { logout } from "../../services/auth";
import { removeUser } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { setLogoutModal } from '../../store/modal'

//Component that logs out user on click
const LogoutButton = ({setAuthenticated}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await logout();
    dispatch(removeUser())
    setAuthenticated(false);
    history.push('/')
    dispatch(setLogoutModal(true))
  };

  return <button id="logout" className="nav-link" onClick={onLogout}>Log-Out</button>;
};

export default LogoutButton;

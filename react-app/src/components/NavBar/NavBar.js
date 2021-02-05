import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import picture from "./pixel_showdown_logo.png"
import { setLoginModal, setSignupModal } from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './ModalContainer'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import { changeProperty } from '../../store/canvas'

//Handles the display of the navbar
const NavBar = ({ setAuthenticated }) => {
  const modals = useSelector(state => state.modal)
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  //opens login modal
  const openLogin = (e) => {
    dispatch(setLoginModal(true))
    dispatch(setSignupModal(false))
  }

  //opens signup modal
  const openSignup = (e) => {
    dispatch(setSignupModal(true))
    dispatch(setLoginModal(false))
  }

  //Resets redux store is sketch nav-button is pressed
  const resetSketch = () => {
    const initialSettings = {
      pixelSize: 20,
      height: 32,
      width: 32,
      color: [180, 180, 180, 1],
      grid: [{}, {}, {}, {}, {}, {}, {}, {}],
      currentGrid: {},
      finalGrid: {},
      moveHistory: [[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]],
      historyPosition: [0, 0, 0, 0, 0, 0, 0, 0],
      editing: null,
      editLink: null,
      title: 'Title',
      fps: 1,
      totalFrames: 1,
    }

    dispatch(changeProperty(initialSettings))
  }
  return (
    <nav id='nav-bar'>
      <ModalContainer hidden={!modals.login} cancel={setLoginModal}>
        <LoginForm setAuthenticated={setAuthenticated}></LoginForm>
      </ModalContainer>
      <ModalContainer hidden={!modals.signup} cancel={setSignupModal}>
        <SignUpForm setAuthenticated={setAuthenticated}></SignUpForm>
      </ModalContainer>
      <div id='nav-bar-logo-picture-div'>
        <NavLink exact to="/" activeClassName="home-active">
          <img id="nav-bar-logo-picture" src={picture} alt='' />
        </NavLink>
      </div>
      <div id="nav-bar-menu">
        <NavLink to={'/sketch'} onClick={resetSketch} exact={true} className="nav-link" activeClassName="active">
          Sketch
        </NavLink>
        <NavLink to={'/rulesets/create'} onClick={resetSketch} exact={true} className="nav-link" activeClassName="active">
          Create Ruleset
        </NavLink>
        {!user.id &&
          <>
            <div onClick={openLogin} className="nav-link">
              Login
          </div>
            <div onClick={openSignup} className="nav-link">
              Sign Up
          </div>
          </>
        }

        {user.id && <>
          <NavLink to={`/users/${user.id}`} exact={true} className="nav-link" activeClassName="active">
            Profile
        </NavLink>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </>}

      </div>
    </nav>
  );
}

export default NavBar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import picture from "./pixel_showdown_logo.png"
import { setLoginModal, setSignupModal, setCreateCompetitionModal, setCreatePostModal } from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './ModalContainer'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import { changeProperty } from '../../store/canvas'
import CreatePostForm from "../HomePage/CreatePostForm";
import CreateCompetitionForm from "../HomePage/CreateCompetitionForm";
import LogOutModal from '../auth/LogOutModal';

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

  const openPostModal = (e) => {
    if (user.id) {
      dispatch(setCreatePostModal(true))
    } else {
      dispatch(setLoginModal(true))
    }
  }

  const openCompetitionModal = (e) => {
    if (user.id) {
      dispatch(setCreateCompetitionModal(true))
    } else {
      dispatch(setLoginModal(true))
    }
  }

  //Resets redux store is sketch nav-button is pressed
  const resetSketch = () => {
    const initialSettings = {
      pixelSize: 20,
      height: 32,
      width: 32,
      color: [180, 180, 180, 1],
      grid: [{}, {}, {}, {}, {}, {}, {}, {}],
      colorPalette: ["#f44336ff", "#e91e63ff", "#9c27b0ff", "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff", "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"],
      defaultPalette: ["#f44336ff", "#e91e63ff", "#9c27b0ff", "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff", "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"],
      currentGrid: {},
      finalGrid: {},
      moveHistory: [[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]],
      historyPosition: [0, 0, 0, 0, 0, 0, 0, 0],
      editing: null,
      editLink: null,
      title: 'Title',
      fps: 1,
      totalFrames: 1,
      currentFrame: 1,
      ruleset: {}
    }

    dispatch(changeProperty(initialSettings))
  }
  return (
    <>
      <nav id='nav-bar'>
        <ModalContainer hidden={!modals.post} cancel={setCreatePostModal}>
          <CreatePostForm />
        </ModalContainer>
        <ModalContainer hidden={!modals.competition} cancel={setCreateCompetitionModal}>
          <CreateCompetitionForm />
        </ModalContainer>
        <ModalContainer hidden={!modals.login} cancel={setLoginModal}>
          <LoginForm setAuthenticated={setAuthenticated}></LoginForm>
        </ModalContainer>
        <ModalContainer hidden={!modals.signup} cancel={setSignupModal}>
          <SignUpForm setAuthenticated={setAuthenticated}></SignUpForm>
        </ModalContainer>
        <ModalContainer hidden={!modals.logout} cancel={null}>
          <LogOutModal/>
        </ModalContainer>
        <div id='nav-bar-logo-picture-div'>
          <NavLink exact to="/" activeClassName="home-active">
            <img id="nav-bar-logo-picture" src={picture} alt='' />
          </NavLink>
        </div>
        <div id="nav-bar-menu">
          <NavLink to={'/sketch'} onClick={resetSketch} exact={false} className="nav-link" activeClassName="active">
            Sketch
        </NavLink>
          <NavLink to={'/rulesets/create'} onClick={resetSketch} exact={true} className="nav-link" activeClassName="active">
            Create Ruleset
        </NavLink>
          {/* <div className='modal-link modal-button' onClick={openPostModal}>New Post</div> */}
          <div className='nav-link' onClick={openCompetitionModal}>New Competition</div>
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
      <div className='nav-spacer'></div>
    </>
  );
}

export default NavBar;

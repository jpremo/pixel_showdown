import React from 'react';
import ModalContainer from '../NavBar/ModalContainer'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import {loginDemoUser} from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModal, setSignupModal } from '../../store/modal'
import { useHistory } from 'react-router-dom';
const SplashPage = ({setAuthenticated}) => {
    const user = useSelector(state => state.session.user)
    const modals = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const history = useHistory()
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

  const demoLogin = async () => {
    const user = await dispatch(loginDemoUser());
    if (!user.errors) {
      setAuthenticated(true);
      history.push('/home')
    }
  }
    return (
        <>
            <ModalContainer hidden={!modals.login} cancel={setLoginModal}>
                <LoginForm setAuthenticated={setAuthenticated} endRoute={'/home'}></LoginForm>
            </ModalContainer>
            <ModalContainer hidden={!modals.signup} cancel={setSignupModal}>
                <SignUpForm setAuthenticated={setAuthenticated} endRoute={'/home'}></SignUpForm>
            </ModalContainer>
            <div>
                SplashPage
            </div>
            {!user.id &&
                <>
                    <div onClick={openLogin} className="nav-link">
                        Login
                    </div>
                    <div onClick={openSignup} className="nav-link">
                        Sign Up
                    </div>
                    <div onClick={demoLogin} className="nav-link">
                        Demo Login
                    </div>
                </>
            }
        </>
    );

}

export default SplashPage;

import React from 'react';
import ModalContainer from '../NavBar/ModalContainer'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import { loginDemoUser } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModal, setSignupModal } from '../../store/modal'
import { useHistory, NavLink } from 'react-router-dom';
import { resetSketch } from '../utils'
import './SplashPage.css'

const SplashPage = ({ setAuthenticated }) => {
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

    const setSketch = () => {
        resetSketch(dispatch)
    }

    const sketchNavigate = () => {
        setSketch()
        history.push('/sketch')
    }

    const homeNavigate = () => {
        setSketch()
        history.push('/home')
    }

    const profileNavigate = () => {
        history.push(`/users/${user.id}`)
    }

    return (
        <>
            <ModalContainer hidden={!modals.login} cancel={setLoginModal}>
                <LoginForm setAuthenticated={setAuthenticated} endRoute={'/home'}></LoginForm>
            </ModalContainer>
            <ModalContainer hidden={!modals.signup} cancel={setSignupModal}>
                <SignUpForm setAuthenticated={setAuthenticated} endRoute={'/home'}></SignUpForm>
            </ModalContainer>
            <div className='splash-content'>
                <div className='splash-image-container'>
                <img className='gif-example' src='https://pixel-showdown.s3.amazonaws.com/Static/heart_animation.png' alt='Heart' />
                    <div className='splash-header-container'>
                        <div className='splash-title'>
                            Welcome to Pixel Showdown!
                        </div>
                        <div className='splash-subtitle'>
                            {(user.id) ?  `Welcome back ${user.firstName}! Ready to get drawing again?`:
                            'A space to express your creativity and competitiveness through pixel art'}
                        </div>
                        <div className="splash-bar-menu">
                            {!user.id &&
                                <>
                                    <div onClick={openLogin} className="splash-link">
                                        Login
                                    </div>
                                    <div onClick={openSignup} className="splash-link">
                                        Sign Up
                                    </div>
                                    <div onClick={demoLogin} className="splash-link">
                                        Demo Login
                                    </div>
                                </>
                            }
                            {user.id &&
                                <>
                                    <div onClick={homeNavigate} className="splash-link">
                                        Home
                                    </div>
                                    <div onClick={sketchNavigate} className="splash-link">
                                        Sketch
                                    </div>
                                    <div onClick={profileNavigate} className="splash-link">
                                        Profile
                                    </div>
                                </>
                            }
                </div>
                    </div>
                    <img className='gif-example' src='https://pixel-showdown.s3.amazonaws.com/Static/heart_animation.png' alt='Heart' />
                </div>

                <div className='splash-image-container'>
                    {/* <img className='gif-example' src='https://pixel-showdown.s3.amazonaws.com/Static/heart_animation.png' alt='Heart' /> */}
                    <img className='gif-demo' src='https://pixel-showdown.s3.amazonaws.com/Static/sketch.gif' alt='Sketch Demo' />
                    {/* <img className='gif-example' src='https://pixel-showdown.s3.amazonaws.com/Static/heart_animation.png' alt='Heart' /> */}
                </div>
                {!user.id &&
                    <div className='splash-aligner'>
                        <div className='splash-paragraph' onClick={sketchNavigate}>
                            <div className='splash-text'>
                                Use free sketch mode to test out our dynamic pixel art editor equipped with an array of advanced features like animation.
                        </div>
                            {/* <NavLink to={'/sketch'} onClick={setSketch} exact={false} className="modal-link" activeClassName="active">
                                Sketch
                        </NavLink> */}
                        </div>
                        <div className='splash-paragraph' onClick={homeNavigate}>
                            <div className='splash-text'>
                                Explore and participate in the customized pixel art competitions created by our users... or make your own.
                        </div>
                            {/* <NavLink to={'/home'} onClick={setSketch} exact={false} className="modal-link" activeClassName="active">
                                Explore
                        </NavLink> */}
                        </div>
                    </div>
                }
            </div>
        </>
    );

}

export default SplashPage;

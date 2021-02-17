import React from "react";
import { logout } from "../../services/auth";
import { removeUser } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { setLogoutModal } from '../../store/modal'

const LogOutModal = ({ authenticated, setAuthenticated }) => {
    const dispatch = useDispatch()
    const cancel = () => {
        dispatch(setLogoutModal(false))
      }
        return (
          <>
            <h1 className='modal-title'>You've Been Logged Out</h1>
            <div className='modal-text'>We look forward to seeing you again soon.</div>
            <div className='modal-button-box'>
              <div className='modal-link-div'>
                <div className='modal-link modal-button' onClick={cancel}> Close</div>
              </div>
            </div>
          </>
        )
}

export default LogOutModal

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/session'
import { setCreateCompetitionModal } from '../../store/modal'
import CompetitionSelector from './CompetitionSelector'
import Select from 'react-select'
//login form component; used inside of ModalContainer
const CreateCompetitionForm = ({ authenticated, setAuthenticated }) => {
    const [errors, setErrors] = useState([]);
    const [body, setBody] = useState("");
    const [password, setPassword] = useState("");
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        setLoaded(true)
    }, [])

    const cancel = (e) => {
        dispatch(setCreateCompetitionModal(false))
    }

    const onPost = async (e) => {
        console.log('posted')
    };



    const updateBody = (e) => {
        setBody(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <form>
            {loaded &&
                <>
                    <h1 className='modal-title'>New Competition</h1>
                    <CompetitionSelector />
                    <div className='modal-form-div'>
                        <label htmlFor="body">Email</label>
                        <textarea
                            id='competition-modal-body'
                            name="body"
                            placeholder="Body"
                            value={body}
                            onChange={updateBody} />
                    </div>

                    <div className='modal-button-box'>
                        <div className='modal-link-div'>
                            <div className='modal-link modal-button' onClick={onPost}> Post</div>
                        </div>
                        <div className='modal-link-div'>
                            <div className='modal-link modal-button' onClick={cancel}> Close</div>
                        </div>
                    </div>


                </>
            }

        </form >
    );
};

export default CreateCompetitionForm;

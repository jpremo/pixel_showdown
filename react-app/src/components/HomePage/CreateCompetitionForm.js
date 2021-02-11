import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
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
    const [ruleset, setRuleset] = useState(undefined)

    const history = useHistory()

    useEffect(() => {
        setLoaded(true)
    }, [])

    const cancel = (e) => {
        dispatch(setCreateCompetitionModal(false))
    }

    const onPost = async (e) => {
        const obj = {
            rulesetId: ruleset,
            body,
            attachments: {},
            userId: user.id
        }
        const response = await fetch("/api/posts/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          });
          const data = await response.json()
          dispatch(setCreateCompetitionModal(false))
          history.push(`/competitions/${data.id}`)
    };

    const updateBody = (e) => {
        setBody(e.target.value);
    };


    return (
        <form>
            {loaded &&
                <>
                    <h1 className='modal-title'>New Competition</h1>
                    <CompetitionSelector setRuleset={setRuleset}/>
                    <div className='modal-form-div'>
                        <label htmlFor="body">Post Body</label>
                        <textarea
                            id='competition-modal-body'
                            name="body"
                            placeholder="Post Body"
                            value={body}
                            onChange={updateBody}
                            maxLength={1000} />
                        <div className='word-counter'>{body.length}/1000</div>
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

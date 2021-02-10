import React from "react";
import Canvas from '../canvas/Canvas'
import CanvasTools from '../canvas/CanvasTools'
import { pixelParser, rgbToHex } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import CompleteCanvas from '../canvas/CompleteCanvas'
import { setCreatePostModal, setLoginModal, setCreateCompetitionModal } from '../../store/modal'
import CreatePostForm from "./CreatePostForm";
import CreateCompetitionForm from "./CreateCompetitionForm";
import ModalContainer from '../NavBar/ModalContainer'
import './HomePage.css'
//This component organizes the home page
function HomePage() {
    const modals = useSelector(state => state.modal)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

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

    return (
        <>
            <ModalContainer hidden={!modals.post} cancel={setCreatePostModal}>
                <CreatePostForm/>
            </ModalContainer>
            <ModalContainer hidden={!modals.competition} cancel={setCreateCompetitionModal}>
                <CreateCompetitionForm/>
            </ModalContainer>
            <h1>Home</h1>
            <div className='modal-link modal-button' onClick={openPostModal}>New Post</div>
            <div className='modal-link modal-button' onClick={openCompetitionModal}>New Competition</div>
        </>
    );
}
export default HomePage;

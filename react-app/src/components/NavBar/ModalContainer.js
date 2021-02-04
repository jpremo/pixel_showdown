import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Component used to wrap elements that should be displayed in a modal; hidden prop is used to specify the property that
//checks whether the modal should be visible
const Modal = (props) => {
    if (!props.hidden) {
        return (
            <div className='modal-box-wrapper'>
                <div className='modal-box'>
                    {props.children}
                </div>
            </div>
        );
    }
    return null
}

export default Modal;

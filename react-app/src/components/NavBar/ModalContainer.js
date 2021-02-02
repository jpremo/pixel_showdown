import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

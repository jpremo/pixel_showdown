import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/session'
import { setDownloadModal } from '../../store/modal'
import { drawPixel, mergeColors, overwritePixel, pixelParser } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
const DownloadModal = () => {
    const canvasSettings = useSelector(state => state.canvas)
    const [currentOption, setCurrentOption] = useState('png');
    const dispatch = useDispatch()
    const cancel = (e) => {
        dispatch(setDownloadModal(false))
    }

    const swapRadio = (e) => setCurrentOption(e.target.value)

    function imageToDataUri(width, height, pixelSize, format) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        pixelParser(ctx, pixelSize, canvasSettings.grid)

        return canvas.toDataURL(`image/${format}`);
    }

    function download() {
        let width, height, pixelSize, format
        debugger
        switch (currentOption) {
            case 'png':
                width = canvasSettings.width;
                height = canvasSettings.height;
                pixelSize = 1;
                format = 'png';
                break;
            case 'png-current':
                pixelSize = canvasSettings.pixelSize;
                width = canvasSettings.width * pixelSize;
                height = canvasSettings.height * pixelSize;
                format = 'png';
                break;
            case 'jpeg':
                width = canvasSettings.width;
                height = canvasSettings.height;
                pixelSize = 1;
                format = 'jpeg';
                break;
            case 'jpeg-current':
                pixelSize = canvasSettings.pixelSize;
                width = canvasSettings.width * pixelSize;
                height = canvasSettings.height * pixelSize;
                format = 'jpeg';
                break;
            default:
                width = canvasSettings.width;
                height = canvasSettings.height;
                pixelSize = 1;
                format = 'png';
                break;
        }

        let url = imageToDataUri(width, height, pixelSize, format)
        let link = document.createElement('a');
        link.download = `${canvasSettings.title}.${format}`;
        link.href = url;
        link.click();
        dispatch(changeProperty({ downloading: false }))
    }

    return (
        <form>
            <h1 className='modal-title'>Download Format:</h1>
            <div className='radio-list'>
                <input type="radio" id="png" name="download" value="png" onChange={swapRadio}
                    checked={currentOption === 'png' ? 'checked' : ''} />
                <label for="png">PNG</label><br />
                <input type="radio" id="png-current" name="download" value="png-current" onChange={swapRadio}
                    checked={currentOption === 'png-current' ? 'checked' : ''} />
                <label for="png-current">PNG At Current Pixel Size</label><br />
                <input type="radio" id="jpeg" name="download" value="jpeg" onChange={swapRadio}
                    checked={currentOption === 'jpeg' ? 'checked' : ''} />
                <label for="jpeg">JPEG</label><br />
                <input type="radio" id="jpeg-current" name="download" value="jpeg-current" onChange={swapRadio}
                    checked={currentOption === 'jpeg-current' ? 'checked' : ''} />
                <label for="jpeg-current">JPEG At Current Pixel Size</label><br />
            </div>
            <div className='modal-form-div'>
                <div className='modal-button-box'>
                    <div className='modal-link-div'>
                        <div className='modal-link modal-button' onClick={download}>Download</div>
                    </div>
                    <div className='modal-link-div'>
                        <div className='modal-link modal-button' onClick={cancel}>Close</div>
                    </div>
                </div>
            </div>
        </form >
    );
};

export default DownloadModal;

import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setDownloadModal } from '../../store/modal'
import { changeProperty } from '../../store/canvas'
import { imageToDataUri } from './aws'

//This component handles the download modal display and will download the current image to the user's local device at their request
const DownloadModal = () => {
    const canvasSettings = useSelector(state => state.canvas)
    const [currentOption, setCurrentOption] = useState('png'); //specifies download option selected by user
    const dispatch = useDispatch()

    //this function closes the modal
    const cancel = (e) => {
        dispatch(setDownloadModal(false))
    }

    //Swaps the current download option
    const swapRadio = (e) => setCurrentOption(e.target.value)

    //Downloads correct image type as specified by user
    function download() {
        let width, height, pixelSize, format
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

        let url = imageToDataUri(width, height, pixelSize, format, canvasSettings)
        let link = document.createElement('a');
        link.download = `${canvasSettings.title}.${format}`;
        link.href = url;
        link.click();
        dispatch(changeProperty({ downloading: false }))
    }

    return (
        <form>
            <h1 className='modal-title'>Download Format</h1>
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

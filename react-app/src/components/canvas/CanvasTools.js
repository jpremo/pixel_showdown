import React, { useEffect, useState } from 'react'
import './Canvas.css'
import { rgbaToHex } from '../canvas/color_functions'
import { changeProperty } from '../../store/canvas'
import { useDispatch, useSelector } from "react-redux";
import { SketchPicker, AlphaPicker, CirclePicker } from 'react-color'
import useKeyPress from './useKeyPress'
import AddSubtract from './AddSubtract'
import Collapse from './Collapse'
import ModalContainer from '../NavBar/ModalContainer'
import DownloadModal from './DownloadModal'
import { setDownloadModal } from '../../store/modal'
import { useHistory } from 'react-router-dom';
import { saveImage, updateImage } from './aws/index'
import { setLoginModal } from '../../store/modal'
import RuleChecker from './RuleChecker';
import Banner from './Banner'
//This component organizes all of the tools within the tools sidebar of the CompleteCanvas element
const CanvasTools = props => {
    const history = useHistory()
    const dispatch = useDispatch()
    const canvasSettings = props.canvasSettings
    const ruleset = canvasSettings.ruleset
    const modals = useSelector(state => state.modal)
    const user = useSelector(state => state.session.user)

    //setting up some basic rules
    useEffect(() => {
        if (!props.skipDefault || ruleset.defaultPalette) {
            dispatch(changeProperty({ colorPalette: ruleset.defaultPalette }))
        }
    }, [])

    const [stateInterval, setStateInterval] = useState(null) //used for playing animations
    const [addFrame, setAddFrame] = useState(null) //toggles back and forth while animation is playing
    const [saving, setSaving] = useState(null) //sets saving icon/banner when not null
    const [deleteColor, setDeleteColor] = useState(false) //controls whether user is deleting colors in palette
    const [stateColor, setStateColor] = useState({ //current color selected
        r: canvasSettings.color[0],
        g: canvasSettings.color[1],
        b: canvasSettings.color[2],
        a: canvasSettings.color[3]
    })

    useEffect(() => {
        setStateColor({
            r: canvasSettings.color[0],
            g: canvasSettings.color[1],
            b: canvasSettings.color[2],
            a: canvasSettings.color[3]
        })
    }, [canvasSettings])

    //advances the animation by one frame based on interval set in playAnimation function
    useEffect(() => {
        if (canvasSettings.playing) {
            let newFrame = canvasSettings.currentFrame + 1
            if (newFrame > canvasSettings.totalFrames) {
                newFrame = 1
            }
            dispatch(changeProperty({ currentFrame: newFrame, currentGrid: canvasSettings.grid[newFrame - 1] }))
        }
    }, [addFrame])

    useEffect(() => {
        if (!canvasSettings.grid[canvasSettings.totalFrames - 1]) {
            const gridCopy = [...canvasSettings.grid]
            const historyCopy = [...canvasSettings.moveHistory]
            const currentMoveCopy = [...canvasSettings.historyPosition]
            for (let i = 0; i < canvasSettings.totalFrames; i++) {
                if (!canvasSettings.grid[i]) {
                    gridCopy[i] = {}
                    historyCopy[i] = [{}]
                    currentMoveCopy[i] = 0
                }
            }
            dispatch(changeProperty({ grid: gridCopy, moveHistory: historyCopy, historyPosition: currentMoveCopy }))
        }
    }, [canvasSettings.totalFrames])

    //resets animation playing speed upon change in fps
    useEffect(() => {
        if (canvasSettings.playing) {
            clearInterval(stateInterval)
            let addit = true
            let interval = setInterval(() => {
                addit = !addit
                setAddFrame(addit)
            }, 1000 / canvasSettings.fps)
            setStateInterval(interval)
        }
    }, [canvasSettings.fps])

    //These are variables to set the appropriate class for tool icons based on redux state
    const undoClass = canvasSettings.historyPosition[canvasSettings.currentFrame - 1] > 0 ? '' : ' invalid-selection'
    const redoClass = canvasSettings.historyPosition[canvasSettings.currentFrame - 1] === canvasSettings.moveHistory[canvasSettings.currentFrame - 1].length - 1 ? ' invalid-selection' : ''
    const gridClass = canvasSettings.displayGrid ? ' grid-selected' : ''
    const brushClass = canvasSettings.currentTool === 'brush' ? ' selected' : ''
    const eraserClass = canvasSettings.currentTool === 'eraser' ? ' selected' : ''
    const fillClass = canvasSettings.currentTool === 'fill' ? ' selected' : ''
    const colorGrabClass = canvasSettings.currentTool === 'colorGrab' ? ' selected' : ''
    const colorSwapClass = canvasSettings.currentTool === 'colorSwap' ? ' selected' : ''
    const colorSwapBrushClass = canvasSettings.currentTool === 'colorSwapBrush' ? ' selected' : ''
    const removeFromPalette = (canvasSettings.colorPalette && !canvasSettings.colorPalette.length) ? ' invalid-selection' : ''
    const addToPalette = (canvasSettings.colorPalette && canvasSettings.colorPalette.includes(rgbaToHex(canvasSettings.color))) ? ' invalid-selection' : ''
    const removeFromPalette2 = deleteColor ? ' deleting' : ''
    const removeFromPalette3 = deleteColor ? ' selected' : ''
    const playingClass = (canvasSettings.playing || canvasSettings.totalFrames === 1) ? ' selected' : ''
    const pausedClass = !canvasSettings.playing ? ' selected' : ''
    const advanceClass = canvasSettings.totalFrames === 1 ? ' invalid-selection' : ''
    const pasteClass = (canvasSettings.copyFrame === undefined || canvasSettings.copyFrame === canvasSettings.currentFrame) ? ' invalid-selection' : ''

    //These settings are used to adapt color state for components in the react-color package
    let a = canvasSettings.color[3] ? canvasSettings.color[3] : 1
    let colObj = {
        r: canvasSettings.color[0],
        g: canvasSettings.color[1],
        b: canvasSettings.color[2],
        a
    }

    //This code sets up undoing/redoing canvas strokes with ctrl+Z and ctrl+Y
    const ctrl = useKeyPress('Control')
    const z = useKeyPress('z')
    const y = useKeyPress('y')
    const f = useKeyPress('f')
    const d = useKeyPress('d')
    const e = useKeyPress('e')
    const g = useKeyPress('g')
    const s = useKeyPress('s')
    const r = useKeyPress('r')
    const c = useKeyPress('c')
    const v = useKeyPress('v')

    useEffect(() => {
        if (z && ctrl && !canvasSettings.editingTitle && !ruleset.disableUndoRedo && !props.disableHotKeys) {
            undo()
        }
    }, [z])

    useEffect(() => {
        if (y && ctrl && !canvasSettings.editingTitle && !ruleset.disableUndoRedo && !props.disableHotKeys) {
            redo()
        }
    }, [y])

    useEffect(() => {
        if (f && !canvasSettings.editingTitle && !ruleset.disableFill && !props.disableHotKeys) {
            dispatch(changeProperty({ currentTool: 'fill' }))
        }
    }, [f])

    useEffect(() => {
        if (d && !canvasSettings.editingTitle && !props.disableHotKeys) {
            dispatch(changeProperty({ currentTool: 'brush' }))
        }
    }, [d])

    useEffect(() => {
        if (e && !canvasSettings.editingTitle && !ruleset.disableEraser && !props.disableHotKeys) {
            dispatch(changeProperty({ currentTool: 'eraser' }))
        }
    }, [e])

    useEffect(() => {
        if (c && !canvasSettings.editingTitle && !ruleset.disableEyedropper && !props.disableHotKeys) {
            dispatch(changeProperty({ currentTool: 'colorGrab' }))
        }
    }, [c])

    useEffect(() => {
        if (g && !canvasSettings.editingTitle && !ruleset.disableGrid && !props.disableHotKeys) {
            dispatch(changeProperty({ displayGrid: !canvasSettings.displayGrid }))
        }
    }, [g])

    useEffect(() => {
        if (s && !canvasSettings.editingTitle && !ruleset.disableColorSwapBrush && !props.disableHotKeys) {
            dispatch(changeProperty({ currentTool: 'colorSwapBrush' }))
        }
    }, [s])

    useEffect(() => {
        if (r && !canvasSettings.editingTitle && !ruleset.disableColorSwapper && !props.disableHotKeys) {
            dispatch(changeProperty({ currentTool: 'colorSwap' }))
        }
    }, [r])

    useEffect(() => {
        if (c && ctrl && !canvasSettings.editingTitle && !ruleset.disableCopyPaste && !props.disableHotKeys) {
            copy()
        }
    }, [c, ctrl])

    useEffect(() => {
        if (v && ctrl && !canvasSettings.editingTitle && !ruleset.disableCopyPaste && !props.disableHotKeys) {
            paste()
        }
    }, [v, ctrl])


    //Changes color state and updates redux after color selection process is over
    const colorChange = (e) => {
        const colArr = [e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a,]
        dispatch(changeProperty({ color: colArr }))
        setStateColor(e.rgb)
    }

    //Changes color state during color selection process
    const colorState = (e) => {
        setStateColor(e.rgb)
    }

    //Reverts history back by one index; undoes previous canvas stroke
    const undo = () => {
        const frame = canvasSettings.currentFrame - 1
        const newPosition = Math.max(canvasSettings.historyPosition[frame] - 1, 0)
        const positionArrCopy = [...canvasSettings.historyPosition]
        positionArrCopy[frame] = newPosition
        const newGrid = {}
        for (let i = 0; i <= newPosition; i++) {
            Object.assign(newGrid, canvasSettings.moveHistory[frame][i]);
        }
        const gridCopy = [...canvasSettings.grid]
        gridCopy[frame] = newGrid
        dispatch(changeProperty({ historyPosition: positionArrCopy, currentGrid: newGrid, grid: gridCopy }))
    }

    //pushes history forward by one index; redoes next canvas stroke
    const redo = () => {
        const frame = canvasSettings.currentFrame - 1
        const newPosition = Math.min(canvasSettings.historyPosition[frame] + 1, canvasSettings.moveHistory[frame].length - 1)
        const positionArrCopy = [...canvasSettings.historyPosition]
        positionArrCopy[frame] = newPosition
        const newGrid = {}
        for (let i = 0; i <= newPosition; i++) {
            Object.assign(newGrid, canvasSettings.moveHistory[frame][i]);
        }
        const gridCopy = [...canvasSettings.grid]
        gridCopy[frame] = newGrid
        dispatch(changeProperty({ historyPosition: positionArrCopy, currentGrid: newGrid, grid: gridCopy }))
    }

    //increases frame number by one looping if at maximum
    const addOneFrame = () => {
        let newFrame = canvasSettings.currentFrame + 1
        if (newFrame > canvasSettings.totalFrames) {
            newFrame = 1
        }
        dispatch(changeProperty({ currentFrame: newFrame, currentGrid: canvasSettings.grid[newFrame - 1] }))
    }

    //lowers frame number by one looping if at minimum
    const subtractOneFrame = () => {
        let newFrame = canvasSettings.currentFrame - 1
        if (newFrame <= 0) {
            newFrame = canvasSettings.totalFrames
        }
        dispatch(changeProperty({ currentFrame: newFrame, currentGrid: canvasSettings.grid[newFrame - 1] }))
    }

    // useEffect(() => {
    //     let newFrame = canvasSettings.currentFrame - 1
    //     dispatch(changeProperty({ currentFrame: newFrame, currentGrid: canvasSettings.grid[newFrame - 1] }))
    // }, [canvasSettings.currentFrame])

    //starts the animation
    const playAnimation = () => {
        if (!canvasSettings.playing && canvasSettings.totalFrames > 1) {
            dispatch(changeProperty({ playing: true }))
            let addit = true
            let interval = setInterval(() => {
                addit = !addit
                setAddFrame(addit)
            }, 1000 / canvasSettings.fps)
            setStateInterval(interval)
        }
    }

    //pauses the animation
    const pauseAnimation = () => {
        if (canvasSettings.playing) {
            dispatch(changeProperty({ playing: false }))
            clearInterval(stateInterval)
        }
    }


    //The functions below change redux state on button presses to set the appropriate tool/property
    const copy = () => {
        dispatch(changeProperty({ copyFrame: canvasSettings.currentFrame }))
    }

    const paste = () => {
        if (!pasteClass) {
            const frame = canvasSettings.currentFrame - 1
            const copyFrame = { ...canvasSettings.grid[canvasSettings.copyFrame - 1] }
            const newPosition = canvasSettings.historyPosition[frame] + 1
            const newMoveHistory = [...canvasSettings.moveHistory[frame].slice(0, newPosition), copyFrame]
            const moveHistoryCopy = [...canvasSettings.moveHistory]
            moveHistoryCopy[frame] = newMoveHistory
            const positionCopy = [...canvasSettings.historyPosition]
            positionCopy[frame] = newPosition
            const gridCopy = [...canvasSettings.grid]
            gridCopy[frame] = copyFrame
            dispatch(changeProperty({ currentGrid: copyFrame, grid: gridCopy, moveHistory: moveHistoryCopy, historyPosition: positionCopy }))

            // dispatch(changeProperty({ currentGrid: canvasSettings.grid[canvasSettings.currentFrame] }))
        }
    }

    const swapGrid = () => {
        dispatch(changeProperty({ displayGrid: !canvasSettings.displayGrid }))
    }

    const swapEraser = () => {
        dispatch(changeProperty({ currentTool: 'eraser' }))
    }

    const swapBrush = () => {
        dispatch(changeProperty({ currentTool: 'brush' }))
    }

    const swapFill = () => {
        dispatch(changeProperty({ currentTool: 'fill' }))
    }

    const swapColorSwap = () => {
        dispatch(changeProperty({ currentTool: 'colorSwap' }))
    }

    const swapColorSwapBrush = () => {
        dispatch(changeProperty({ currentTool: 'colorSwapBrush' }))
    }

    const swapColorGrab = () => {
        dispatch(changeProperty({ currentTool: 'colorGrab' }))
    }

    //Resets the image to a blank slate
    const clearImage = () => {
        const newGrid = {}
        const frame = canvasSettings.currentFrame - 1
        for (let key in canvasSettings.grid[frame]) {
            newGrid[key] = 'deleted'
        }
        const newPosition = canvasSettings.historyPosition[frame] + 1
        const newMoveHistory = [...canvasSettings.moveHistory[frame].slice(0, newPosition), newGrid]
        const moveHistoryCopy = [...canvasSettings.moveHistory]
        moveHistoryCopy[frame] = newMoveHistory
        const positionCopy = [...canvasSettings.historyPosition]
        positionCopy[frame] = newPosition
        const gridCopy = [...canvasSettings.grid]
        gridCopy[frame] = {}
        dispatch(changeProperty({ grid: gridCopy, moveHistory: moveHistoryCopy, historyPosition: positionCopy, currentGrid: {} }))
    }

    //Adds the current color to the palette providing it is not already in the palette
    const addColor = () => {
        if (!addToPalette) {
            dispatch(changeProperty({ colorPalette: [...canvasSettings.colorPalette, rgbaToHex(canvasSettings.color)] }))
        }
    }

    //Toggles whether user is in delete color from palette mode
    const removeColor = () => {
        if (!removeFromPalette) {
            setDeleteColor(!deleteColor)
        }
    }

    //Removes the selected palette color provided the user is in delete color mode
    const deleteSelectedColor = (e) => {
        if (deleteColor && !e.target.children.length) {
            const color = e.target.attributes[0].nodeValue
            const arr = [...canvasSettings.colorPalette]
            const arrInd = arr.indexOf(color)
            if (arrInd !== -1) {
                arr.splice(arrInd, 1)
            }
            dispatch(changeProperty({ colorPalette: arr }))
            if (arr.length === 0) setDeleteColor(false)
        }
    }

    //If the user is working on a new image this function creates it in the database and saves a PNG copy to AWS
    //If the user is editing an existing image it updates the database entry and the AWS PNG image
    const changeImage = async () => {
        if (user.id) {
            setSaving('Saving...')
            if (canvasSettings.editing) {
                await updateImage(canvasSettings)
            } else {
                const info = await saveImage(canvasSettings, user, history)
                dispatch(changeProperty({ editing: info.id, editLink: info.apngImgUrl }))
            }
            setSaving('Saved!')
        } else {
            dispatch(setLoginModal(true))
        }
    }

    //opens download modal by dispatching to redux
    const openDownload = async () => {
        await changeImage()
        if (user.id) {
            dispatch(setDownloadModal(true))
        }
    }

    return (
        <>
            <Banner text={saving} setter={setSaving} timeLimit={saving === 'Saved!' ? 3 : null} />
            <div className='canvas-tools'>
                <ModalContainer hidden={!modals.download} cancel={setDownloadModal}>
                    <DownloadModal />
                </ModalContainer>
                <h2>Canvas Tools</h2>
                <Collapse title={'Animation'}>
                    <div className='canvas-tools-container'>
                        <div className='canvas-tools-container'>
                            <AddSubtract property={'totalFrames'} title={'Total Frames'} min={1} max={100} />
                            <AddSubtract property={'fps'} title={'FPS'} min={1} max={100} />
                        </div>
                        <div className='canvas-tools-container'>
                            {canvasSettings.totalFrames > 1 &&
                                <>
                                    <button className={'canvas-button' + playingClass} onClick={playAnimation}><i className="fas fa-play"></i></button>
                                    <button className={'canvas-button' + pausedClass} onClick={pauseAnimation}><i className="fas fa-pause"></i></button>
                                    <button className={'canvas-button' + advanceClass} onClick={subtractOneFrame}><i className="fas fa-arrow-left"></i></button>
                                    <span className='frame-counter'> Frame: {canvasSettings.currentFrame} </span>
                                    <button className={'canvas-button' + advanceClass} onClick={addOneFrame}><i className="fas fa-arrow-right"></i></button>
                                </>
                            }
                        </div>
                    </div>
                </Collapse>
                <Collapse title={'Color Selector'}>
                    <RuleChecker property='disableColorSelector' canvasSettings={canvasSettings}>
                        <SketchPicker
                            color={stateColor}
                            onChange={colorState}
                            onChangeComplete={colorChange}
                            presetColors={[]}
                            width='238px'
                            className='canvas-tools-custom'
                        />
                    </RuleChecker>
                </Collapse>
                <Collapse title={'Color Palette'}>
                    <div className='canvas-tools-circle' onMouseUp={deleteSelectedColor}>
                        <CirclePicker
                            color={colObj}
                            onChangeComplete={colorChange}
                            colors={canvasSettings.colorPalette}
                            className={removeFromPalette2}
                        />
                    </div>
                    <div className='canvas-tools-container'>
                        <button className={'canvas-button' + addToPalette} onClick={addColor}>Add Color</button>
                        <button className={'canvas-button' + removeFromPalette + removeFromPalette3} onClick={removeColor}>Remove Color</button>
                    </div>
                    <RuleChecker property='disableAlphaPicker' canvasSettings={canvasSettings}>
                        <AlphaPicker
                            color={stateColor}
                            onChange={colorState}
                            onChangeComplete={colorChange}
                            width='258px'
                            className='canvas-tools-alpha'
                        />
                    </RuleChecker>
                </Collapse>
                <Collapse title={'Brushes'}>
                    <div className='canvas-tools-container'>
                        <button className={'canvas-button' + brushClass} onClick={swapBrush}><i className="fas fa-paint-brush"></i></button>
                        <RuleChecker property='disableEraser' canvasSettings={canvasSettings}>
                            <button className={'canvas-button' + eraserClass} onClick={swapEraser}><i className="fas fa-eraser"></i></button>
                        </RuleChecker>
                        <RuleChecker property='disableEyedropper' canvasSettings={canvasSettings}>
                            <button className={'canvas-button' + colorGrabClass} onClick={swapColorGrab}><i className="fas fa-eye-dropper"></i></button>
                        </RuleChecker>
                        <RuleChecker property='disableFill' canvasSettings={canvasSettings}>
                            <button className={'canvas-button' + fillClass} onClick={swapFill}><i className="fas fa-fill"></i></button>
                        </RuleChecker>
                        <RuleChecker property='disableColorSwapper' canvasSettings={canvasSettings}>
                            <button className={'canvas-button' + colorSwapClass} onClick={swapColorSwap}><i className="fas fa-exchange-alt"></i></button>
                        </RuleChecker>
                        <RuleChecker property='disableColorSwapBrush' canvasSettings={canvasSettings}>
                            <button className={'canvas-button' + colorSwapBrushClass} onClick={swapColorSwapBrush}><i className="fas fa-paint-brush"></i><span>/</span><i className="fas fa-exchange-alt"></i></button>
                        </RuleChecker>
                    </div>
                </Collapse>
                <Collapse title={'Tools'}>
                    <div className='canvas-tools-container'>
                        <RuleChecker property='disableUndoRedo' canvasSettings={canvasSettings}>
                            <button className={'canvas-button' + undoClass} onClick={undo}><i className="fas fa-undo"></i></button>
                            <button className={'canvas-button' + redoClass} onClick={redo}><i className="fas fa-redo"></i></button>
                        </RuleChecker>
                        <RuleChecker property='disableGrid' canvasSettings={canvasSettings}>
                            <button className={'canvas-button' + gridClass} onClick={swapGrid}><i className="fas fa-th"></i></button>
                        </RuleChecker>
                        <RuleChecker property='disableClear' canvasSettings={canvasSettings}>
                            <button className={'canvas-button'} onClick={clearImage}><i className="fas fa-ban"></i></button>
                        </RuleChecker>
                        <RuleChecker property='disableCopyPaste' canvasSettings={canvasSettings}>
                            <button className={'canvas-button'} onClick={copy}><i className="fas fa-copy"></i></button>
                            <button className={'canvas-button' + pasteClass} onClick={paste}><i className="fas fa-paste"></i></button>
                        </RuleChecker>
                    </div>
                </Collapse>
                <Collapse title={'Configurables'}>
                    <div className='canvas-tools-container'>
                        <div className='canvas-tools-container'>
                            <AddSubtract property={'pixelSize'} title={'Pixel Size'} min={1} max={100} />
                            <AddSubtract property={'brushSize'} title={'Brush Size'} min={1} max={100} />
                        </div>
                        <div className='canvas-tools-container'>
                            <AddSubtract property={'width'} title={'Width'} min={1} max={100} />
                            <AddSubtract property={'height'} title={'Height'} min={1} max={100} />
                        </div>
                    </div>
                </Collapse>
                {!props.disableSave &&
                    <div className='canvas-tools-container-centered'>
                        <div className='canvas-button' onClick={changeImage}>Save</div>
                        <div className='canvas-button' onClick={openDownload}>Download</div>
                    </div>
                }
            </div >
        </>
    )
}

export default CanvasTools

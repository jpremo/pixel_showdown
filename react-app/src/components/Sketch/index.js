import React, { useEffect, useState } from "react";
import CompleteCanvas from '../canvas/CompleteCanvas'
import './Sketch.css'
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeProperty } from '../../store/canvas'

//This component organizes the sketch page; it distinguishes whether the page is a new sketch or being edited by the
//correct user
function Sketch() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    let params = useParams()
    let { id } = params;

    //Fetches data from backend server if an image id is specified in the url
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const res = await fetch('/api/images/' + id + '')
                    const parsed = await res.json()
                    if (!res.ok || user.id !== parsed.userId) {
                        throw new Error()
                    }
                    const moveHistoryNew = []
                    const historyPositionNew = []
                    for (let i = 0; i < parsed.grid.gridColors.length; i++) {
                        moveHistoryNew.push([parsed.grid.gridColors[i]])
                        historyPositionNew.push(0)
                    }

                    dispatch(changeProperty({
                        grid: parsed.grid.gridColors,
                        width: parsed.grid.width,
                        height: parsed.grid.height,
                        fps: parsed.grid.fps,
                        totalFrames: parsed.grid.totalFrames,
                        currentFrame: 1,
                        currentGrid: parsed.grid.gridColors[0],
                        colorPalette: ["#f44336ff", "#e91e63ff", "#9c27b0ff", "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff", "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"],
                        editing: parsed.id,
                        editLink: parsed.apngImgUrl,
                        title: parsed.title,
                        moveHistory: moveHistoryNew,
                        historyPosition: historyPositionNew,
                        playing: false,
                        ruleset: {}
                    }))
                    setLoaded(true)
                } catch (e) {
                    history.push('/sketch')
                }
            }
            fetchData()
        } else {
            const initialSettings = {
                pixelSize: 20,
                height: 32,
                width: 32,
                color: [180, 180, 180, 1],
                grid: [{}, {}, {}, {}, {}, {}, {}, {}],
                colorPalette: ["#f44336ff", "#e91e63ff", "#9c27b0ff", "#673ab7ff", "#3f51b5ff", "#2196f3ff", "#03a9f4ff", "#00bcd4ff", "#009688ff", "#4caf50ff", "#8bc34aff", "#cddc39ff", "#ffeb3bff", "#ffc107ff", "#ff9800ff", "#ff5722ff", "#795548ff", "#607d8bff"],
                currentGrid: {},
                finalGrid: {},
                moveHistory: [[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]],
                historyPosition: [0, 0, 0, 0, 0, 0, 0, 0],
                editing: null,
                fps: 1,
                currentFrame: 1,
                totalFrames: 1,
                ruleset: {}
            }

            dispatch(changeProperty(initialSettings))
            setLoaded(true)
        }
    }, [dispatch])

    if (loaded) {
        return (
            <div className='center-content-wrapper'>
                <div id='sketch-content-wrapper'>
                    <CompleteCanvas skipDefault={true} />
                </div>
            </div>
        );
    } else {
        return (
            <></>
        )
    }
}
export default Sketch;

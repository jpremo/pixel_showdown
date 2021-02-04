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
                    dispatch(changeProperty({
                        grid: parsed.grid,
                        editing: parsed.id,
                        editLink: parsed.imgUrl,
                        title: parsed.title,
                        moveHistory: [parsed.grid],
                        historyPosition: 0,
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
                grid: {},
                finalGrid: {},
                editing: null,
                moveHistory: [{}],
                historyPosition: 0,
            }

            dispatch(changeProperty(initialSettings))
            setLoaded(true)
        }
    }, [dispatch])

    if (loaded) {
        return (
            <div id='sketch-content-wrapper'>
                <CompleteCanvas />
            </div>
        );
    } else {
        return (
            <></>
        )
    }
}
export default Sketch;

import React, { useEffect } from "react";
import CompleteCanvas from '../canvas/CompleteCanvas'
import './Sketch.css'
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeProperty } from '../../store/canvas'
function Sketch() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    let params = useParams()
    let { id } = params;
    console.log('id', id)
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const res = await fetch('/api/images/' + id + '')
                    const parsed = await res.json()
                    if (!res.ok || user.id != parsed.userId) {
                        throw new Error()
                    }
                    dispatch(changeProperty({grid: parsed.grid, editing: parsed.id, editLink: parsed.imgUrl, title: parsed.title}))
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
                    editing: null
                }

                dispatch(changeProperty(initialSettings))

            }
        }, [dispatch])

    return (
        <div id='sketch-content-wrapper'>
            <CompleteCanvas />
        </div>
    );
}
export default Sketch;

import React, { useEffect, useState } from "react";
import CompleteCanvas from '../canvas/CompleteCanvas'
import '../Sketch/Sketch.css'
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeProperty } from '../../store/canvas'
import { saveImage } from '../canvas/aws/index'
import { de } from "date-fns/locale";
import { competitionPage, clearCompetitionPage } from '../../store/posts'

//This component organizes the sketch page; it distinguishes whether the page is a new sketch or being edited by the
//correct user
function Entry() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const post = useSelector(state => state.posts.competitionPage)
    const user = useSelector(state => state.session.user)
    const canvasSettings = useSelector(state => state.canvas)
    let params = useParams()
    let { id, postId } = params;

    //Fetches data from backend server if an image id is specified in the url
    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`/api/posts/competitions/${postId}`)
            data = await data.json()
            if (!data.notFound) {
                dispatch(competitionPage(data))
            } else {
                setNotFound(true)
            }
            if (typeof id === 'number' && Number.isInteger(id)) {
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
                        editing: parsed.id,
                        editLink: parsed.apngImgUrl,
                        title: parsed.title,
                        moveHistory: moveHistoryNew,
                        historyPosition: historyPositionNew,
                        playing: false,
                        ruleset: data.competition.ruleset.rules
                    }))
                    setLoaded(true)
                } catch (e) {
                    history.push(`/cometitions/${postId}`)
                }
            } else if (id === 'new') {
                debugger
                const info = await saveImage(canvasSettings, user, history)
                dispatch(changeProperty({ editing: info.id, editLink: info.apngImgUrl }))
                history.push(`/cometitions/${postId}/entry/${info.id}`)
                setLoaded(true)
            } else {
                setNotFound(true)
            }
        }
        fetchData()
    }, [dispatch])

    if (notFound) {
        return (
            <h1 className='competition-404'>This Entry Does Not Exist</h1>
        )
    }

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
export default Entry;

import React, { useEffect, useState } from "react";
import CompleteCanvas from '../canvas/CompleteCanvas'
import '../Sketch/Sketch.css'
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeProperty } from '../../store/canvas'
import { saveImage } from '../canvas/aws/index'
import { addMinutes, addSeconds, isPast } from "date-fns";
import { competitionPage, clearCompetitionPage } from '../../store/posts'
import Timer from './Timer'
import './Entry.css'
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

    const getCanvasSaveData = (rules) => {
        const canvasInfo = {
            grid: [{}],
            width: rules.width.defaultValue,
            height: rules.height.defaultValue,
            fps: rules.fps.defaultValue,
            totalFrames: rules.totalFrames.defaultValue,
            title: 'Title'
        }
        return canvasInfo
    }

    const getEndTime = (timeLimit, created_at) => {
        if (timeLimit === .5) {
            return addSeconds(new Date(created_at), 30)
        }
        return addMinutes(new Date(created_at), timeLimit)
    }

    //Fetches data from backend server if an image id is specified in the url
    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`/api/posts/competitions/${postId}`)
            data = await data.json()

            if (!data.notFound) {
                dispatch(competitionPage(data))
            } else {
                setNotFound(true)
                return
            }
            if (!user.id || user.id === data.competition.user.id) {
                history.push(`/competitions/${postId}`)
            }
            if (!isNaN(id) && Number.isInteger(Number(id))) {
                try {
                    const res = await fetch('/api/images/' + id + '')
                    const parsed = await res.json()
                    if (!res.ok || user.id !== parsed.userId) {
                        throw new Error()
                    }

                    const endTime = getEndTime(data.competition.ruleset.rules.timeLimit, parsed.created_at)
                    if (isPast(endTime)) {
                        history.push(`/competitions/${postId}`)
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
                        ruleset: data.competition.ruleset.rules,
                        created_at: parsed.created_at,
                    }))

                    setLoaded(true)
                } catch (e) {
                    history.push(`/competitions/${postId}`)
                }
            } else if (id === 'new') {

                let query = await fetch(`/api/images/query?userId=${user.id}&competitionId=${data.competition.id}`)
                let par = await query.json()

                if (par.check === 'newEntry') {

                    const info = await saveImage(getCanvasSaveData(data.competition.ruleset.rules), user, history, data.competition.id)
                    dispatch(changeProperty({ editing: info.id, editLink: info.apngImgUrl }))
                    history.push(`/competitions/${postId}/entry/${info.id}`)
                } else {
                    history.push(`/competitions/${postId}/entry/${par.id}`)
                }
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
            <div className='entry-wrapper'>
                <Timer endTime={getEndTime(post.ruleset.rules.timeLimit, canvasSettings.created_at)}
                    canvasSettings={canvasSettings} user={user} history={history} />
                <div id='sketch-content-wrapper'>
                    <CompleteCanvas />
                </div>
            </div>
        );
    } else {
        return (
            <></>
        )
    }
}
export default Entry;

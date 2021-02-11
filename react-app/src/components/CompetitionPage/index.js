import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { competitionPage, clearCompetitionPage } from '../../store/posts'
//Component used to wrap elements that should be displayed in a modal; hidden prop is used to specify the property that
//checks whether the modal should be visible
const CompetitionPage = () => {
    const modals = useSelector(state => state.modal)
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const params = useParams()
    const competitionId = params.postId
    useEffect(() => {
        (async function () {
            dispatch(clearCompetitionPage())
            let data = await fetch(`/api/posts/competitions/${competitionId}`)
            data = await data.json()
            if(!data.notFound) {
                dispatch(competitionPage(data))
            } else {
                setNotFound(true)
            }

            setLoaded(true)
        })();
    }, [])

    if(notFound) {
        return(
            <h1 className='competition-404'>This Competition Does Not Exist</h1>
        )
    }

    return (
        <>
            { loaded &&
                <>
                    <div>
                        Competition page
                    </div>
                </>
            }
        </>
    );
}

export default CompetitionPage;

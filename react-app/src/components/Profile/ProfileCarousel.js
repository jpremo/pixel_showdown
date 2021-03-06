import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from '../../store/session'
import { setProfileUser } from '../../store/profile'
import { resetSketch } from "../utils";
import {longFormattedTime} from '../utils'

function ProfileCarousel({ images, owner, userId }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        afterChange: (indexOfCurrentSlide) => {
            setCurrentSlide(
                indexOfCurrentSlide
            )
        }
    };
    const ribbonLogo = (place) => {
        switch (place) {
            case 0: return (<i style={{ color: '#E0DF3D', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i>)
            case 1: return (<i style={{ color: '#DADADA', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i>)
            case 2: return (<i style={{ color: '#CD881B', margin: '0 5px' }} className="fas fa-trophy fa-sm"></i>)
            default: return null;
        }
    }
    useEffect(() => {
    }, [currentSlide])
    if (images.length === 0) {
        return (
            <div className='competition-text'>You haven't drawn anything yet! Hop to it pixel art maestro!</div>
        )
    }

    const updateImage = async () => {
        const img = images[currentSlide].apngImgUrl
        const res = await fetch(`/api/users/${userId}/profileImg`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profileImg: img
            }),
        });
        const data = await res.json()
        dispatch(setUser(data.user))
        dispatch(setProfileUser(data.user))
    }

    const editImage = () => {
        resetSketch(dispatch)
        history.push(`/sketch/${images[currentSlide].id}`)
    }

    const sketchOrSubmitted = (img) => {
        if(!img.competitionId) {
            return (<div className='carousel-image-title'>Sketch</div>)
        } else {
            return (<div className='carousel-image-title'>Entered into a competition <span className='user-hover-wrapper' onClick={() => history.push('/competitions/'+img.competitionId)}>here</span></div>)
        }
    }

    return (
        <div className='carousel-div'>
                        <div className='carousel-image-title'>
                            {ribbonLogo(images[currentSlide].place)}
                            <b>{images[currentSlide].title}</b>
                        </div>
            <Slider {...settings}>
                {images.map((img, ind) => {
                    return (
                        <div className='carousel-image-container' key={ind}>
                        <img className='carousel-image' src={img.apngImgUrl} key={ind} alt={`Image ${ind}`}></img>
                        <div className='carousel-image-title'><b>Points Earned: {(img.points === null) ? 0:img.points}</b></div>
                        {sketchOrSubmitted(img)}
                        <div className='carousel-image-title'>Edited on {longFormattedTime(img.updated_at)}</div>
                        </div>
                    )
                })}
            </Slider>
            {owner &&
                <div className='profile-button-wrapper'>
                    <div className={'modal-link profile-spacer'} onClick={updateImage}>Set as Profile Image</div>
                    {images[currentSlide].competitionId ===null &&
                    <div className={'modal-link profile-spacer'} onClick={editImage}>Edit Image</div>
                    }
                </div>
            }
        </div>
    );
}

export default ProfileCarousel

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

    return (
        <div className='carousel-div'>
            <Slider {...settings}>
                {images.map((img, ind) => {
                    return (
                        <div className='carousel-image-container' key={ind}>
                        <div className='carousel-image-title'>
                            <b>{img.title}</b>
                        </div>
                        <img className='carousel-image' src={img.apngImgUrl} key={ind} alt={`Image ${ind}`}></img>
                        <div className='carousel-image-title'>Edited on {longFormattedTime(img.updated_at)}</div>
                        </div>
                    )
                })}
            </Slider>
            {owner &&
                <div className='profile-button-wrapper'>
                    <div className='nav-link profile-spacer' onClick={updateImage}>Set Profile Image</div>
                    {images[currentSlide].competitionId &&
                    <div className='nav-link profile-spacer' onClick={editImage}>Edit Image</div>
                    }
                </div>
            }
        </div>
    );
}

export default ProfileCarousel

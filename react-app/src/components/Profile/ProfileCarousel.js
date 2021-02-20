import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { updateImage } from "../canvas/aws";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../store/session'
import { setProfileUser } from '../../store/profile'

function ProfileCarousel({ images, owner, userId }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const history = useHistory()
    const user = useSelector(state => state.session.user)
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
        console.log(currentSlide)
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
        history.push(`/sketch/${images[currentSlide].id}`)
    }

    return (
        <div className='carousel-div'>
            <Slider {...settings}>
                {images.map((img, ind) => {
                    return (
                        <div className='carousel-image-container' key={ind}>
                        <div className='carousel-image-title'><b>{img.title}</b> <span className='carousel-small-text'> </span></div>
                        <img className='carousel-image' src={img.apngImgUrl} key={ind} alt={`Image ${ind}`}></img>
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

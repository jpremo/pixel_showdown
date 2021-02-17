import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { updateImage } from "../canvas/aws";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from '../../store/session'
import { setProfileUser } from '../../store/profile'

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
        console.log(currentSlide)
    }, [currentSlide])
    if (images.length === 0) {
        return (
            <div className='competition-text'>No entries have been received yet!</div>
        )
    }

    const updateImage = async () => {
        // debugger
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

    const linkImage = (img) => {
        if (owner) {
            history.push(`/sketch/${img.id}`)
        }
    }

    return (
        <div className='carousel-div'>
            <Slider {...settings}>
                {images.map((img, ind) => {
                    return (
                        <img className='carousel-image' onClick={() => linkImage(img)} src={img.apngImgUrl} key={ind} alt={`Image ${ind}`}></img>
                    )
                })}
            </Slider>
            {owner &&
                <div className='profile-button-wrapper'>
                    <div className='nav-link profile-spacer' onClick={updateImage}>Set Profile Image</div>
                </div>
            }
        </div>
    );
}

export default ProfileCarousel

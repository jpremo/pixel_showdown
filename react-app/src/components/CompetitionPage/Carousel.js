import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserHover from "../UserHover";
import { useSelector } from "react-redux";

function Carousel({ images, setCurrentImage }) {
    useEffect(() => {
        let val
        if (images.length) {
            val = images[0].id
        } else {
            val = null
        }
        setCurrentImage(
            val
        )
    }, [])
    const [currentSlide, setCurrentSlide] = useState(0)
    const user = useSelector(state => state.session.user)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        afterChange: (indexOfCurrentSlide) => {
            setCurrentImage(
                images[indexOfCurrentSlide].id
            )
            setCurrentSlide(
                indexOfCurrentSlide
            )
        }
    };
    if (images.length === 0) {
        return (
            <div className='competition-text'>No entries have been received yet!</div>
        )
    }
    const ribbonLogo = (place) => {
        switch (place) {
            case 0: return (<i style={{ color: '#E0DF3D', margin: '0 5px' }} class="fas fa-trophy fa-sm"></i>)
            case 1: return (<i style={{ color: '#DADADA', margin: '0 5px' }} class="fas fa-trophy fa-sm"></i>)
            case 2: return (<i style={{ color: '#CD881B', margin: '0 5px' }} class="fas fa-trophy fa-sm"></i>)
            default: return null;
        }
    }
    return (
        <div className='carousel-div'>
            <div className='carousel-image-title'>{ribbonLogo(images[currentSlide].place)}<b>{images[currentSlide].title}</b> <span className='carousel-small-text'> by <UserHover user={images[currentSlide].user} currentUser={user} /> </span></div>
            <Slider {...settings}>
                {images.map((img, ind) => {
                    return (
                        <div className='carousel-image-container' key={ind}>
                            <img className='carousel-image' src={img.apngImgUrl} alt={`Image ${ind}`}></img>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}

export default Carousel

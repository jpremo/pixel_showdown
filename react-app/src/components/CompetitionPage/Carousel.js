import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserHover from "../UserHover";
import { useSelector } from "react-redux";

function Carousel({ images, setCurrentImage }) {
    useEffect(() => {
        setCurrentImage(
            images[0].id
        )
    }, [])
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
            <Slider {...settings}>
                {images.map((img, ind) => {
                    return (
                        <div className='carousel-image-container' key={ind}>
                            <div className='carousel-image-title'>{ribbonLogo(img.place)}<b>{img.title}</b> <span className='carousel-small-text'> by <UserHover user={img.user} currentUser={user} /> </span></div>
                            <img className='carousel-image' src={img.apngImgUrl} alt={`Image ${ind}`}></img>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}

export default Carousel

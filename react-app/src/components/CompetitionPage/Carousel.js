import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({ images }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };
    if (images.length === 0) {
        return (
            <div className='competition-text'>No entries have been received yet!</div>
        )
    }
    return (
        <div className='carousel-div'>
            <Slider {...settings}>
                {images.map((img, ind) => {
                    return (
                        <div className='carousel-image-container' key={ind}>
                            <img className='carousel-image' src={img.apngImgUrl}  alt={`Image ${ind}`}></img>
                            <div className='carousel-image-title'>{img.title} by {img.user}</div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}

export default Carousel

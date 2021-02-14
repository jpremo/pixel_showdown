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
    if(images.length === 0) {
        return(
            <div className='competition-text'>No entries have been received yet!</div>
        )
    }
    return (
        <div className='carousel-div'>
            <Slider {...settings}>
                {images.map((img, ind) => {
                    return (
                        <img className='carousel-image' src={img.apngImgUrl} key={ind} alt={`Image ${ind}`}></img>
                    )
                })}
            </Slider>
        </div>
    );
}

export default Carousel

import React from "react";

// import "./Banner.scss";
import Slider from "react-slick";
import BannerImg1 from "../../assets/banner1-img.webp";
import BannerImg2 from "../../assets/banner2-img.webp";
import BannerImg3 from "../../assets/banner3-img.webp";

const Banner = () => {
  const BannerImg = [BannerImg1,BannerImg2,BannerImg3]
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };
  return (
    // <div className="hero-banner">
    //   <div className="content">
    //     <div className="text-content">
    //       <h1>SALE 50%</h1>
    //       <p>
    //         One Piece Figure - Perfect for fans of Luffy's infectious optimism
    //         and determination to become the Pirate King!
    //       </p>
    //       <div className="ctas">
    //         <div className="banner-cta">Read More</div>
    //         <div className="banner-cta v2">Shop Now</div>
    //       </div>
    //     </div>
    //     <img className="banner-img" src={BannerImg} />
    //   </div>
    // </div>
   
      <Slider {...settings}>
        {
          BannerImg.map((image)=>{
            return(
              <img src={image} alt="slider" preview={false} width="100%" height="274px" object-fit="cover"/>
            )
          })
        }
      </Slider>
    
  );
};

export default Banner;

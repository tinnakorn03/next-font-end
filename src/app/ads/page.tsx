"use client";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
 
interface IProps {
  heightAds?:number;
}
export default function Ads({
  heightAds=350
}:IProps) {
  const imgs = [
    "/ads/ads.png",
    "/ads/ads.png",
    "/ads/ads.png",
    "/ads/ads.png",
    "/ads/ads.png",
    "/ads/ads.png",
    "/ads/ads.png",
    "/ads/ads.png"
  ];

    
  return (
    <article style={{ height: `${heightAds}px`}}> 
      <Carousel  
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        interval={5000}
        transitionTime={2000} 
      >
        {imgs.map((imgSrc, index) => (
          <div key={index} style={{ borderRadius: '10px', overflow: 'hidden', height:`${heightAds}px`}}> 
            <img src={imgSrc} object-fit="cover" height='100%' width='100%' />
          </div>
        ))}
      </Carousel>
     </article>
  )
}

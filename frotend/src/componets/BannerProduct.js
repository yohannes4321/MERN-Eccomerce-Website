import React ,{useState,useEffect} from 'react';
import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";

import imageMobile1 from "../assest/banner/img1_mobile.jpg";
import imageMobile2 from "../assest/banner/img2_mobile.webp"
import imageMobile3 from "../assest/banner/img3_mobile.jpg"
import imageMobile4 from "../assest/banner/img4_mobile.jpg"

const BannerProduct = () => {
    const desktopImages = [
      image1,
      image2,
      image3,
      image4
    ];
    
    const mobileImages = [
      imageMobile1,
      imageMobile2,
      imageMobile3,
      imageMobile4
    ];
  
    const [currentImage, setCurrentImage] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % desktopImages.length);
      }, 3000); // Change image every 3 seconds
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, [desktopImages.length]);
  
    return (
      <div className='container mx-auto px-4 rounded'>
        <div className='relative h-72 w-full bg-slate-200 overflow-hidden'>
          {/* Desktop Images */}
          <div className='flex h-full transition-transform duration-500' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            {desktopImages.map((imageUrl, index) => (
              <div className='w-full flex-shrink-0' key={index}>
                <img 
                  src={imageUrl} 
                  alt={`Banner ${index}`} 
                  className='w-full h-full object-cover' 
                />
              </div>
            ))}
          </div>
  
          {/* Mobile Images */}
          <div className='absolute top-0 left-0 w-full h-full md:hidden'>
            {mobileImages.map((imageUrl, index) => (
              <div className='w-full h-full' key={index}>
                <img 
                  src={imageUrl} 
                  alt={`Mobile Banner ${index}`} 
                  className='w-full h-full object-cover' 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default BannerProduct;
import React ,{useState,useEffect} from 'react';
import image1 from "../assest/banner/download (11).png";
import image2 from "../assest/banner/download (24).png";
import image3 from "../assest/banner/download (26).png";
import image4 from "../assest/banner/download (28).png";


import image5 from "../assest/banner/download (11).png";
import image6 from "../assest/banner/download (24).png";
import image7 from "../assest/banner/download (26).png";
import image8 from "../assest/banner/download (28).png";

const BannerProduct = () => {
    const desktopImages = [
      image1,
      image2,
      image3,
      image4
    ];
    
    const mobileImages = [
      image5,
      image6,
      image7,
      image8
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
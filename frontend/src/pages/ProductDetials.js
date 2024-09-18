import React, { useCallback, useContext, useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common/index'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

import scrollTop from '../helper/scroll';
import CategroyWiseProductDisplay from '../componets/CategoryList';
import StandardCardProduct from "../componets/StandardCardProduct"
import addToCart from '../helper/AddtoCart';
import Context from '../context';
 
const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    selling : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()
  const handleClick = () => {
    window.location.href = 'http://localhost:3001/';
  };

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.ProductDetails.url,{
      method : SummaryApi.ProductDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataReponse = await response.json()

    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data?.productImage[0])

  }

  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }


  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
        console.log("Adding to cart, product ID:", productId); // Debug log
        const addToCartResponse = await AddToCart(e, productId);
        console.log("Add to cart response:", addToCartResponse); // Debug log
        if (addToCartResponse.success) {
            toast.success(addToCartResponse.message);
            context.fetchUserAddToCart(); // Ensure context is updated correctly
        } else {
            toast.error(addToCartResponse.message);
        }
    } catch (error) {
        toast.error("Failed to add to cart. Please try again.");
        console.error("Error adding to cart:", error);
    }
};

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")

  }



  return (
    <div className='container mx-auto p-4 mb-5'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
          {/***product Image */}
          <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

              <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                  <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

                    {/**product zoom */}
                    {
                      zoomImage && (
                        <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                          <div
                            className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                            style={{
                              background : `url(${activeImage})`,
                              backgroundRepeat : 'no-repeat',
                              backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
    
                            }}
                          >
    
                          </div>
                        </div>
                      )
                    }
                  
              </div>

              <div className='h-full'>
                  {
                    loading ? (
                      <div className='flex gap-2 lg:flex-col overflow- scrollbar-none h-full'>
                        {
                          productImageListLoading.map((el,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                              </div>
                            )
                          })
                        }
                      </div>
                      
                    ) : (
                      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                        {
                          data?.productImage?.map((imgURL,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)}  onClick={()=>handleMouseEnterProduct(imgURL)}/>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  }
              </div>
          </div>

           {/***product details */}
           {
            loading ? (
              <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
    
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                  <p className='text-red-600 bg-slate-200 w-full'></p>
                  <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                </div>

                <div className='flex items-center gap-3 my-2 w-full'>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                </div>

                <div className='w-full'>
                  <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                  <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                </div>
              </div>
            ) : 
            ( 
              <div className='flex flex-col gap-4' onClick={scrollTop}>
              <div className='flex items-start'>
                {/* Content on the Left */}
                <div id="1" className='flex-1'>
                  <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                  <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                  <p className='capitalize text-slate-400'>{data?.category}</p>
            
                  <div className='text-red-600 flex items-center gap-1'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
            
                  <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                    <p className='text-red-600'>{data.selling} Birr</p>
                    <p className='text-slate-400 line-through'>{data.price}</p>
                  </div>
            
                  <div className='flex items-center gap-3 my-2'>
                    <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
                    <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                  </div>
                </div>
            
                {/* Chat Farmer Button */}
                <div id="2" className='ml-4 flex items-start justify-end flex-col'>
                 
                <button
  className='bg-yellow-500 hover:bg-yellow-600 text-gray-800 py-6 px-12 text-4xl rounded-full font-bold transition-all transform hover:scale-105'
  style={{
    marginTop: '60px', // Adjust this value to move down
    marginRight: '50px', // Adjust this value to move left
    transform: 'translateY(50%) translateX(-50%)' // Fine-tune the position further
  }}
 
  onClick={handleClick}
>
  Chat Farmer
</button>

                </div>
              </div>
            
              {/* Description */}
              <div>
                <p className='text-slate-600 font-medium my-1'>Description :</p>
                <p>{data?.description}</p>
              </div>
            </div>
            
            
            )
           }

      </div>



      {
        data.category && (
          <StandardCardProduct category={data?.category} heading={"Recommended Product"}/>
        )
      }
     



    </div>
  )
}

export default ProductDetails
import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsLinkedin, BsTelegram, BsTiktok, BsYoutube } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <footer className='py-8 bg-gray-800'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap items-center'>
            <div className='w-full md:w-5/12 flex items-center'>
              <img src="/newsletter.png" alt="newsletter" className='w-16 h-16 mr-4'/>
              <h2 className='text-white text-lg font-semibold'>Sign up for Newsletter</h2>
            </div>
            <div className='w-full md:w-7/12 mt-4 md:mt-0'>
              <div className="flex">
                <input 
                  type="text" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Your Email Address" 
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className='py-8 bg-gray-900'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/4 mb-6 md:mb-0'>
              <h4 className='text-white text-lg font-semibold mb-4'>Contact</h4>
              <address className="text-white text-sm">
                4-kilo Addis Ababa University, Addis Ababa
                <br />
              </address>
              <a href="tel:+251960381565" className="block mt-2 text-white">tel: +251960381565</a>
              <a href="mailto:alemuyohannes960@gmail.com" className="block mt-2 text-white">alemuyohannes960@gmail.com</a>
              <div className='flex gap-4 mt-4'>
                <a href="#" aria-label="LinkedIn"><BsLinkedin className='text-white text-xl' /></a>
                <a href="#" aria-label="Telegram"><BsTelegram className='text-white text-xl' /></a>
                <a href="#" aria-label="GitHub"><BsGithub className='text-white text-xl' /></a>
                <a href="#" aria-label="Tiktok"><BsTiktok className='text-white text-xl' /></a>
                <a href="#" aria-label="YouTube"><BsYoutube className='text-white text-xl' /></a>
                <a href="#" aria-label="Facebook"><BsFacebook className='text-white text-xl' /></a>
              </div>
            </div>
            <div className='w-full md:w-1/4 mb-6 md:mb-0'>
              <h4 className='text-white text-lg font-semibold mb-4'>Information</h4>
              <div className='flex flex-col'>
                <Link className="text-white py-2 hover:underline" to='#'>Privacy Policy</Link>
                <Link className="text-white py-2 hover:underline" to='#'>Refund Policy</Link>
                <Link className="text-white py-2 hover:underline" to='#'>Shipping Policy</Link>
                <Link className="text-white py-2 hover:underline" to='#'>Terms & Conditions</Link>
              </div>
            </div>
            <div className='w-full md:w-1/4 mb-6 md:mb-0'>
              <h4 className='text-white text-lg font-semibold mb-4'>Account</h4>
              <div className='flex flex-col'>
                <Link className="text-white py-2 hover:underline" to='#'>About Us</Link>
                <Link className="text-white py-2 hover:underline" to='#'>FAQ</Link>
                <Link className="text-white py-2 hover:underline" to='#'>Contact</Link>
              </div>
            </div>
            <div className='w-full md:w-1/4'>
              <h4 className='text-white text-lg font-semibold mb-4'>Quick Links</h4>
              <div className='flex flex-col'>
                <Link className="text-white py-2 hover:underline" to='#'>Laptops</Link>
                <Link className="text-white py-2 hover:underline" to='#'>HeadPhones</Link>
                <Link className="text-white py-2 hover:underline" to='#'>Tablet</Link>
                <Link className="text-white py-2 hover:underline" to='#'>Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className='py-4 bg-gray-800'>
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <p className='text-white'>
              &copy;{new Date().getFullYear()} Powered by Yohannes Alemu
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

import React, { useEffect } from 'react'
import kevpam from '../assets/headpic.png'
import kevpam2 from '../assets/headpicOrig.png'
import Aos from "aos";
import "aos/dist/aos.css";

function Head() {

  useEffect(function () {
    Aos.init({ duration: 1000 });
}, []);

  return (
    <>
      <div data-aos="fade-down" data-aos-delay="1500" className='pt-28 sm:pt-24 md:pt-20'>
        <div className='flex justify-center items-center w-full h-[50%] '>
            <img src={kevpam} className='w-full h-[50%] hidden sm:flex' />
            <img src={kevpam2} className='w-full h-[50%] flex sm:hidden' />
        </div>
      </div>
    </>
  )
}

export default Head
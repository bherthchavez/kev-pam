import React from 'react'
import kevpam from '../assets/headimg.jpg'

function Head() {
  
  
  console.log(`VITE_KEY: ${import.meta.env.VITE_KEY}`);
  console.log(`VITE_API_KEY: ${import.meta.env.VITE_API_KEY}`);
  console.log(`VITE_AUTHDOMAIN_KEY1: ${import.meta.env.VITE_AUTHDOMAIN_KEY1}`);
  console.log(`VITE_PROJECTID_KEY2: ${import.meta.env.VITE_PROJECTID_KEY2}`);
  console.log(`VITE_STORAGEBUCKET_KEY3: ${import.meta.env.VITE_STORAGEBUCKET_KEY3}`);
  console.log(`VITE_MESSAGINGSENDERID_KEY4: ${import.meta.env.VITE_MESSAGINGSENDERID_KEY4}`);
  console.log(`VITE_APPID_KEY5: ${import.meta.env.VITE_APPID_KEY5}`);
  
  return (
    <>
      <div className='max-w-[1000px] mx-auto pt-32'>
        <div className='relative flex justify-center items-center px-10 sm:px-15 md:px-20 lg:px-42 xl:px-0 2xl:px-0'>
          <div className='absolute uppercase text-white text-center text-xl sm:text-4xl'>
            <h1>tara tagaytay?</h1>
            <h1>G!</h1>
          </div>
          
          <div className=''>
            <img src={kevpam} className=' rounded-xl border-[#403F10] border-2' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Head
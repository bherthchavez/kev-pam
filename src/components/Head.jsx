import React from 'react'
import kevpam from '../assets/headpic.png'
import kevpam2 from '../assets/headpicOrig.png'

function Head() {
  
  return (
    <>
      <div className='pt-28 sm:pt-24 md:pt-20'>
        <div className='flex justify-center items-center w-full h-[50%] '>
            <img src={kevpam} className='w-full h-[50%] hidden sm:flex' />
            <img src={kevpam2} className='w-full h-[50%] flex sm:hidden' />
        </div>
      </div>
    </>
  )
}

export default Head
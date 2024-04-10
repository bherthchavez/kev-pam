import React from 'react'
import kevpam from '../assets/headpic.png'

function Head() {
  
  return (
    <>
      <div className='pt-28 sm:pt-24 md:pt-20'>
        <div className='flex justify-center items-center w-full h-[50%] '>
            <img src={kevpam} className='w-full h-[50%] ' />
        </div>
      </div>
    </>
  )
}

export default Head
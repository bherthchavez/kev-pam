import React from 'react'
import saan from '../assets/saan.jpg'

import ReactCurvedText from 'react-curved-text';

const Venue = () => {
    return (
        <>
            <div name="kailan" className='max-w-[1000px] mx-auto pt-32 pb-32'>
                <div className='flex flex-col sm:flex-row gap-4 justify-around items-center px-10 sm:px-15 md:px-20 lg:px-42 xl:px-0 2xl:px-0'>
                    <div className='flex flex-col gap-5 text-white text-center text-base sm:text-2xl'>
                      
                        <div className='flex sm:hidden'>
                            <ReactCurvedText width='321'
                                height='100'
                                cx='163'
                                cy='156'
                                rx='106'
                                ry='106'
                                startOffset='86'
                                reversed={true}
                                text='kailan at saan?'
                                textProps={{ "style": { "fontSize": "26" } }}
                                textPathProps={{ "fill": "#ffffff" }}
                                tspanProps={{ "dy": "6" }}
                                ellipseProps={null}
                                svgProps={{ "style": { "transform": "rotate(0deg)" } }} />
                        </div>

                        <div className='hidden sm:flex'>
                            <ReactCurvedText width='321'
                                height='140'
                                cx='163'
                                cy='156'
                                rx='106'
                                ry='106'
                                startOffset='86'
                                reversed={true}
                                text='kailan at saan?'
                                textProps={{ "style": { "fontSize": "26" } }}
                                textPathProps={{ "fill": "#ffffff" }}
                                tspanProps={{ "dy": "6" }}
                                ellipseProps={null}
                                svgProps={{ "style": { "transform": "rotate(0deg)" } }} />
                        </div>

                        



                        <h1>june 8, 2024, saturday <br></br> 3:00 PM</h1>
                        <a href='https://maps.app.goo.gl/wEwkVMmAmMhBcFVE7'
                            target='_blank' rel='noreferrer noopener'
                            className='underline'>Savanna Farm Tagaytay  <br></br>Alfonso, Cavite</a>
                    </div>

                    <div className=''>
                        <img src={saan} className=' rounded-xl border-[#403F10] border-2' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Venue
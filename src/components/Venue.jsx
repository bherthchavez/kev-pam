import React from 'react'
import saan from '../assets/saan.jpg'
import kailan from '../assets/kailan.png'

import ReactCurvedText from 'react-curved-text';

const Venue = () => {
    return (
        <>
            <div name="kailan" className='w-full'>
                <div className='flex flex-col sm:flex-row gap-4 justify-between items-center '>
                    <div className='flex  flex-col w-full sm:w-[30%] justify-center items-center text-[#EBE7E4] text-center text-base sm:text-xl'>
                      
                        {/* <div className='flex sm:hidden'>
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
                        </div> */}
                        <div className=''>
                            {/* <ReactCurvedText width='321'
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
                                svgProps={{ "style": { "transform": "rotate(0deg)" } }} /> */}
                                <img src={kailan} className='w-56 sm:w-80' />

                        </div>
                    
                        
                        <h1 className='font-bold mb-5'> saturday, june 08, 2024 <br></br> 
                        <p className='mt-2'>3:30 in the afternoon</p>
                        </h1>
                        <a href='https://maps.app.goo.gl/wEwkVMmAmMhBcFVE7'
                            target='_blank' rel='noreferrer noopener'
                            className='underline font-bold mb-16'>SAVANNA FARM TAGAYTAY  <br></br>
                            <p className='font-thin text-sm sm:text-lg'>Sicat Road, Alfonso, Cavite</p>
                            </a>
                    </div>

                    <div className='w-full sm:w-[70%] '>
                        <img src={saan} className='object-contain' />
                    </div>
                </div>
            </div>
            <div className={'p-4 lg:text-base flex justify-center text-slate-700'}>
          <a href='https://julbertpruel.netlify.app/' className='text-xs'>
            ⓒ {new Date().getFullYear()} Julbert Pruel
          </a>
        </div>
        </>
    )
}

export default Venue
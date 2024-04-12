import React, { useEffect } from 'react'
import saan from '../assets/saan.jpg'
import kailan from '../assets/kailan.png'
import Aos from "aos";
import "aos/dist/aos.css";
import ReactCurvedText from 'react-curved-text';

const Venue = () => {

    useEffect(function () {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <>
            <div  name="kailan" className='w-full'>
                <div  className='flex flex-col sm:flex-row gap-4 justify-between items-center '>
                    <div data-aos="fade-up" data-aos-delay="2000" data-aos-offset="100" data-aos-easing="ease-in-sine" data-aos-duration="1000"  className='flex  flex-col w-full sm:w-[35%] justify-center items-center text-[#EBE7E4] text-center text-base sm:text-2xl'>
                      
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
                        <div  className=''>
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
                                <img src={kailan} className='w-56 sm:w-96' />

                        </div>
                    
                        
                        <h1 className='font-semibold mb-5'> saturday, june 08, 2024 <br></br> 
                        <p className='mt-1'>3:30 in the afternoon</p>
                        </h1>
                        <a href='https://maps.app.goo.gl/wEwkVMmAmMhBcFVE7'
                            target='_blank' rel='noreferrer noopener'
                            className='underline font-semibold mb-16'>SAVANNA FARM TAGAYTAY  <br></br>
                            <p className='font-thin text-sm sm:text-xl'>Sicat Road, Alfonso, Cavite</p>
                            </a>
                    </div>

                    <div data-aos="fade-up" data-aos-duration="3000"  className='w-full sm:w-[65%] '>
                        <img src={saan} className='object-contain' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Venue
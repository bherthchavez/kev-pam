import React from 'react'
import { useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';


const Navbar = () => {

    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <>
            <div className={`z-20 bg-[#000] tracking-widest text-[1.4rem]  fixed flex justify-between px-8 sm:px-24  items-center top-0 w-screen h-28 text-white`}>
                <a href='/' className="cursor-pointer font-bold rounded px-2">
                    <h1 className='text-[1.5rem] '> kev+pam</h1>
                </a>
                <ul className="hidden md:flex  rounded gap-8 text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-[#EBE7E4]">
                    <nav onClick={() => scroll.scrollTo(760)}>
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full  cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                kailan at saan?
                            </span>
                        </li>
                    </nav>
                    <nav onClick={() => scroll.scrollTo(1550)}>
                        <li className=' p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                entourage
                            </span>
                        </li>
                    </nav>
                    <nav onClick={() => scroll.scrollTo(4120)}>
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                outfit check!
                            </span>
                        </li>
                    </nav>
                    <nav onClick={() => scroll.scrollTo(3100)}>
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                RSVP here
                            </span>
                        </li>
                    </nav>

                </ul>

                {/* Humberger */}
                <div data-aos="fade-left" data-aos-delay="2000" className="relative  block md:hidden ">
                    <nav>
                        <button
                            className="w-12 h-11 relative focus:outline-none"
                            onClick={handleNav}
                        >
                            <div className="block w-8 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span
                                    className={`block absolute h-[0.120rem] w-8 text-white bg-current transform transition duration-500 ease-in-out rounded-full ${nav ? 'rotate-45' : '-translate-y-1.5'
                                        }`}
                                ></span>
                                <span
                                    className={`block absolute h-[0.120rem] w-8 text-white bg-current transform transition duration-500 ease-in-out rounded-full ${nav ? '-rotate-45' : 'translate-y-1.5'
                                        }`}
                                ></span>
                            </div>
                        </button>
                    </nav>
                </div>

            </div>

            <div className={nav ? `overflow-hidden fixed z-10 left-0 top-0 w-full h-full backdrop-blur-xl  bg-[#000000] ease-in-out duration-300 bg-opacity text-white` : 'z-10 fixed w-[70%] top-0 h-full ease-in-out duration-300  left-[-100%] text-white'}>
                <div className='flex flex-col justify-center gap-32 items-center  h-screen '>

                    <ul className='text-3xl flex flex-col  gap-8 '>
                        <nav onClick={() => scroll.scrollTo(280)} >
                            <li onClick={handleNav} className=' cursor-pointer '>
                                kailan at saan?
                            </li>
                        </nav>
                        <nav onClick={() => scroll.scrollTo(1070)} >
                            <li onClick={handleNav} className=' cursor-pointer '>
                                entourage
                            </li>
                        </nav>
                        <nav onClick={() => scroll.scrollTo(4900)}>
                            <li onClick={handleNav} className=' cursor-pointer  '>
                                outfit check!
                            </li>
                        </nav>
                        <nav onClick={() => scroll.scrollTo(3300)}>
                            <li onClick={handleNav} className=' cursor-pointer  '>
                                RSVP here
                            </li>
                        </nav>


                    </ul>
                </div>

            </div>



        </>
    )
}

export default Navbar
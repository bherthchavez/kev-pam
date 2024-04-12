import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import Aos from "aos";
import "aos/dist/aos.css";

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const [colorChange, setColorchange] = useState(true);
    const [scrollY, setscrollY] = useState(window.scrollY);

    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(function () {
        Aos.init({ duration: 1000 });
    }, []);

    nav ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden")

    
    const changeNavbarColor = () => {
        
        if (window.scrollY < scrollY) {
            setColorchange(true);
        }
        else {
            setscrollY(window.scrollY)
            setColorchange(false);
        }
    };
    window.addEventListener('scroll', changeNavbarColor);

    const classNav = window.scrollY ? 'backdrop-blur-md bg-[#000]/50 shadow-md' : ''



    return (
        <>
            <div className={colorChange
                ? `${classNav}  z-20 bg-[#000] tracking-widest text-[1.4rem] ease-in-out duration-500 fixed flex justify-between px-8 sm:px-24  items-center top-0 w-screen h-28 text-white`
                : `z-20 fixed  flex justify-between items-center tracking-tighter w-screen ease-out-in duration-500 top-[-100%] px-8 sm:px-24 h-16 text-white`
            }>
                <a data-aos="fade-right" data-aos-delay="500" href='/' className="cursor-pointer font-bold rounded px-2">
                    <h1 className='text-[1.5rem] '> kev+pam</h1>
                </a>
                <ul data-aos="fade-left" data-aos-delay="500" className="hidden md:flex  rounded gap-8 text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-[#EBE7E4]">

                    <Link to='kailan' smooth={true} duration={500}>
                        {/* <nav onClick={() => scroll.scrollTo(760)}> */}
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full  cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                kailan at saan?
                            </span>
                        </li>
                        {/* </nav> */}
                    </Link>

                    <Link to='entourage' smooth={true} duration={500}>
                        {/* <nav onClick={() => scroll.scrollTo(1550)}> */}
                        <li className=' p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                entourage
                            </span>
                        </li>
                        {/* </nav> */}
                    </Link>

                    <Link to='outfit' smooth={true} duration={500}>
                        {/* <nav onClick={() => scroll.scrollTo(4120)}> */}
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                outfit check!
                            </span>
                        </li>
                        {/* </nav> */}
                    </Link>

                    <Link to='rsvp' smooth={true} duration={500}>
                        {/* <nav onClick={() => scroll.scrollTo(3100)}> */}
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                RSVP here
                            </span>
                        </li>
                        {/* </nav> */}
                    </Link>

                </ul>

                {/* Humberger */}
                <div data-aos="fade-left" data-aos-delay="500" className="relative  block md:hidden ">
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
                        <Link to='kailan' smooth={true} duration={500}>
                            {/* <nav onClick={() => scroll.scrollTo(280)} > */}
                            <li onClick={handleNav} className=' cursor-pointer '>
                                kailan at saan?
                            </li>
                            {/* </nav> */}
                        </Link>
                        <Link to='entourage' smooth={true} duration={500}>
                            {/* <nav onClick={() => scroll.scrollTo(1000)} > */}
                            <li onClick={handleNav} className=' cursor-pointer '>
                                entourage
                            </li>
                            {/* </nav> */}
                        </Link>

                        <Link to='outfit' smooth={true} duration={500}>

                            {/* <nav onClick={() => scroll.scrollTo(4600)}> */}
                            <li onClick={handleNav} className=' cursor-pointer  '>
                                outfit check!
                            </li>
                            {/* </nav> */}
                        </Link>

                        <Link to='rsvp' smooth={true} duration={500}>
                            {/* <nav onClick={() => scroll.scrollTo(3200)}> */}
                            <li onClick={handleNav} className=' cursor-pointer  '>
                                RSVP here
                            </li>
                            {/* </nav> */}
                        </Link>

                    </ul>
                </div>

            </div>



        </>
    )
}

export default Navbar
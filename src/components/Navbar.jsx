import React from 'react'
import { useState } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };


    return (
        <>
            <div className={`z-20 tracking-widest font-bold text-[1.4rem]  fixed flex justify-between px-8 sm:px-10 md:px-20 lg:px-42 xl:px-52 2xl:px-80 items-center top-0 w-screen h-36 text-white`}>
                <a href='/' className="cursor-pointer bg-[#000] rounded px-2">
                    <h1 className='text-[1.2rem] '> kev+pam</h1>
                </a>
                <ul className="hidden md:flex bg-[#000] rounded gap-8 ">
                    <Link to='simbahan' smooth={true} duration={500}>
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full text-md text-[#fef1e2] cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                kailan at saan?
                            </span>
                        </li>
                    </Link>
                    <Link to='paghahanda' smooth={true} duration={500}>
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full text-md text-[#fef1e2] cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                outfit check!
                            </span>
                        </li>
                    </Link>
                    <Link to='kulay' smooth={true} duration={500}>
                        <li className='p-2 group transition-all duration-300 ease-in-out cursor-pointer'>
                            <span className='w-full text-md text-[#fef1e2] cursor-pointer bg-left-bottom bg-gradient-to-r from-[#fef1e2] to-[#fef1e2] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                                rsvp
                            </span>
                        </li>
                    </Link>

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
                        <Link to='simbahan' smooth={true} duration={500}>
                            <li onClick={handleNav} className=' cursor-pointer '>
                                kailan at saan?
                            </li>
                        </Link>
                        <Link to='paghahanda' smooth={true} duration={500}>
                            <li onClick={handleNav} className=' cursor-pointer  '>
                                outfit check!
                            </li>
                        </Link>
                        <Link to='pamunuan' smooth={true} duration={500}>
                            <li onClick={handleNav} className=' cursor-pointer  '>
                                rsvp
                            </li>
                        </Link>


                    </ul>
                </div>

            </div>



        </>
    )
}

export default Navbar
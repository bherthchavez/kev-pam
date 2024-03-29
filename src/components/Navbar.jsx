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
            <div className={`z-20 bg-[#000000] font-glacial tracking-widest font-bold text-lg  fixed flex justify-between px-4 sm:px-8 items-center top-0 w-screen h-20 text-white`}>
                <a href='/' className="cursor-pointer">
                    <h1 className=''> kev+pam</h1>
                </a>
                <ul className="hidden md:flex gap-8 ">
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
            </div>

        </>
    )
}

export default Navbar
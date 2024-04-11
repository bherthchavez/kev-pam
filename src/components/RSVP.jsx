import React from 'react'
import saan from '../assets/saan.jpg'
import rsvp from '../assets/rsvp.png'
import rsvpIMG from '../assets/rsvpIMG.png'
import rsvpIMG2 from '../assets/rsvpIMG2.png'

const RSVP = () => {
    return (
        <>
            <div name="kailan" className=''>
                <div className='flex flex-col sm:flex-col gap-6 items-center  justify-center mx-auto '>

                    <div className='flex mt-10 flex-col justify-center items-center text-[#EBE7E4] text-center text-base sm:text-xl'>
                        <div className=''>
                            <img src={rsvp} className='w-80 sm:w-[30rem]' />
                        </div>
                        <h1 className=''> ilagay mo na <strog className='font-extrabold italic'>name</strog> mo here! </h1>
                        <p className='mt-1'>at tignan ang <strog className='font-extrabold italic'>outfit</strog> cheeeeck!</p>

                        <div className='mt-5 text-left w-64 flex flex-col gap-5'>
                            <label
                                htmlFor="firstname"
                                className="block overflow-hidden  border border-gray-500 px-4 py-1 pb-3 shadow-sm focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400"
                            >
                                <span className="text-base tracking-wider font-medium text-gray-500"> first name </span>

                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    className="mt-1 w-full bg-black text-white tracking-widest  border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-lg sm:text-xl" />
                            </label>
                            <label
                                htmlFor="firstname"
                                className="block overflow-hidden  border border-gray-500 px-4 py-1 pb-3 shadow-sm focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400"
                            >
                                <span className="text-base tracking-wider font-medium text-gray-500"> last name </span>

                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    className="mt-1 w-full bg-black text-white tracking-widest  border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-lg sm:text-xl" />
                            </label>

                            <button
                                className="group tracking-widest relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                                type="submit"
                            >
                                <span className="absolute inset-0 border border-slate-600 group-active:border-slate-500"></span>
                                <span
                                    className="block  border border-slate-600 bg-slate-600 px-12 py-3 transition-transform active:border-slate-500 active:bg-slate-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                                >
                                    TINGNAN
                                </span>
                            </button>
                        </div>

                    </div>

                    <div className='mt-20 hidden sm:flex'>
                        <img src={rsvpIMG} className=" " />
                    </div>

                    <div className='mt-20 flex sm:hidden'>
                        <img src={rsvpIMG2} className=" " />
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

export default RSVP
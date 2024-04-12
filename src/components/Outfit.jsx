import React, { useEffect } from 'react'
import outfitG from '../assets/outfitG.png'
import outfitB from '../assets/outfitB.png'
import seeyou from '../assets/seeyou.png'
import seeyouthere from '../assets/seeyouthere.png'
import Aos from "aos";
import "aos/dist/aos.css";
const Outfit = () => {
    useEffect(function () {
        Aos.init({ duration: 1000 });
    }, []);
    return (
        <>
            <section data-aos="fade-up" data-aos-duration="3000" name='outfit' className="container flex flex-col mt-24  text-center sm:text-left sm:gap-5 mx-auto px-10 sm:px-0  max-w-[1330px] text-white">
                <div className='flex flex-col sm:flex-row'>
                    <div className='w-full sm:w-[40%]'>
                        <h1 className='font-semibold text-4xl sm:text-5xl mb-5'> outfit check!</h1>
                        <p className=' font-light text-xl sm:text-2xl mb-3 uppercase'>wear your <b className='italic'> BEST </b>  <b className='font-semibold'>ALL BLACK SEMI-FORMAL </b> <br></br> for an outdoor venue.</p>
                        <p className=' font-light text-xl sm:text-2xl'>(STRICTLY no other colors please)</p>
                    </div>
                    <div className='mt-10 sm:mt-20 flex justify-center items-center '>
                        <img src={outfitG} className=" " />
                    </div>
                </div>

                <div className=' sm:ml-32 sm:w-[60%] flex justify-center items-center'>
                    <img src={outfitB} className="w-auto h-40 sm:h-80" />
                </div>
            </section>

            <div className='mt-20 sm:mt-36'>
                <div className='sm:mt-20 flex justify-center items-center '>
                    <img src={seeyouthere} className=" h-16 sm:h-28 mb-7 sm:mb-12" />
                </div>
                <div>
                    <img src={seeyou} className="w-full" />
                </div>
            </div>

            <div className={'p-4 lg:text-base flex justify-center text-slate-500'}>
                <a href='https://julbertpruel.netlify.app/' className='text-xs'>
                    ⓒ {new Date().getFullYear()} Julbert Pruel
                </a>
            </div>
        </>
    )
}

export default Outfit
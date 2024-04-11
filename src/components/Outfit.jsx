import React from 'react'
import outfitG from '../assets/outfitG.png'
import outfitB from '../assets/outfitB.png'
const Outfit = () => {
    return (
        <>
            <div className="container flex flex-col mt-24  text-center sm:text-left sm:gap-5 mx-auto px-10 sm:px-0  max-w-[1330px] text-white">
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
            </div>

            <div className={'p-4 lg:text-base flex justify-center text-slate-700'}>
                <a href='https://julbertpruel.netlify.app/' className='text-xs'>
                    ⓒ {new Date().getFullYear()} Julbert Pruel
                </a>
            </div>
        </>
    )
}

export default Outfit
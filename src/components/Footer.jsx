import React from 'react'
import seeyou from '../assets/seeyou.png'
import seeyouthere from '../assets/seeyouthere.png'

const Footer = () => {
    return (
        <>
            <main>
                <div className='mt-20'>
                    <div className='flex justify-center sm:pt-20 items-center '>
                        <img src={seeyouthere} className=" h-16 sm:h-28 mb-7 sm:mb-12" />
                    </div>
                    <div>
                        <img src={seeyou} className="w-full" />
                    </div>
                </div>

                <div className={'p-4 mt-2 bg-black lg:text-base flex justify-center text-slate-500'}>
                    <a href='https://julbertpruel.netlify.app/' className='text-xs'>
                        ⓒ {new Date().getFullYear()} Julbert Pruel
                    </a>
                </div>
            </main>
        </>
    )
}

export default Footer
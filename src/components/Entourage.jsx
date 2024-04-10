import React from 'react'
import saan from '../assets/saan.jpg'
import entourage from '../assets/entourage.png'
import entourage1 from '../assets/entourage1.jpg'
import entourage2 from '../assets/entourage2.jpg'
import entourage3 from '../assets/entourage3.jpg'
import ReactCurvedText from 'react-curved-text';

const Venue = () => {
    return (
        <>
            <div name="entourage" className='w-full mb-20'>
                <div className='flex flex-col sm:flex-row gap-4 justify-between items-center '>
                    
                    <div className='hidden sm:flex flex-col w-full sm:w-[45%]  '>
                        <img src={entourage1} className='' />
                        <img src={entourage2} className='' />
                        <img src={entourage3} className='' />
                    </div>

                    <div className='flex px-5 sm:px-0 pt-5 sm:pt-0 flex-col w-full sm:w-[55%] justify-center items-center text-[#EBE7E4] text-center text-sm sm:text-xl'>

                        <div className=''>
                            <img src={entourage} className='w-80 sm:w-[30rem]' />
                        </div>

                        <div className='mb-3'>
                            <h1 className='font-semibold mb-5'> wedding officiant <br></br>
                                <p className='mt-1 font-light'>Pastor John David Auxtero</p>
                            </h1>
                        </div>

                        <div className='flex gap-5 sm:gap-5 mb-3'>
                            <div>
                                <h1 className='font-semibold mb-5'> parents of the groom <br></br>
                                    <p className='mt-1 font-light'>Mr. Ricardo Topino</p>
                                    <p className='mt-1 font-light'>Mrs. Rosarie Topino</p>
                                </h1>
                            </div>
                            <div>
                                <h1 className='font-semibold mb-5'> parents of the bride <br></br>
                                    <p className='mt-1 font-light'>Mr. Godofredo Alibusa</p>
                                    <p className='mt-1 font-light'>Mrs. Jocelyn Alibusa</p>
                                </h1>
                            </div>
                        </div>

                        <div className='mb-5'>
                            <h1 className='font-semibold'>principal sponsors </h1>
                        </div>

                        <div className='flex gap-5 sm:gap-20 mb-3'>
                            <div>
                                <p className='mt-1 font-light'>Mr. Joselito Santos</p>
                                <p className='mt-1 font-light'>Mr. Yonobev Alibusa</p>
                                <p className='mt-1 font-light'>Mr. Olan Suarez</p>
                                <p className='mt-1 font-light'>Mr. Pepito Lozanta</p>
                                <p className='mt-1 font-light'>Mr. Victor De Guia</p>
                            </div>
                            <div>

                                <p className='mt-1 font-light'>Mrs. Divine Chua</p>
                                <p className='mt-1 font-light'>Mrs. Marie Lalaine Garrido</p>
                                <p className='mt-1 font-light'>Ms. Elsa Suarez</p>
                                <p className='mt-1 font-light'>Ms. Justine Angeles</p>
                                <p className='mt-1 font-light'>Ms. Katrina Santos</p>

                            </div>
                        </div>

                        <div className='flex gap-5 sm:gap-20 mb-3'>
                            <div>
                                <h1 className='font-semibold mb-5'> best men <br></br>
                                    <p className='mt-1 font-light'>Keith Jeremy Topino</p>
                                    <p className='mt-1 font-light'>Klyde Jefferson Topino</p>
                                </h1>
                            </div>
                            <div>
                                <h1 className='font-semibold mb-5'> maids of honor <br></br>
                                    <p className='mt-1 font-light'>Kyla Caughlin Alibusa</p>
                                    <p className='mt-1 font-light'>Aleksandrei Miles Alibusa</p>
                                </h1>
                            </div>
                        </div>

                        <div className='flex gap-5 sm:gap-20 mb-3'>
                            <div>
                                <h1 className='font-semibold mb-5'> groomsmen <br></br>
                                    <p className='mt-1 font-light'>Gleo Dominise</p>
                                    <p className='mt-1 font-light'>Lloyd Sidney Cuevas</p>
                                    <p className='mt-1 font-light'>Joed Faro</p>
                                    <p className='mt-1 font-light'>John Gabriel Ramos</p>
                                    <p className='mt-1 font-light'>Robert Angelo Barretto</p>
                                    <p className='mt-1 font-light'>Joshua Esteves</p>
                                    <p className='mt-1 font-light'>Marianito Lavilla</p>
                                </h1>
                            </div>
                            <div>
                                <h1 className='font-semibold mb-5'> bridesmaids <br></br>
                                    <p className='mt-1 font-light'>Immary Donna Tolentino</p>
                                    <p className='mt-1 font-light'>Jessa Enriquez</p>
                                    <p className='mt-1 font-light'>Nikka Alexandra Santos</p>
                                    <p className='mt-1 font-light'>Yvonne Coleen Paz</p>
                                    <p className='mt-1 font-light'>Jeremy Sancebuche</p>
                                </h1>
                            </div>
                        </div>

                        <div className='mb-5'>
                            <h1 className='font-semibold'>secondary sponsors </h1>
                        </div>

                        <div className='flex gap-5 sm:gap-10 mb-3'>
                            <div className='font-light  text-right'>
                                <p className='mt-1 '>Paula Jodine Prue</p>
                                <p className='mt-1 '>Trisha Anne De Guia</p>
                                <p className='mt-1 '>May Alibusa</p>
                            </div>
                            <div className='font-bold'>
                                <p className='mt-1'>candle</p>
                                <p className='mt-1'>veil</p>
                                <p className='mt-1'>cord</p>
                            </div>
                            <div className='font-light  text-left'> 
                                <p className='mt-1 '>Julbert Pruel</p>
                                <p className='mt-1'>Jethro De Guia</p>
                                <p className='mt-1'>Thomas Alexie Alibusa</p>
                            </div>
                        </div>

                        <div className='flex gap-5 sm:gap-20 mb-5'>
                            <div>
                                <h1 className='font-semibold mb-5'> bible bearer <br></br>
                                    <p className='mt-1 font-light'>Aundray Jairus Santos</p>
                                </h1>
                            </div>
                            <div>
                                <h1 className='font-semibold mb-5'> ring bearer <br></br>
                                    <p className='mt-1 font-light'>Sevigny Laurence Tolentino</p>
                                </h1>
                            </div>
                        </div>
                        
                        <div className='flex gap-5 sm:gap-20 mb-5'>
                            <div>
                                <h1 className='font-semibold mb-5'> coin bearer <br></br>
                                    <p className='mt-1 font-light'>Dwayne Godfrey Alibusa</p>
                                </h1>
                            </div>
                            <div>
                                <h1 className='font-semibold mb-5'> flower girl <br></br>
                                    <p className='mt-1 font-light'>Triela Rocket De Guia</p>
                                </h1>
                            </div>
                        </div>

                        <div className='mb-20 sm:mb-0'>
                            <h1 className='font-semibold'> flower ladies <br></br>
                                <p className='mt-1 font-light'>Tala Maria Delos Reyes</p>
                                <p className='mt-1 font-light'>Julien Mackenzie Tolentino</p>
                            </h1>
                        </div>



                    </div>

                    <div className='flex flex-col sm:hidden w-full sm:w-[45%]  '>
                        <img src={entourage1} className='' />
                        <img src={entourage2} className='' />
                        <img src={entourage3} className='' />
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
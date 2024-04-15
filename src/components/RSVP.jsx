import React from 'react'
import { useEffect, useState } from "react";
import useApi from "../hooks/useAPI"
import { useNavigate } from "react-router-dom";
import rsvp from '../assets/rsvp.png'
import rsvpIMG from '../assets/rsvpIMG.png'
import rsvpIMG2 from '../assets/rsvpIMG2.png'
import Aos from "aos";
import "aos/dist/aos.css";

const RSVP = () => {

    useEffect(function () {
        Aos.init({ duration: 1000 });
    }, []);

    const navigate = useNavigate()
    const [details, setDetails] = useState(
        {
            firstName: '',
            lastName: ''
        }
    )

    const [listInvited, setListInvited] = useState([])
    const [noFound, setNoFound] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [refetchTrigger, setRefetchTrigger] = useState(false);

    const { getGuestsList } = useApi();

    useEffect(() => {
        const fetchInvited = async () => {
            try {
                const result = await getGuestsList()
                setListInvited(result)

            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        fetchInvited();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetchTrigger])


    const searchInvited = (event) => {
        event.preventDefault()

        if (details.firstName !== "" && details.lastName !== "") {

            const existing = listInvited.find(inv => inv.f_name.toUpperCase() == details.firstName.toUpperCase() && inv.l_name.toUpperCase() == details.lastName.toUpperCase())

            if(existing && !existing.fromPlus1ID){
                navigate(`rsvp/${existing.id}`)
            }else{
                setNoFound("Oops! Mali ang pangalan. Please contact Kevin or Pamela.")
            }
        }

    }

    return (
        <>
            <section   name="rsvp" className=''>
                <div className='flex flex-col sm:flex-col gap-6 items-center  justify-center mx-auto '>

                    <div  className='flex mt-10 flex-col justify-center items-center text-[#EBE7E4] text-center text-base sm:text-xl'>
                        <div className=''>
                            <img src={rsvp} className='w-80 sm:w-[30rem]' />
                        </div>
                        <h1 className=''> ilagay mo na <b className='font-extrabold '>name</b> mo here! </h1>
                        <p className='mt-1'>at tignan ang <b className='font-extrabold '>outfit</b> cheeeeck!</p>

                        <form onSubmit={searchInvited} className='mt-5 text-left w-64 flex flex-col gap-5'>
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
                                    value={details.firstName}
                                    onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
                                    className="mt-1 w-full uppercase bg-black text-white tracking-widest  border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-lg sm:text-xl" />
                            </label>
                            <label
                                htmlFor="lastname"
                                className="block overflow-hidden  border border-gray-500 px-4 py-1 pb-3 shadow-sm focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400"
                            >
                                <span className="text-base tracking-wider font-medium text-gray-500"> last name </span>

                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    required
                                    value={details.lastName}
                                    onChange={e => setDetails({ ...details, lastName: e.target.value })}
                                    className="mt-1 w-full bg-black uppercase text-white tracking-widest  border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-lg sm:text-xl" />
                            </label>

                            {noFound &&
                                <h1 className="text-orange-400 text-xs mb-2">
                                    {noFound}
                                </h1>
                            }

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
                        </form>

                    </div>

                    <div  className='mt-20 hidden sm:flex'>
                        <img src={rsvpIMG} className=" " />
                    </div>

                    <div  className='mt-20 flex sm:hidden'>
                        <img src={rsvpIMG2} className=" " />
                    </div>

                </div>
            </section>
        </>
    )
}

export default RSVP
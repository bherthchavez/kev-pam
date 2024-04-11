import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import useApi from "../hooks/useAPI";
import firebase from "../firebase";
import hello from '../assets/hello.png'
import puntaKa from '../assets/puntaKa.png'
import oo from '../assets/oo.png'
import hindi from '../assets/hindi.png'
import Modal from "./Modal";
import outfitG from '../assets/outfitG.png'
import outfitB from '../assets/outfitB.png'

function Rsvp() {
  const params = useParams()
  const navigate = useNavigate()

  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  const formattedDate = now.toLocaleString('en-US', options);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foundInvited, setFoundInvited] = useState([])
  const [btnStatus, setBtnStatus] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const { getGuestsList } = useApi();


  useEffect(() => {
    const fetchInvited = async () => {
      try {
        const result = await getGuestsList()
        const existing = result.find(inv => inv.id === params.id)
        if (existing) {
          console.log(existing)
          setFoundInvited(existing)
          setBtnStatus(existing.status)
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchInvited();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger])


  const attending = () => {
    firebase
      .firestore().collection('guestsList')
      .doc(params.id)
      .update({ status: "attending", updatedDate: formattedDate })
      .then(() => {
        setRefetchTrigger(prev => !prev)
        setIsModalOpen(prev => !prev)
        console.log(foundInvited.status)
      }).catch((error) => {
        console.log(error.message)
      });

  };
  const notAttending = () => {
    firebase
      .firestore().collection('guestsList')
      .doc(params.id)
      .update({ status: "not attending", updatedDate: formattedDate })
      .then(() => {
        setRefetchTrigger(prev => !prev)
        setIsModalOpen(prev => !prev)
        console.log(foundInvited.status)
      }).catch((error) => {
        console.log(error.message)
      });

  };

  const handleModalClose = () => {

    navigate(`/`)

  }



  return (
    <>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} notAttending={foundInvited.status}>
        <div className="bg-[#EBE7E4] p-4 ">
          <div className="  items-center text-center my-5">
            <h2 className="text-xl font-bold  text-black">
              {foundInvited.status === 'attending'
                ? `thank you sa pag-confirm!`
                : `aww, thank you sa pag-confirm. ingat!`
              }

            </h2>

          </div>
          {
            foundInvited.status === 'attending'
            &&
            <div className="flex flex-col  text-center  sm:gap-5 px-4 sm:px-10 mb-5 sm:my-10 text-gray-800 ">
              <h1 className="text-xl font-bold mb-5">
                outfit check!
              </h1>
              <p className="uppercase mb-5">wear your  BEST <b className="font-extrabold">ALL BLACK SEMI-FORMAL</b>  <br /> for an outdoor venue.</p>
              <p className="text-sm mb-5">(STRICTLY no other colors please)</p>
              {
                foundInvited.gender === 'male'
                  ? <img src={outfitB} className="mb-5 " />
                  : <img src={outfitG} className="mb-5 " />
              }

              <p className="text-xl font-bold">gifts</p>
              <p className="text-sm mb-5">your love, laughter, and company on <br /> our wedding day is the greatest gift of all.</p>
              <p className="text-sm">but if you desire to give nonetheless, <br /> a <b className="font-bold">monetary gift</b> is one we suggest.</p>

            </div>
          }

        </div>
      </Modal>

      <section name='Kulay' className="flex flex-col justify-between bg-custom2 bg-local bg-black h-screen bg-center bg-cover font-sans">
        <div className="container flex flex-col p-8 gap-5 sm:gap-10 mx-auto md:p-8 max-w-[1200px]">
          <div className='flex flex-col justify-center items-center'>

            <div className='flex flex-col justify-center items-center'>
              <div className="flex flex-col justify-center items-center text-white">
                <a href='/' className="cursor-pointer  rounded px-2 tracking-widest font-semibold text-sm ">kev+pam</a>
              </div>
            </div>
          </div>

          <div className='text-[#727171] flex flex-col justify-center items-center gap-2  text-center text-[25px] sm:text-[35px] leading-7 sm:leading-[43px] '>
            <img src={hello} alt='Logo' className='w-16 sm:w-28 mr-36 sm:mb-5 -rotate-12' />

            <div className="font-semibold text-[#979D25] capitalize mb-10">
              <p>{foundInvited.f_name} {foundInvited.l_name}</p>
              <p className="text-xl font-normal text-[#EBE7E4]">{foundInvited.remarks}</p>
            </div>

            <img src={puntaKa} alt='Logo' className='w-60 sm:w-72' />
            <p className="text-xl font-normal text-[#EBE7E4]">i-click ang picture</p>

            <div className="flex gap-5 sm:gap-10 mt-2">
              <img src={oo} alt='Logo' onClick={attending}
                className={foundInvited.status === `pending` || foundInvited.status === `not attending`
                  ? `w-32 sm:w-72 border-2 border-slate-800 hover:border-slate-300 cursor-pointer`
                  : 'w-32 sm:w-72 border-[7px] border-[#979D25] hover:border-[#979D25] cursor-pointer'

                } />
              <img src={hindi} alt='Logo' onClick={notAttending}
                className={foundInvited.status === `pending` || foundInvited.status === `attending`
                  ? `w-32 sm:w-72 border-2 border-slate-800 hover:border-slate-300 cursor-pointer`
                  : 'w-32 sm:w-72 border-[7px] border-[#979D25] hover:border-[#979D25] cursor-pointer'
                } />
            </div>

            <div className="flex justify-center text-base items-center gap-5">


            </div>
          </div>


        </div>
        <div className={'p-4 text-xs lg:text-sm flex justify-center text-[#929292]'}>
          <a href='https://julbertpruel.netlify.app/' className=' '>
            ⓒ {new Date().getFullYear()} Julbert Pruel
          </a>
        </div>
      </section>
    </>
  )
}

export default Rsvp
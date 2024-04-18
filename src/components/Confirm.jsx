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

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true // for 12-hour format
  };

  const [plus1, setPlus1] = useState(false)
  const [plusYes, setPlusYes] = useState(false)
  const [plusYesG, setPlusYesG] = useState('')
  const [mainGuestStatus, setMainGuestStatus] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foundInvited, setFoundInvited] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const [details, setDetails] = useState(
    {
      f_name: '',
      l_name: '',
      plus: '',
      status: '',
      gender: '',
      remarks: '',
      side: '',
      fromPlus1ID: '',
      mainGuest: '',
    }
  )

  const { getGuestsList } = useApi();


  useEffect(() => {
    const fetchInvited = async () => {
      try {
        const result = await getGuestsList()
        const existing = result.find(inv => inv.id === params.id)
        if (existing) {
          console.log(existing)
          setFoundInvited(existing)
          setPlus1(existing.plus === 'yes')
          setPlusYes(existing.plus === 'yes' && existing.status === 'attending')
          setMainGuestStatus(existing.status)

          if (existing.plus === 'yes') {

            setDetails({
              ...details, f_name: existing.plus1_f_name,
              l_name: existing.plus1_l_name,
              gender: existing.plus1_gender,
              status: existing.plus1_status,
              remarks: 'Guest',
              side: existing.side,
              fromPlus1ID: existing.id,
              mainGuest: existing.f_name + " " + existing.l_name,
            })
          }

          setPlusYesG(existing.plus1_status)

        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchInvited();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger])

  const attending = (ans) => {

    setMainGuestStatus(ans)

    console.log(ans)
    if (plus1 && ans === 'attending') {
      setPlusYes(true)
    } else {

      deletePlus1()

      firebase
        .firestore().collection('guestsList')
        .doc(params.id)
        .update({
          status: ans,
          updatedDate: new Date().toLocaleDateString('en-US', options),
          plus1_status: ans,
          plus1_f_name: '',
          plus1_l_name: '',
          plus1_gender: '',
        })
        .then(() => {
          // setRefetchTrigger(prev => !prev)
          setIsModalOpen(prev => !prev)

          setDetails({
            f_name: '',
            l_name: '',
            status: '',
            gender: '',
            remarks: '',
            fromPlus1ID: '',
          })

          setPlusYes(false)
          setPlusYesG('')


        }).catch((error) => {
          console.log(error.message)
        });
    }

  };



  const confirmPlus1 = (ans) => {
    setDetails({ ...details, status: ans, updatedDate: new Date().toLocaleDateString('en-US', options) })
    setPlusYesG(ans)

    if (ans === 'attending') {

      submitPlus1(ans)

    } else {

      deletePlus1()

      firebase
        .firestore().collection('guestsList')
        .doc(params.id)
        .update({
          status: 'attending',
          plus1_status: ans,
          updatedDate: new Date().toLocaleDateString('en-US', options),
          plus1_f_name: '',
          plus1_l_name: '',
          plus1_gender: '',
        })
        .then(() => {
          setIsModalOpen(prev => !prev)

          setDetails({
            f_name: '',
            l_name: '',
            status: '',
            gender: '',
            remarks: '',
            fromPlus1ID: '',
          })

          setPlusYes(false)
          setPlusYesG('')

        }).catch((error) => {
          console.log(error.message)
        });
    }
  }

  const updateRSVP = (ans) => {
    firebase
      .firestore().collection('guestsList')
      .doc(params.id)
      .update({
        status: ans,
        updatedDate: new Date().toLocaleDateString('en-US', options),
        plus1_f_name: details.f_name,
        plus1_l_name: details.l_name,
        plus1_gender: details.gender,
        plus1_status: details.status
      })
      .then(() => {
        setIsModalOpen(prev => !prev)

        setDetails({
          f_name: '',
          l_name: '',
          status: '',
          gender: '',
          remarks: '',
          fromPlus1ID: '',
        })

        setPlusYes(false)
        setPlusYesG('')

      }).catch((error) => {
        console.log(error.message)
      });
  }

  const handleModalClose = () => {

    navigate(`/`)

  }



  const submitPlus1 = async (ans) => {

    if (details.f_name && details.l_name && details.status && details.gender) {

      const result = await getGuestsList()
      const existing = result.find(inv => inv.fromPlus1ID === details.fromPlus1ID)
      //  update plus1 details
      if (existing) {

        firebase
          .firestore().collection('guestsList')
          .doc(existing.id)
          .update({
            status: ans,
            updatedDate: new Date().toLocaleDateString('en-US', options),
            f_name: details.f_name,
            l_name: details.l_name,
            gender: details.gender
          })
          .then(() => {
            updateRSVP(ans)
          }).catch((error) => {
            console.log(error.message)
          });

      } else {
        firebase
          .firestore().collection('guestsList')
          .add(details)
          .then((res) => {
            console.log('res', res)
            console.log('New Invited SAVED!')

            updateRSVP('attending')

          }).catch((error) => {
            console.log(error.message)
          });
      }
    }
  }


  const deletePlus1 = async () => {
    const result = await getGuestsList()
    const existing = result.find(inv => inv.fromPlus1ID === details.fromPlus1ID)

    if (existing) {
      firebase
        .firestore().collection('guestsList')
        .doc(existing.id)
        .delete()
        .then(() => {
          console.log('Plus1 Deleted!')
        }).catch((error) => {
          console.log(error.message)
        });


    }
  }


  return (
    <>


      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="bg-[#EBE7E4] p-4 ">
          <div className="  items-center text-center my-5">
            <h2 className="text-xl font-bold  text-black">
              {mainGuestStatus === 'attending'
                ? `thank you sa pag-confirm!`
                : `aww, thank you sa pag-confirm. ingat!`
              }

            </h2>

          </div>
          {
            mainGuestStatus === 'attending'
            &&
            <div className="flex flex-col  text-center  sm:gap-5 px-4 sm:px-10 mb-5 sm:my-10 text-gray-800 ">
              <h1 className="text-xl font-bold mb-5">
                outfit check!
              </h1>
              <p className="uppercase mb-5">wear your  <i className="italic">BEST</i>  <b className="font-extrabold">ALL BLACK SEMI-FORMAL</b>  <br /> for an outdoor venue.</p>
              <p className="text-sm mb-5">(STRICTLY no other colors please)</p>
              {
                plus1
                && <>
                  <img src={outfitB} className="mb-5 " />
                  <img src={outfitG} className="mb-5 " />
                </>
              }
              {
                !plus1 && foundInvited.gender === 'male' && <img src={outfitB} className="mb-5 " />
              }
              {
                !plus1 && foundInvited.gender === 'female' && <img src={outfitG} className="mb-5 " />
              }

              <p className="text-xl font-bold">gifts</p>
              <p className="text-sm mb-5"><i className="italic">your love, laughter, and company</i> on <br /> our wedding day is the greatest gift of all.</p>
              <p className="text-sm">but if you desire to give nonetheless, <br /> a <b className="font-bold">monetary gift</b> is one we suggest.</p>

            </div>
          }

        </div>
      </Modal>
      <section className=" flex flex-col font-glacial">
        <div className='flex flex-col justify-center items-center'>

          <div className='flex flex-col justify-center items-center'>
            <div className="flex flex-col justify-center items-center text-white">
              <a href='/' className="cursor-pointer  rounded py-3 px-2 tracking-widest font-semibold text-lg ">kev+pam</a>
            </div>
          </div>
        </div>
        <div className="container  flex flex-col p-8 gap-5 sm:gap-10 mx-auto  md:p-8 ">


          <div className='text-[#727171] flex flex-col justify-center items-center gap-2  text-center text-[25px] sm:text-[35px] leading-7 sm:leading-[43px] '>
            <img src={hello} alt='Logo' className='w-20 sm:w-28 mr-36 sm:mb-5 -rotate-12' />

            <div className="font-semibold text-[#979D25] capitalize mb-10">
              <p className="text-4xl sm:text-5xl">{foundInvited.f_name} {foundInvited.l_name}</p>
              <p className="text-lg sm:text-xl font-normal text-[#8d8b89]">{foundInvited.remarks}</p>
            </div>

            <img src={puntaKa} alt='Logo' className='w-56 sm:w-72 mt-5' />
            <p className="text-lg sm:text-xl font-normal text-[#EBE7E4]">i-click ang picture</p>

            <div className="flex gap-5 sm:gap-10 mt-2">
              <img src={oo} alt='Logo' onClick={() => attending('attending')}
                className={mainGuestStatus === 'pending' || mainGuestStatus === 'not attending'
                  ? `w-32 sm:w-72 border-2 border-slate-800 hover:border-slate-300 cursor-pointer`
                  : 'w-32 sm:w-72 border-[7px] border-[#979D25] hover:border-[#979D25] cursor-pointer'

                } />
              <img src={hindi} alt='Logo' onClick={() => attending('not attending')}
                className={mainGuestStatus === 'pending' || mainGuestStatus === 'attending'
                  ? `w-32 sm:w-72 border-2 border-slate-800 hover:border-slate-300 cursor-pointer`
                  : 'w-32 sm:w-72 border-[7px] border-[#979D25] hover:border-[#979D25] cursor-pointer'
                } />
            </div>
            {plusYes
              &&
              <>
                <p className="mt-10 text-base sm:text-lg font-normal text-[#EBE7E4]">ang isang kasama mo ba ay makakapunta?</p>
                <div className="flex gap-5 mt-5">
                  <button
                    className="group tracking-widest relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                    onClick={() => confirmPlus1('attending')}
                  >
                    <span className="absolute inset-0 border border-slate-600 group-active:border-slate-500"></span>
                    <span
                      className={plusYesG === 'attending'
                        ? `block  border border-[#979D25] bg-[#979D25] px-6 sm:px-12 py-3 transition-transform active:border-slate-500 active:bg-slate-500 group-hover:-translate-x-1 group-hover:-translate-y-1`
                        : `block  border border-slate-600 bg-slate-900 px-6 sm:px-12 py-3 transition-transform active:border-slate-500 active:bg-slate-500 group-hover:-translate-x-1 group-hover:-translate-y-1`}
                    >
                      oo naman!
                    </span>
                  </button>
                  <button
                    className="group tracking-widest relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                    onClick={() => confirmPlus1('not attending')}
                  >
                    <span className="absolute inset-0 border border-slate-600 group-active:border-slate-500"></span>
                    <span
                      className={plusYesG === 'not attending'
                        ? `block  border border-[#979D25] bg-[#979D25] px-6 sm:px-12 py-3 transition-transform active:border-slate-500 active:bg-slate-500 group-hover:-translate-x-1 group-hover:-translate-y-1`
                        : `block  border border-slate-600 bg-slate-900 px-6 sm:px-12 py-3 transition-transform active:border-slate-500 active:bg-slate-500 group-hover:-translate-x-1 group-hover:-translate-y-1`}
                    >
                      {`hindi :(`}
                    </span>
                  </button>
                </div>
              </>
            }

            {plusYesG === 'attending' && plus1 &&
              <>
                <p className="mt-10 text-base sm:text-lg font-normal text-[#EBE7E4]">ilagay ang full name niya sa ibaba:</p>
                <div className="mt-5 flex flex-col sm:flex-row gap-5 text-left text-white text-sm">
                  <label
                    htmlFor="Pangalan"
                    className="block overflow-hidden w-full border text-base border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                  >
                    <span className="text-sm tracking-widest font-light text-gray-500"> First Name </span>

                    <input
                      id="Pangalan"
                      name="Pangalan"
                      type="text"
                      required
                      className="mt-1 w-full uppercase bg-transparent tracking-widest  border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 "
                      onChange={(e) => setDetails({ ...details, f_name: e.target.value.toLowerCase() })}
                      value={details.f_name}

                    />
                  </label>
                  <label
                    htmlFor="Lastname"
                    className="block overflow-hidden w-full border text-base border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                  >
                    <span className="text-sm tracking-widest font-light text-gray-500"> Last Name </span>

                    <input
                      id="Lastname"
                      name="Lastname"
                      type="text"
                      required
                      className="mt-1 w-full uppercase bg-transparent tracking-widest  border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 "
                      onChange={(e) => setDetails({ ...details, l_name: e.target.value.toLowerCase() })}
                      value={details.l_name}
                    />
                  </label>
                  <label
                    htmlFor="Gender"
                    className="block overflow-hidden w-full border border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                  >
                    <span className="text-sm tracking-widest font-light text-gray-500"> Gender </span>

                    <select
                      name="Gender"
                      id="Gender"
                      required
                      className="mt-1.5 w-full uppercase tracking-widest bg-transparent"
                      onChange={(e) => setDetails({ ...details, gender: e.target.value.toLowerCase() })}
                      value={details.gender}
                    >
                      <option className="text-slate-800" value=""></option>
                      <option className="text-slate-800" value="female" >Female</option>
                      <option className="text-slate-800" value="male" >Male</option>
                    </select>
                  </label>

                </div>
                <button
                  className="mt-5 group tracking-widest relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                  onClick={() => confirmPlus1("attending")}
                >
                  <span className="absolute inset-0 border border-slate-600 group-active:border-slate-500"></span>
                  <span
                    className="block  border border-slate-600 bg-slate-800 px-6 sm:px-12 py-3 transition-transform active:border-slate-500 active:bg-slate-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                  >
                    Submit
                  </span>
                </button>

              </>

            }


          </div>


        </div>


      </section>
      <div className={'p-4 mt-10 text-xs lg:text-sm flex justify-center text-slate-700'}>
        <a href='https://julbertpruel.netlify.app/' className=' '>
          ⓒ {new Date().getFullYear()} Julbert Pruel
        </a>
      </div>
    </>
  )
}

export default Rsvp
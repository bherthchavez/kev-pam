import { useEffect, useState } from "react";
import useApi from "../hooks/useAPI";
import pg from '../assets/pj.png'
import firebase from "../firebase";
import { FiRefreshCw } from "react-icons/fi";

function GuestsList() {

  const [invited, setInvited] = useState([])
  const [filteredInvited, setFilteredInvited] = useState([])
  const [filterByStatus, setFilterByStatus] = useState(false)
  const [addInv, setAddInv] = useState(false)
  const [editInv, setEditInv] = useState(false)
  const [pass, setPass] = useState(false)
  const [password, setPassword] = useState('')
  const [wrongPassword, setWrongPassword] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const [details, setDetails] = useState(
    {
      f_name: '',
      l_name: '',
      status: '',
      gender: '',
      remarks: '',
      side: ''
    }
  )

  const { getGuestsList } = useApi();


  useEffect(() => {
    const fetchInvited = async () => {
      try {
        const result = await getGuestsList()
        const filterdByStatus = result.sort((a, b) => a.status > b.status ? 1 : -1)
        const filterByDate = filterdByStatus.sort((a, b) => {
          let c = new Date(a.updatedDate)
          let d = new Date(b.updatedDate)
          return c - d
        })
        setInvited(filterByDate)
        setFilteredInvited(filterByDate)

      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchInvited();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger])

  const saveInv = () => {
    if (details.first_name && details.last_name && details.status && details.gender) {

      firebase
        .firestore().collection('invited')
        .add(details)
        .then(() => {
          console.log('New Invited SAVED!')
          setRefetchTrigger(prev => !prev)
          cancelUpdateAdd()
        }).catch((error) => {
          console.log(error.message)
        });
    }
  }
  const updateInv = () => {
    if (details.first_name && details.last_name && details.status && details.gender) {

      firebase
        .firestore().collection('invited')
        .doc(details.id)
        .update(details)
        .then(() => {
          console.log('Invited updated!')
          setRefetchTrigger(prev => !prev)
          cancelUpdateAdd()
        }).catch((error) => {
          console.log(error.message)
        });
    }
  }

  const checkPass = (event) => {
    event.preventDefault()
    if (password.toUpperCase() === import.meta.env.VITE_KEY) {
      setPass(prev => !prev)
      setPassword("")
      setWrongPassword("")
    } else {
      setWrongPassword("Wrong passcode!")
    }


  }

  const invEdit = (id) => {


    const existing = invited.find(inv => inv.id === id)
    if (existing) {
      setDetails(existing)
      setEditInv(prev => !prev)
      console.log(existing)
    }
  }

  const cancelUpdateAdd = () => {
    setAddInv(false)
    setEditInv(false)
    setDetails({
      f_name: '',
      l_name: '',
      status: '',
      gender: '',
      remarks: ''
    })
  }

  const deleteInv = () => {
    if (confirm(`Are You Sure You want to Delete! ${details.first_name} ${details.last_name}`)) {
      console.log("Deleted")
      firebase
        .firestore().collection('invited')
        .doc(details.id)
        .delete()
        .then(() => {
          console.log('Invited Deleted!')
          setRefetchTrigger(prev => !prev)
          cancelUpdateAdd()
        }).catch((error) => {
          console.log(error.message)
        });

    } else {
      console.log("Cancel")
    }
  }

  const filteredByStatus = (status) => {
    setFilterByStatus(true)

    setFilteredInvited(invited)

    if (status === 'attending' || status === 'not attending' || status === 'pending') {

      setFilteredInvited(invited.filter(inv => inv.status === status))
    } else {

      setFilteredInvited(invited.filter(inv => inv.side === status))
    }



  }

  return (
    <section name='Kulay' className="flex flex-col justify-between bg-custom2 bg-local bg-[#000] h-screen bg-center bg-cover font-sans">

      <div className="container flex flex-col p-8 gap-2 sm:gap-5 mx-auto md:p-8 max-w-[1200px]">
        <div className='flex flex-col justify-center items-center'>
          <div className="flex flex-col justify-center items-center text-white">
            <a href='/' className="cursor-pointer  rounded px-2 tracking-widest font-bold text-xl ">kev+pam</a>

          </div>
        </div>
        {
          pass
            ?
            <>
              <div className='text-[#727171] flex flex-col sm:flex-row justify-center items-center  text-center text-[15px] sm:text-[20px]  sm:leading-[43px] '>
                <div className="flex justify-between items-center">
                  <p className="text-slate-300 text-3xl">GUESTLIST</p>
                </div>

              </div>

              <div className=" py-2 px-3 flex flex-col sm:flex-row gap-3 justify-between items-center ">
                <div className="flex gap-5 sm:gap-8 items-center font-bold text-gray-500">
                  <p onClick={() => setRefetchTrigger(prev => !prev)}
                    className="cursor-pointer hover:text-[#b97b33] p-2 rounded-full bg-[#f5d3ad] text-[#b97b33] shadow-sm">
                    <FiRefreshCw /></p>
                  <p onClick={() => filteredByStatus('attending')} className="text-xs cursor-pointer">A  <span className="text-green-700  text-sm">{invited.filter(inv => inv.status === 'attending').length}</span></p>
                  <p onClick={() => filteredByStatus('not attending')} className="text-xs cursor-pointer">N <span className="text-red-700  text-sm">{invited.filter(inv => inv.status === 'not attending').length}</span></p>
                  <p onClick={() => filteredByStatus('pending')} className="text-xs cursor-pointer">P <span className="text-orange-700  text-sm">{invited.filter(inv => inv.status === 'pending').length}</span></p>
                  <p onClick={() => setFilterByStatus(false)} className="text-xs cursor-pointer">T <span className="text-blue-700  text-xs">{invited.length}</span></p>
                  <p onClick={() => filteredByStatus('both')} className="text-xs cursor-pointer">SBH <span className="text-pink-700">{invited.filter(inv => inv.side === 'both').length}</span></p>
                  <p onClick={() => filteredByStatus('paula')} className="text-xs cursor-pointer">SP <span className="text-indigo-700  text-sm">{invited.filter(inv => inv.side === 'paula').length}</span></p>
                  <p onClick={() => filteredByStatus('berth')} className="text-xs cursor-pointer">SB <span className="text-purple-700  text-sm">{invited.filter(inv => inv.side === 'berth').length}</span></p>

                </div>
                {editInv
                  ?
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={cancelUpdateAdd}
                      className={!editInv ? `py-2 px-4 text-sm rounded-md  bg-[#db9b51] hover:bg-[#b97b33] text-white shadow-md` : `py-2 px-7 text-sm bg-transparent border-2 border-gray-500 rounded-md text-gray-600 hover:bg-[#db9b51] hover:text-white hover:border-none hover:shadow-md`}>
                      Cancel
                    </button>


                    <button
                      onClick={updateInv}
                      className="py-2 px-4 text-sm rounded-md  bg-blue-800 hover:bg-[#b97b33] text-white shadow-md">
                      Update
                    </button>
                    <button
                      onClick={deleteInv}
                      className="py-2 px-4 text-sm rounded-md  bg-red-700 hover:bg-[#b97b33] text-white shadow-md">
                      Delete
                    </button>

                  </div>
                  :
                  <div className="flex justify-center items-center gap-6">
                    <button
                      onClick={() => setAddInv(prev => !prev)}
                      className={!addInv ? `py-2 px-7 text-sm rounded-md  bg-[#db9b51] hover:bg-[#b97b33] text-white shadow-md` : `py-2 px-7 text-sm bg-transparent border-2 border-gray-500 rounded-md text-gray-600 hover:bg-[#db9b51] hover:text-white hover:border-none hover:shadow-md`}>
                      {addInv ? 'Cancel' : 'Add'}
                    </button>

                    {addInv
                      &&
                      <button
                        onClick={saveInv}
                        className="py-2 px-7 text-sm rounded-md  bg-green-700 hover:bg-[#b97b33] text-white shadow-md">
                        Save
                      </button>
                    }
                  </div>
                }
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="overflow-x-auto h-[330px] sm:h-[400px] w-[300px] sm:w-full  rounded-lg border border-gray-200 bg-white">


                  {addInv || editInv
                    ?
                    <div className="min-w-full p-5 sm:p-10 flex flex-col justify-center items-center gap-3">


                     

                      <label
                        htmlFor="Pangalan"
                        className="block overflow-hidden w-full border border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                      >
                        <span className="text-sm tracking-wider font-medium text-gray-400"> First Name </span>

                        <input
                          id="Pangalan"
                          name="Pangalan"
                          type="text"
                          required
                          className="mt-1 w-full uppercase tracking-widest  border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-xs sm:text-sm"
                          onChange={(e) => setDetails({ ...details, f_name: e.target.value.toLowerCase() })}
                          value={details.f_name}

                        />
                      </label>





                      <label
                        htmlFor="Apelyido"
                        className="relative block w-full overflow-hidden rounded-md border-2 border-gray-500 px-3 pt-3 shadow-sm focus-within:border-[#f7ce9f] focus-within:ring-1 focus-within:ring-[#916533]"
                      >
                        <input
                          id="apelyido"
                          name="apelyido"
                          type="text"
                          placeholder="Apelyido "
                          required
                          className="peer uppercase tracking-widest h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          onChange={(e) => setDetails({ ...details, last_name: e.target.value.toLowerCase() })}
                          value={details.l_name}

                        />

                        <span
                          className="absolute tracking-widest start-3 top-3 -translate-y-1/2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                          Apelyido
                        </span>
                      </label>

                      <div className="w-full">
                        <select
                          name="Status"
                          id="Status"
                          className="mt-1.5 w-full uppercase tracking-widest  text-gray-700 sm:text-sm rounded-md border-2 border-gray-500 px-3 py-3 shadow-sm focus-within:border-[#f7ce9f] focus-within:ring-1 focus-within:ring-[#916533]"
                          onChange={(e) => setDetails({ ...details, status: e.target.value.toLowerCase() })}
                          value={details.status}
                        >
                          <option value="">Status</option>
                          <option value="pending">Pending</option>
                          <option value="attending" >Attending</option>
                          <option value="not attending" >Not Attending</option>
                        </select>
                      </div>
                      <div className="w-full">
                        <select
                          name="Gender"
                          id="Gender"
                          className="mt-1.5 w-full uppercase tracking-widest  text-gray-700 sm:text-sm rounded-md border-2 border-gray-500 px-3 py-3 shadow-sm focus-within:border-[#f7ce9f] focus-within:ring-1 focus-within:ring-[#916533]"
                          onChange={(e) => setDetails({ ...details, gender: e.target.value.toLowerCase() })}
                          value={details.gender}
                        >
                          <option value="">Gender</option>
                          <option value="female" >Female</option>
                          <option value="male" >Male</option>
                        </select>
                      </div>

                      <label
                        htmlFor="Remarks"
                        className="relative block w-full overflow-hidden rounded-md border-2 border-gray-500 px-3 pt-3 shadow-sm focus-within:border-[#f7ce9f] focus-within:ring-1 focus-within:ring-[#916533]"
                      >
                        <input
                          id="Remarks"
                          name="Remarks"
                          type="text"
                          placeholder="Remarks "
                          required
                          className="peer uppercase tracking-widest h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          onChange={(e) => setDetails({ ...details, remarks: e.target.value.toLowerCase() })}
                          value={details.remarks}
                        />

                        <span
                          className="absolute tracking-widest start-3 top-3 -translate-y-1/2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                          Remarks
                        </span>
                      </label>
                      <div className="w-full">
                        <select
                          name="Side"
                          id="Side"
                          className="mt-1.5 w-full uppercase tracking-widest  text-gray-700 sm:text-sm rounded-md border-2 border-gray-500 px-3 py-3 shadow-sm focus-within:border-[#f7ce9f] focus-within:ring-1 focus-within:ring-[#916533]"
                          onChange={(e) => setDetails({ ...details, side: e.target.value.toLowerCase() })}
                          value={details.side}
                        >
                          <option value="">Side</option>
                          <option value="paula" >Paula</option>
                          <option value="berth" >Berth</option>
                          <option value="both" >Both</option>
                        </select>
                      </div>
                    </div>
                    :
                    <>

                      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left bg-[#bd874e] text-white ">
                          <tr>

                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Status
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Confirm Date
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Side
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Remarks
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Gender
                            </th>

                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 text-gray-700">

                          {invited && !filterByStatus
                            && invited.map(inv => (
                              <tr
                                onClick={() => invEdit(inv.id)}
                                className="hover:bg-[#ffe9d3] cursor-pointer" key={inv.id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium capitalize">
                                  {inv.f_name}  {inv.l_name}
                                </td>
                                <td className={inv.status.toLowerCase() == 'attending' ? `whitespace-nowrap px-4 py-2 capitalize text-green-600 font-semibold` : inv.status.toLowerCase() == 'not attending' ? `whitespace-nowrap px-4 py-2 capitalize text-red-600 font-semibold` : `whitespace-nowrap px-4 py-2 capitalize text-orange-600 font-semibold`}>
                                  {inv.status}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 capitalize">{inv.updatedDate}</td>
                                <td className="whitespace-nowrap px-4 py-2 capitalize">{inv.side}</td>
                                <td className="whitespace-nowrap px-4 py-2 capitalize">{inv.remarks}</td>
                                <td className="whitespace-nowrap px-4 py-2 capitalize">{inv.gender}</td>
                              </tr>
                            ))
                          }
                          {invited && filterByStatus
                            && filteredInvited.map(inv => (
                              <tr
                                onClick={() => invEdit(inv.id)}
                                className="hover:bg-[#ffe9d3] cursor-pointer" key={inv.id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium capitalize">
                                  {inv.f_name}  {inv.l_name}
                                </td>
                                <td className={inv.status.toLowerCase() == 'attending' ? `whitespace-nowrap px-4 py-2 capitalize text-green-600 font-semibold` : inv.status.toLowerCase() == 'not attending' ? `whitespace-nowrap px-4 py-2 capitalize text-red-600 font-semibold` : `whitespace-nowrap px-4 py-2 capitalize text-orange-600 font-semibold`}>
                                  {inv.status}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 capitalize">{inv.updatedDate}</td>
                                <td className="whitespace-nowrap px-4 py-2 capitalize">{inv.side}</td>
                                <td className="whitespace-nowrap px-4 py-2 capitalize">{inv.remarks}</td>
                                <td className="whitespace-nowrap px-4 py-2 capitalize">{inv.gender}</td>
                              </tr>
                            ))
                          }


                        </tbody>
                        <thead className="text-left bg-[#bd874e] text-white ">
                          <tr>

                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Status
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Confirm Date
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Side
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Remarks
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium ">
                              Gender
                            </th>

                          </tr>
                        </thead>

                      </table>
                    </>

                  }
                </div>
              </div>
            </>
            :
            <form
              onSubmit={checkPass}
              className="flex flex-col w-64 sm:w-96 p-8 gap-3 sm:gap-5 mx-auto md:p-8 max-w-[1200px]">

              <label
                htmlFor="UserEmail"
                className="block overflow-hidden  border border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
              >
                <span className="text-sm tracking-wider font-medium text-gray-500"> Password </span>

                <input
                  id="Password"
                  name="Password"
                  type="password"
                  // placeholder="Password"
                  required
                  className="mt-1 w-full bg-black text-white tracking-widest  border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-lg sm:text-2xl"
                  onChange={(e) => setPassword(e.target.value)}

                />
              </label>
              <h1 className="text-red-500 text-sm text-center">{wrongPassword}</h1>



              <button
                className="group tracking-widest relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                type="submit"
              >
                <span className="absolute inset-0 border border-slate-600 group-active:border-slate-500"></span>
                <span
                  className="block  border border-slate-600 bg-slate-600 px-12 py-3 transition-transform active:border-slate-500 active:bg-slate-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                >
                  LOGIN
                </span>
              </button>

            </form>
        }




      </div>


      <div className={'p-4 lg:text-base flex justify-center text-[#6d6d6d]'}>
        <a href='https://julbertpruel.netlify.app/' className='text-xs'>
          ⓒ {new Date().getFullYear()} Julbert Pruel
        </a>
      </div>
    </section>
  )
}

export default GuestsList
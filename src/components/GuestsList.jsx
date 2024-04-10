import { useEffect, useState } from "react";
import useApi from "../hooks/useAPI";
import pg from '../assets/pj.png'
import firebase from "../firebase";
import { FiRefreshCw } from "react-icons/fi";
import Guest from "./Guest";

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
  const [search, setsearch] = useState("");

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

        // const filteredBySearch = search &&  filterByDate.filter(guest=> guest.f_name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1) || guest.l_name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
      
        
        setInvited(filterByDate.filter(inv => inv.f_name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1) || inv.l_name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
        setFilteredInvited(filterByDate.filter(inv => inv.f_name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1) || inv.l_name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1)

      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchInvited();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger])

  const saveInv = () => {
    if (details.f_name && details.l_name && details.status && details.gender) {
      setsearch("")
      firebase
        .firestore().collection('guestsList')
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
    setsearch("")
    if (details.f_name && details.l_name && details.status && details.gender) {

      firebase
        .firestore().collection('guestsList')
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
      setWrongPassword("Wrong password!")
    }


  }

  const invEdit = (id) => {
    setsearch("")
    const existing = invited.find(inv => inv.id === id)
    if (existing) {
      setDetails(existing)
      setEditInv(prev => !prev)
      console.log(existing)
    }
  }

  const cancelUpdateAdd = () => {
    setsearch("")
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
    setsearch("")
    if (confirm(`Are You Sure You want to Delete! ${details.f_name} ${details.l_name}`)) {
      console.log("Deleted")
      firebase
        .firestore().collection('guestsList')
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

  const handleSearch = (text) => {
    setsearch(text);
  };



  const filteredByStatus = (status) => {
    setsearch("");
    setFilterByStatus(true)

    setFilteredInvited(invited)

    if (status === 'attending' || status === 'not attending' || status === 'pending') {

      setFilteredInvited(invited.filter(inv => inv.status === status))
    } else {

      setFilteredInvited(invited.filter(inv => inv.side === status))
    }



  }

  const refreshGuestsList = ()=>{
    setsearch("");
    setRefetchTrigger(prev => !prev)
  }

  const tableContent = filteredInvited.map((inv) => <Guest key={inv.id} guests={inv} search={search} invEdit={invEdit} />)

  return (
    <section className="flex flex-col justify-between bg-[#000] h-screen  font-sans">

      <div className="container flex flex-col px-2 sm:px-8 pt-8 sm:pt-8 gap-2 sm:gap-5 mx-auto  max-w-[1200px]">
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

              <div className=" py-2 flex flex-col sm:flex-row gap-3 justify-between items-center ">
                <div className="flex gap-5 sm:gap-8 items-center font-bold text-gray-500">
                  <p onClick={refreshGuestsList}
                    className="cursor-pointer hover:text-gray-400 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-700 shadow-sm">
                    <FiRefreshCw /></p>
                  <p onClick={() => filteredByStatus('attending')} className="text-xs cursor-pointer">A  <span className="text-green-700  text-sm">{invited.filter(inv => inv.status === 'attending').length}</span></p>
                  <p onClick={() => filteredByStatus('not attending')} className="text-xs cursor-pointer">N <span className="text-red-700  text-sm">{invited.filter(inv => inv.status === 'not attending').length}</span></p>
                  <p onClick={() => filteredByStatus('pending')} className="text-xs cursor-pointer">P <span className="text-orange-700  text-sm">{invited.filter(inv => inv.status === 'pending').length}</span></p>
                  <p onClick={() => setRefetchTrigger(prev => !prev)} className="text-xs cursor-pointer">T <span className="text-blue-700  text-xs">{invited.length}</span></p>
                  <p onClick={() => filteredByStatus('pamela')} className="text-xs cursor-pointer">SP <span className="text-indigo-700  text-sm">{invited.filter(inv => inv.side === 'pamela').length}</span></p>
                  <p onClick={() => filteredByStatus('kevin')} className="text-xs cursor-pointer">SK <span className="text-purple-700  text-sm">{invited.filter(inv => inv.side === 'kevin').length}</span></p>

                </div>
                {editInv
                  ?
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={cancelUpdateAdd}
                      className={!editInv ? `py-2 px-4 text-sm rounded-md  bg-[#db9b51] hover:bg-[#b97b33] text-gray-300 shadow-md` : `py-2 px-7 tracking-widest text-sm bg-transparent border-2 border-red-900  text-red-600 hover:bg-red-950 hover:text-gray-300 hover:shadow-md`}>
                      Cancel
                    </button>


                    <button
                      onClick={updateInv}
                      className="py-2 px-4 text-sm tracking-widest  bg-blue-900 hover:bg-blue-800 text-gray-300 shadow-md">
                      Update
                    </button>
                    <button
                      onClick={deleteInv}
                      className="py-2 px-4 text-sm tracking-widest  bg-red-900 hover:bg-red-800 text-gray-300 shadow-md">
                      Delete
                    </button>

                  </div>
                  :
                  <div className="flex justify-center items-center gap-6">
                   {!addInv &&
                   
                    <div className="pr-0 sm:pr-4">
                      <label htmlFor="table-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none shrink-0">
                          <svg
                            className="w-4 h-4  text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            // className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="table-search"
                          className="w-full pl-10 p-2 block py-2 tracking-widest  px-3 text-xs  bg-slate-800 text-gray-100 border  border-gray-800  dark:focus:border-gray-700 outline-none focus:border-gray-300  focus:shadow-sm "
                          placeholder="Search..."
                          value={search}
                          onChange={(e) => handleSearch(e.target.value)}

                        />
                      </div>
                    </div>
                   }
                   
                    <button
                      onClick={() => setAddInv(prev => !prev)}
                      className={!addInv ? `py-2 px-7 text-sm  tracking-widest bg-blue-950 hover:bg-blue-900 text-gray-300 shadow-md` : `py-2 px-7 tracking-widest text-sm bg-transparent border-2 border-red-900  text-red-600 hover:bg-red-950 hover:text-gray-300 hover:shadow-md`}>
                      {addInv ? 'Cancel' : 'Add'}
                    </button>

                    {addInv
                      &&
                      <button
                        onClick={saveInv}
                        className="py-2 px-7 text-sm tracking-widest  bg-green-900 hover:bg-green-800 text-gray-300 shadow-md">
                        Save
                      </button>
                    }
                  </div>
                }
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="overflow-x-auto h-[430px] w-full border border-slate-800 bg-slate-950">


                  {addInv || editInv
                    ?
                    <div className="min-w-full p-5 sm:p-10 flex flex-col text-white justify-center items-center gap-3">




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
                        htmlFor="Apelyido"
                        className="block overflow-hidden w-full border border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                      >
                        <span className="text-sm tracking-widest font-light text-gray-500"> Last Name </span>

                        <input
                          id="apelyido"
                          name="apelyido"
                          type="text"
                          required
                          className="mt-1 w-full uppercase tracking-widest bg-transparent border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 "
                          onChange={(e) => setDetails({ ...details, l_name: e.target.value.toLowerCase() })}
                          value={details.l_name}

                        />
                      </label>

                      <label
                        htmlFor="Status"
                        className="block overflow-hidden w-full border border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                      >
                        <span className="text-sm tracking-widest font-light text-gray-500"> Status </span>

                        <select
                          name="Status"
                          id="Status"
                          className="mt-1.5 w-full uppercase tracking-widest bg-transparent"
                          onChange={(e) => setDetails({ ...details, status: e.target.value.toLowerCase() })}
                          value={details.status}
                        >
                          <option className="text-slate-800" value=""></option>
                          <option className="text-slate-800" value="pending">Pending</option>
                          <option className="text-slate-800" value="attending" >Attending</option>
                          <option className="text-slate-800" value="not attending" >Not Attending</option>
                        </select>
                      </label>

                      <label
                        htmlFor="Gender"
                        className="block overflow-hidden w-full border border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                      >
                        <span className="text-sm tracking-widest font-light text-gray-500"> Gender </span>

                        <select
                          name="Gender"
                          id="Gender"
                          className="mt-1.5 w-full uppercase tracking-widest bg-transparent"
                          onChange={(e) => setDetails({ ...details, gender: e.target.value.toLowerCase() })}
                          value={details.gender}
                        >
                          <option className="text-slate-800" value=""></option>
                          <option className="text-slate-800" value="female" >Female</option>
                          <option className="text-slate-800" value="male" >Male</option>
                        </select>
                      </label>

                      <label
                        htmlFor="Remarks"
                        className="block overflow-hidden w-full border border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                      >
                        <span className="text-sm tracking-widest font-light text-gray-500"> Remarks</span>

                        <input
                          id="Remarks"
                          name="Remarks"
                          type="text"
                          required
                          className="mt-1 w-full uppercase tracking-widest bg-transparent border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 "
                          onChange={(e) => setDetails({ ...details, remarks: e.target.value.toLowerCase() })}
                          value={details.remarks}

                        />
                      </label>

                      <label
                        htmlFor="Side"
                        className="block overflow-hidden w-full border border-gray-500 px-3 py-2 shadow-sm focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-400"
                      >
                        <span className="text-sm tracking-widest text-gray-500"> Side </span>

                        <select
                          name="Side"
                          id="Side"
                          className="mt-1.5 w-full uppercase tracking-widest bg-transparent"
                          onChange={(e) => setDetails({ ...details, side: e.target.value.toLowerCase() })}
                          value={details.side}
                        >
                          <option className="text-slate-800" value=""></option>
                          <option className="text-slate-800" value="pamela" >Pamela</option>
                          <option className="text-slate-800" value="kevin" >Kevin</option>
                        </select>
                      </label>
                    </div>
                    :
                    <>

                      <table className="min-w-full tracking-widest divide-y-2 divide-slate-800 bg-black text-sm">
                        <thead className="text-left bg-slate-900 text-gray-500 ">
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

                        <tbody className="divide-y  divide-slate-800 text-gray-300">

                       

                          {tableContent}


                        </tbody>
                        <thead className="text-left bg-slate-900 text-gray-500 ">
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
              className="flex flex-col w-80 sm:w-96 p-8 gap-3 sm:gap-5 mx-auto md:p-8 max-w-[1200px]">

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



        <div className={' lg:text-base flex justify-center text-slate-700'}>
          <a href='https://julbertpruel.netlify.app/' className='text-xs'>
            ⓒ {new Date().getFullYear()} Julbert Pruel
          </a>
        </div>
      </div>



    </section>
  )
}

export default GuestsList
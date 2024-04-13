import React from 'react'
import { Tooltip } from "@material-tailwind/react";

const Guest = ({ guests, search, invEdit }) => {

  if (guests.f_name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
    guests.l_name.toLowerCase().indexOf(search.toLowerCase()) > -1
  ) {
    return (
      <tr
        onClick={() => invEdit(guests.id)}
        className="hover:bg-slate-800 cursor-pointer" key={guests.id}>
        <td className="whitespace-nowrap px-4 py-2 font-medium capitalize">
          {guests.f_name}  {guests.l_name}
          {
            guests.plus === 'yes'
            && guests.plus1_status === 'attending' 
            &&<span className="whitespace-nowrap ml-1 rounded-full bg-transparent hover:border-slate-200 hover:text-slate-200  border-[1px] border-slate-500  px-1 py-0.5 text-xs text-slate-500">
                +1
              </span>
          }
          {
            guests.plus === 'yes'
            && guests.plus1_status === 'not attending' 
            &&<span className="whitespace-nowrap ml-1 rounded-full bg-transparent hover:border-slate-200 hover:text-slate-200  border-[1px] border-slate-500  px-1 py-0.5 text-xs text-slate-500">
                +0
              </span>
          }
          {
            guests.plus === 'yes'
            && guests.status === 'pending' 
            &&<span className="whitespace-nowrap ml-1 rounded-full bg-transparent hover:border-slate-200 hover:text-slate-200  border-[1px] border-slate-500  px-1 py-0.5 text-xs text-slate-500">
                +1
              </span>
          }

        </td>
        <td className="whitespace-nowrap px-4 py-2 capitalize">
          <span className={guests.status.toLowerCase() == 'attending'
            ? `inline-flex items-center justify-center border-[1px] bg-transparent rounded-full border-emerald-900 px-2.5 py-0.5 text-emerald-200`
            : guests.status.toLowerCase() == 'not attending'
              ? `inline-flex items-center justify-center border-[1px] bg-transparent rounded-full border-red-200 px-2.5 py-0.5 text-red-200`
              : `inline-flex items-center justify-center border-[1px] bg-transparent rounded-full border-amber-200 px-2.5 py-0.5 text-amber-200`}>
            <p className="text-xs"> {guests.status}</p>
          </span>
        </td>
        <td className="whitespace-nowrap px-4 py-2 capitalize">{guests.updatedDate}</td>
        <td className="whitespace-nowrap px-4 py-2 capitalize">{guests.side}</td>
        <td className="whitespace-nowrap px-4 py-2 capitalize">{guests.remarks}</td>
        <td className="whitespace-nowrap px-4 py-2 capitalize">{guests.gender}</td>
      </tr>
    )
  }


}

export default Guest
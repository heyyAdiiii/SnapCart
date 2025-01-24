import React from 'react'
import UserMenu from '../components/userMenu'
import { GrFormClose } from "react-icons/gr";

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2' >
      <button onClick={()=> window.history.back()} className='text-red-700 block w-fit  ml-auto animate-ping'>
      <GrFormClose size={25}/>
      </button>
      <div className='container mx-auto px- pb-8'>
        <UserMenu/>
      </div>
    </section>
  )
}

export default UserMenuMobile

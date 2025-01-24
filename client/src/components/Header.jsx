import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { FaHandPointDown } from "react-icons/fa";
import UserMenu from './userMenu.jsx'
import { FaHandPointUp } from "react-icons/fa";

const header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname=== '/search'
  const navigate = useNavigate();
  const user = useSelector((state)=> state?.user)
  // console.log("User from Store ",user);

  const [openUserMenu,setOpenUserMenu] = useState(false);

  const redirectToLoginPage = () =>{
    navigate('/login')
  }

  const handleCloseUserMenu = () =>{
    setOpenUserMenu(false);
  }
  
  const handleMobileUser = ()=>{
    if(!user._id){
      navigate('/login')
      return
    }
    navigate('/user')
  }
  // handleMobileUser()
  // console.log("isSearchPage :- ",isSearchPage);
  // console.log("Loaction ",location);
  // console.log("isMobile ",isMobile);

  return (
    <header className='h-24 lg:h-20 sticky lg:shadow-md top-0 flex flex-col justify-center gap-1 bg-orange-700'>
      {
        !(isSearchPage && isMobile)&&(
          <div className='container mx-auto items-center  flex  justify-between'>
        {/* Logo */}
        <div className='h-full'>
        <Link to={'/'} className='h-full  flex justify-center items-center'>
          <img 
          src={logo} 
          width={170} 
          height={60} 
          alt="logo" 
          className='hidden lg:block'
          />
          <img 
          src={logo} 
          width={120} 
          height={60} 
          alt="logo" 
          className='lg:hidden'
          />
        </Link>
        </div>
      {/* Search Section */}
      <div className='hidden lg:block'>
        <Search/>
      </div>
      {/* Login and My Cart */}
      <div className=''>
        {/* user icons display only when version is mobile */}
        <button onClick={handleMobileUser} className='text-neutral-800 lg:hidden'>
        <FaUser size={28}/>
        </button>

        {/* Desktop */}
        <div className='hidden lg:flex items-center gap-10'>
          {
            user?._id? (
              <div className='relative'>
                <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-2 cursor-pointer'>
                  <p className='font-semibold text-lg'>Account</p>
                  {
                    openUserMenu?(
                      <FaHandPointDown className='animate-bounce' size={18}/>
                    ):(
                       <FaHandPointUp className='animate-bounce' size={18}/>
                    )
                  }
                </div>
                {
                  openUserMenu&& (
                <div className='absolute right-0 top-12'>
                  <div className='bg-white rounded p-4 min-w-52 lg-shadow-lg'>
                    <UserMenu close={handleCloseUserMenu}/>
                  </div>
                </div>
                  )
                }
              </div>
            ):(
              <button onClick={redirectToLoginPage} className='text-lg px-2 font-semibold '>Login</button>
            )
          }
          <button className='flex items-center gap-2 bg-green-800 px-4 py-3  text-white rounded-md hover:bg-green-700'>
            <div className='animate-bounce'>
              {/* add to Cart Icons */}
              <TiShoppingCart size={35}/>
            </div>
            <div className='font-semibold'>
              <p>My Cart</p>
            </div>
          </button>
        </div>
        <div className='hidden lg:block'>

        </div>
      </div>
    </div>
        )
      }
    <div className='container mx-auto px-2 lg:hidden'>
      <Search/>
    </div>
    </header>
  )
}

export default header

import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { TiShoppingCart } from "react-icons/ti";


const header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname=== '/search'
  const navigate = useNavigate();

  const redirectToLoginPage = () =>{
    navigate('/login')
  }

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
        <button className='text-neutral-800 lg:hidden'>
        <FaUser size={28}/>
        </button>

        {/* Desktop */}
        <div className='hidden lg:flex items-center gap-10'>
          <button onClick={redirectToLoginPage} className='text-lg px-2 '>Login</button>
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

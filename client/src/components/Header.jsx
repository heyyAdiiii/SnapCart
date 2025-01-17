import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { TiShoppingCart } from "react-icons/ti";

const header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();

  const isSearchPage = location.pathname=== '/search'

  // console.log("isSearchPage :- ",isSearchPage);
  // console.log("Loaction ",location);
  // console.log("isMobile ",isMobile);

  return (
    <header className='h-24 lg:h-20 sticky lg:shadow-md top-0 flex flex-col justify-center gap-2 bg-orange-700'>
      {
        !(isSearchPage && isMobile)&&(
          <div className='container mx-auto items-center  flex px-2 justify-between'>
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
        <div className='hidden lg:block'>
          <Link to={'/login'}>Login</Link>
          <button className='flex items-center'>
            <div>
              {/* add to Cart Icons */}
              <TiShoppingCart size={30}/>
            </div>
            <div>
              <p>1 Item</p>
              <p>Total prize</p>
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

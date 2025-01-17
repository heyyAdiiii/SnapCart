import React, { useEffect, useState } from "react";
import { TbShoppingCartSearch } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaBackward } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";

const Search = () => {
    const navigate = useNavigate() // it uses when we wanted to navigate one route to another
    const location = useLocation() // it uses when you want to know which route are currenlty
    const [isSerachPage,setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();
    
    // console.log(location);
    useEffect(()=>{
        const isSearch = location.pathname === '/search'
        setIsSearchPage(isSearch);
    },[location])

    // console.log(isSerachPage);
    
    const redirectToSearchPage = () =>{
        navigate('/search')
    }
  return (
    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg text-neutral-500 border overflow-hidden flex items-center bg-slate-50 group focus-within:border-primary-100">
      <div>
      {
        (isMobile&& isSerachPage)?(
          <Link to={'/'} className="flex justify-center items-center h-full p-2 m-1  group-focus-within:text-primary-100 rounded-full shadow-md">
        <FaBackward size={20}/>
      </Link>
        ):(
          <button className="flex justify-center items-center h-full p-3  group-focus-within:text-primary-100">
        <TbShoppingCartSearch size={25} />
      </button>
        )
      }
      </div>
      <div className="w-full h-full">
        {
            !isSerachPage?(
                <div onClick={redirectToSearchPage} className="w-full h-full flex  items-center text-2xl">
          <TypeAnimation
            preRenderFirstString={true}
            sequence={[
              500,
              "Search Milk", // initially rendered starting point
              1000,
              "Search Sugar",
              1000,
              "Search Panner",
              1000,
              "Search Bread",
              1000,
              "Search Chocolate",
              1000,
              "Search Curd",
              1000,
              "Search Rice",
              1000,
              "Search Honey",
              500,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "1rem" }}
            repeat={Infinity}
          />
      </div>
            ):(
              <div className="w-full h-full">
                <input 
                type="text" 
                placeholder="Search for atta dal and more.."
                autoFocus
                className="bg-transparent w-full h-full outline-none"/>
            </div>
            )
        }
      </div>
    </div>
  );
};

export default Search;

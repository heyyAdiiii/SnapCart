import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios'
import SummaryAPI from '../common/summaryApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { FaLink } from "react-icons/fa";

const UserMenu = ({close}) => {
    const user = useSelector((state)=> state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () =>{
      try {
        const response = await Axios({
          ...SummaryAPI.logout
        })

        console.log(response)

        if(response.data.success){
          if(close){
            close()
          }
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          // window.history.back()
          navigate('/')
        }
      } catch (error) {
        AxiosToastError(error) 
      }
    }

    const handleClose = () =>{
      if(close){
        close()
      }
    }
  return (
    <div className='text-neutral-700'>
        <div className='font-semibold text-black'>My Account</div>
          <div className='text-sm flex item-center gap-1'>
            <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} </span>
            <Link onClick={handleClose} to={'/dashboard/profile'}><FaLink size={18} className='hover:text-blue-600'/></Link></div>

          <Divider/>

          <div className='flex flex-col text-sm gap-2 '>
            <Link onClick={handleClose} to={'/dashboard/myorders'} className='px-2 hover:bg-blue-400'>My Orders</Link>
            <Link onClick={handleClose} to={'/dashboard/address'} className='px-2 hover:bg-blue-400'>Save Address</Link>
            <button onClick={handleLogout}  className='text-left px-2  hover:bg-orange-200'>Log out</button>
          </div>
    </div>
  )
}

export default UserMenu

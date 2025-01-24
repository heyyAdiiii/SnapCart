import React, { useState } from 'react'
import { FaUserTie } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryAPI from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import {updatedAvatar} from '../store/userSlice.js'
import { IoIosClose } from "react-icons/io";

const UserProfileAvatarEdit = ({close}) => {
    const user = useSelector((state)=>state.user);
    const dispatch = useDispatch()
    const [loading,setLoading]= useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    const handleUploadAvatarImage = async (e)=>{
        const file = e.target.files[0];

        // if(!file){
        //     // return
        // }

        const formData = new FormData()
        formData.append('avatar',file);

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryAPI.uploadAvatar,
                data : formData
            })

            const {data:responseData} = response;
            dispatch(updatedAvatar(responseData.data.avatar))
            // console.log(user); 
            // console.log(responseData);
            // console.log(response);
    
        } catch (error) {
            AxiosToastError(error)
            console.log(error);
        }finally{
            setLoading(false);
    }
        
    }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center gap-2'>
            <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
            <IoIosClose size={45}/>
            </button>
            <div className='w-24 h-24 flex  items-center justify-center rounded-lg  overflow-hidden drop-shadow-lg'>
                    {
                      user.avatar ? (
                        <img 
                        src= {user.avatar} 
                        alt={user.name} 
                        className='w-full h-full object-cover'/>
                      ):(
                        <FaUserTie  size={60}/>
                      )
                    }
                  </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="uploadProfile">
                <div className='border  gap-2  border-blue-600 hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer rounded text-sm my-3'>
                    {
                        loading? "Uploading....":" Upload"
                    }
                </div>
                </label>
                <input onChange={handleUploadAvatarImage} type="file" id='uploadProfile'
                className='hidden'
                />
            </form>      
        </div>
    </section>
  )
}

export default UserProfileAvatarEdit

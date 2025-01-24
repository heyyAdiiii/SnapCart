import React, { useState } from 'react'
import { PiEyesBold } from "react-icons/pi";
import { PiEyeClosedDuotone } from "react-icons/pi";
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import SummaryAPI from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetail from '../utils/fetchUserDetails'
import { useDispatch } from 'react-redux';
import {setUserDetails} from '../store/userSlice'

const Login = () => {
    const [data,setData] = useState({
        email:"",
        password:"",
    });
    const [showPassword,setShowPassword] = useState(false);
    const ValidateValue = Object.values(data).every(el => el);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        const {name,value} = e.target;
       // console.log(e.target.name)
        setData((PreviousValue)=>{
            return{
                ...PreviousValue,
                [name]:value
            }
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const responses = await Axios({
                ...SummaryAPI.login,
                data:data
            })

            if(responses.data.error){
                toast.error(responses.data.message)
            }

            if(responses.data.success){
                toast.success(responses.data.message)
                // console.log(responses.data.data)
                localStorage.setItem('accessToken',responses.data.data.accessToken);
                localStorage.setItem('refreshToken',responses.data.data.refreshToken);

                const userDetails = await fetchUserDetail();
                dispatch(setUserDetails(userDetails.data.data));


                setData({
                    email:"",
                    password:"",
                })
                navigate('/')
            }
            
            // console.log("Response",responses);
        } catch (error) {
            AxiosToastError(error);
        }
    }
    // console.log(data);
  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-ful max-w-lg mx-auto rounded p-4'>
            <p className='text-2xl font-mono'>User Login,</p>

            <form onSubmit={handleSubmit} className='grid gap-2 mt-6'>
                <div className='grid gap-1'>
                    <label htmlFor="email" >Email :</label>
                    <input 
                    type="email"
                    id='email'
                    className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-100'
                    placeholder='Enter You Email'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                     />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor="password" >Password : </label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-100' >
                    <input 
                    type={showPassword? "text":"password"}
                    id='password'
                    className='w-full outline-none bg-blue-50 '
                    placeholder='Enter Your Password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                     />
                     <div onClick={()=> setShowPassword(PreviousValue => !PreviousValue)} className='cursor-pointer'>
                        {
                            showPassword?(
                                <PiEyesBold />
                            ):(
                                <PiEyeClosedDuotone />
                            )
                        }
                     </div>
                     </div>
                     <Link to={'/forgot-password'} className='block ml-auto hover:text-blue-700'>Forgot Password ?</Link>
                </div>
                
                <button disabled={!ValidateValue} className={`${ValidateValue?'bg-green-500 hover:bg-green-700':'bg-gray-600'}   text-white py-2 mt-2 my-3 rounded text-lg font-semibold tracking-wider`}>Register</button>
            </form>

            <p>
                Don't have account ? <Link to={'/register'} className='text-blue-500 hover:text-blue-800 font-semibold'>Register</Link>
            </p>
        </div>
    </section>
  )
}

export default Login;
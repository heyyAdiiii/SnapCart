import React, { useState } from 'react'
import { PiEyesBold } from "react-icons/pi";
import { PiEyeClosedDuotone } from "react-icons/pi";
import toast from 'react-hot-toast'
import Axios from '../utils/Axios';
import SummaryAPI from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data,setData] = useState({
        email:"",
        
    });
    const ValidateValue = Object.values(data).every(el => el);
    const navigate = useNavigate();

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
                ...SummaryAPI.forgot_passsword,
                data:data
            })

            if(responses.data.error){
                toast.error(responses.data.message)
            }

            if(responses.data.success){
                toast.success(responses.data.message)
                navigate('/verification-otp',{
                    state:data
                })
                setData({
                    email:"",
                })
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
            <p className='text-2xl font-mono font-bold'>Forgot Password</p>

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
                <button disabled={!ValidateValue} className={`${ValidateValue?'bg-green-500 hover:bg-green-700':'bg-gray-600'}   text-white py-2 mt-2 my-3 rounded text-lg font-semibold tracking-wider`}>Send OTP</button>
            </form>
            <p>
            Already have account ? <Link to={'/login'} className='text-blue-500 hover:text-blue-800 font-semibold'>Login</Link>
            </p>
        </div>
    </section>
  )
}

export default ForgotPassword;
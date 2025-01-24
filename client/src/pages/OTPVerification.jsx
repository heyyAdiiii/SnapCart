import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryAPI from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPVeification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const ValidateValue = data.every((el) => el);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

//   console.log("Location ",location)

   useEffect(()=>{
    if(!location?.state?.email){
        navigate('/forgot-password')
    }
   },[])
   
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responses = await Axios({
        ...SummaryAPI.forgot_passsword_otp_verification,
        data: {
            otp : data.join(""),
            email:location?.state?.email,
        },
      });

      if (responses.data.error) {
        toast.error(responses.data.message);
      }

      if (responses.data.success) {
        toast.success(responses.data.message);
        setData(["", "", "", "", "", ""]);
        navigate('/reset-password',{
          state: {
            data: responses.data,
            email:location?.state?.email,
          }
        });
      }

      // console.log("Response",responses);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  // console.log(data);
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-ful max-w-lg mx-auto rounded p-4">
        <svg fill="#000000" width="80px" height="80px" viewBox="0 0 512 512" className="text-center w-full" xmlns="http://www.w3.org/2000/svg">

<g id="OTP">

<path d="M458.4741,112H265V62.41A31.3815,31.3815,0,0,0,233.5879,31H62.4077A31.3806,31.3806,0,0,0,31,62.41V449.59A31.4379,31.4379,0,0,0,62.4077,481h171.18A31.4388,31.4388,0,0,0,265,449.59V292H458.4771A22.5231,22.5231,0,0,0,481,269.4771V134.5259A22.5257,22.5257,0,0,0,458.4741,112ZM125.5,50.08h45a11.25,11.25,0,0,1,0,22.5h-45a11.25,11.25,0,0,1,0-22.5Zm44.9956,411.7651h-45a11.25,11.25,0,1,1,0-22.5h45a11.25,11.25,0,0,1,0,22.5ZM245.1982,420.25H50.7974V91.75H245.1982V112H125.3149A22.3149,22.3149,0,0,0,103,134.3149V269.6641A22.3357,22.3357,0,0,0,125.3359,292H166v36.1489a11.1221,11.1221,0,0,0,18.9868,7.8643L229,292h16.1982Zm-24.39-210.06a11.3086,11.3086,0,0,1,4.14,15.39,11.198,11.198,0,0,1-15.39,4.14L195.25,221.44V238a11.25,11.25,0,0,1-22.5,0V221.44L158.437,229.72a11.198,11.198,0,0,1-15.39-4.14,11.3164,11.3164,0,0,1,4.14-15.39L161.5,202l-14.313-8.28a11.2689,11.2689,0,0,1,11.25-19.5293L172.75,182.47V166a11.25,11.25,0,0,1,22.5,0v16.47l14.3086-8.2793a11.2689,11.2689,0,0,1,11.25,19.5293L206.5,202Zm108,0a11.3086,11.3086,0,0,1,4.14,15.39,11.198,11.198,0,0,1-15.39,4.14L303.25,221.44V238a11.25,11.25,0,0,1-22.5,0V221.44L266.437,229.72a11.198,11.198,0,0,1-15.39-4.14,11.3164,11.3164,0,0,1,4.14-15.39L269.5,202l-14.313-8.28a11.2689,11.2689,0,0,1,11.25-19.5293L280.75,182.47V166a11.25,11.25,0,0,1,22.5,0v16.47l14.3086-8.2793a11.2689,11.2689,0,0,1,11.25,19.5293L314.5,202Zm108,0a11.3086,11.3086,0,0,1,4.14,15.39,11.198,11.198,0,0,1-15.39,4.14L411.25,221.44V238a11.25,11.25,0,0,1-22.5,0V221.44L374.437,229.72a11.198,11.198,0,0,1-15.39-4.14,11.3164,11.3164,0,0,1,4.14-15.39L377.5,202l-14.313-8.28a11.2689,11.2689,0,0,1,11.25-19.5293L388.75,182.47V166a11.25,11.25,0,0,1,22.5,0v16.47l14.3086-8.2793a11.2689,11.2689,0,0,1,11.25,19.5293L422.5,202Z"></path>

</g>
</svg>
        <p className="text-2xl font-mono font-bold text-center">OTP Verification</p>
        <p className="text-center mt-5">One Time Password(OTP) has been sent via Email to <span className="text-green-500 text-lg font-semibold">{location.state.email}</span></p>
        <form onSubmit={handleSubmit} className="grid gap-2 mt-6">
          <div className="grid gap-1">
            <label htmlFor="otp" className="text-center text-lg">Enter your OTP :</label>
            <div className="flex items-center justify-center gap-2">
              {data.map((element, index) => {
                return (
                  <input
                  key={"otp"+index}
                    type="text"
                    id="otp"
                    ref={(ref)=>{
                        inputRef.current[index] = ref;
                        return ref;
                    }}
                    value={data[index]}
                    onChange={(e)=>{
                        const value = e.target.value;
                        // console.log("value ",value);
                        const newData = [...data];
                        newData[index]=value;
                        setData(newData);

                        if(value && index<5){
                            inputRef.current[index+1].focus()
                        }
                    }}
                    className="bg-blue-50 w-full h-14 max-w-18 p-2 border rounded text-2xl text-center outline-none font-semibold focus-within:border-primary-100"
                    maxLength={1}
                  />
                );
              })}
            </div>
          </div>
          <button
            disabled={!ValidateValue}
            className={`${
              ValidateValue ? "bg-green-500 hover:bg-green-700" : "bg-gray-600"
            }   text-white py-2 mt-2 my-3 rounded text-lg font-semibold tracking-wider`}
          >
            Veify OTP
          </button>
        </form>
        <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="text-blue-500 hover:text-blue-800 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OTPVeification;

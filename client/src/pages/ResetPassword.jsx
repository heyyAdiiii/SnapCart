import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiEyesBold } from "react-icons/pi";
import { PiEyeClosedDuotone } from "react-icons/pi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI from "../common/summaryApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const ValidateValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name)
    setData((PreviousValue) => {
      return {
        ...PreviousValue,
        [name]: value,
      };
    });
  };

  // console.log("Data",data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const responses = await Axios({
        ...SummaryAPI.resetPassword,
        data: data,
      });
      console.log("response ~ ",responses.data.success);

      if (responses.data.error) {
        // console.log("jdo")
        toast.error(responses.data.message);
      }

      if (responses.data.success) {
        console.log(responses.data.message);
        toast.success(responses.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }

      // console.log("Response",responses);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // console.log("Data reset Password", data);
  // console.log("Location ",location);
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-ful max-w-lg mx-auto rounded p-4">
        <p className="text-2xl font-mono font-bold">Reset Your Password</p>

        <form onSubmit={handleSubmit} className="grid gap-2 mt-6">
          <div className="grid gap-1">
            <label htmlFor="newPassword">Enter Your Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-100">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none bg-blue-50 "
                placeholder="Enter Your new Password"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                autoFocus
              />
              <div
                onClick={() =>
                  setShowPassword((PreviousValue) => !PreviousValue)
                }
                className="cursor-pointer"
              >
                {showPassword ? <PiEyesBold /> : <PiEyeClosedDuotone />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">
              Enter Your Confirm Password :
            </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-100">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full outline-none bg-blue-50 "
                placeholder="Enter Your confirm Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                onClick={() =>
                  setShowConfirmPassword((PreviousValue) => !PreviousValue)
                }
                className="cursor-pointer"
              >
                {showConfirmPassword ? <PiEyesBold /> : <PiEyeClosedDuotone />}
              </div>
            </div>
          </div>
          <button
            disabled={!ValidateValue}
            className={`${
              ValidateValue ? "bg-green-500 hover:bg-green-700" : "bg-gray-600"
            }   text-white py-2 mt-2 my-3 rounded text-lg font-semibold tracking-wider`}
          >
            Reset Password
          </button>
        </form>
        <p>
          Already have account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;

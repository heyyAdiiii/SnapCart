import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryAPI from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from '../utils/fetchUserDetails'

const Profile = () => {
  const user = useSelector((state) => state?.user);
  // console.log("profile of user ->" ,user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(()=>{
    setUserData({
        name : user.name,
        email : user.email,
        mobile : user.mobile,
    })
},[user])

  // console.log(userData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    setUserData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.updateUserDetails,
        data: userData
      })
      // console.log(userData);
      const {data:responseData} = response;

      if(responseData.success){
        toast.success(responseData.message);
        const userData2 = await fetchUserDetails()
        console.log(userData2.data.data)
        dispatch(setUserDetails(userData2.data.data))
      }

    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      {/* Profile Photo Upload and Display Profile Photo  */}
      <div className="w-24 h-24 flex items-center justify-center rounded-lg  overflow-hidden drop-shadow-lg">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUserTie size={60} />
        )}
      </div>
      <button
        onClick={() => setProfileAvatarEdit(true)}
        className="text-xs min-w-20 border hover:text-white hover:bg-blue-600  px-4 py-2 rounded-full mt-3"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}

      {/* Name , Mobile ,Email, Change Password */}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="p-2 bg-zinc-300 outline-none border focus-within:border-primary-100 rounded"
            value={userData.name || ""}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            className="p-2 bg-zinc-300 outline-none border focus-within:border-primary-100 rounded"
            value={userData.email || ""}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter Your Mobile"
            className="p-2 bg-zinc-300 outline-none border focus-within:border-primary-100 rounded"
            name="mobile"
            value={userData.mobile || ""}
            onChange={handleOnChange}
            required
          />
        </div>
        <button className="border px-4 py-2 font-semibold border-yellow-400 hover:bg-yellow-400 hover:text-white  ">
          {
            loading? "Uploading...":"Upload"
          }
        </button>
      </form>
    </div>
  );
};

export default Profile;

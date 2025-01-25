import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useEffect } from "react";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI from "../common/SummaryAPI.js";
import EditCategory from "../components/EditCategory.jsx";
import ConfirmBox from "../components/ConfirmBox.jsx";
import toast from "react-hot-toast";

const Category = () => {
  const [openUploadCategory, setOpemUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData,setEditData] = useState({
    name:"",
    image:"",
  })
  const [openConfirmBoxDelete,setOpenConfirmBoxDelete] = useState(false);
  const [DeleteData,setDeleteData] = useState({
    categoryId:"",
    name:"",
    image:"",
  })

const fetchCategory = async () => {
    try {
        setLoading(true);
        const response = await Axios({
            ...SummaryAPI.getCategory,
        });
        const { data: responseData } = response;
        // console.log(response);
        
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async(e)=>{
    try {
        // console.log(DeleteData);
        setOpenConfirmBoxDelete(false)
        const response = await Axios({
            ...SummaryAPI.deleteCategory,
            data:DeleteData,
        })
        const {data:responseData} = response;
        console.log(responseData.success);
        if(responseData.success){
            toast.success(responseData.message)
            fetchCategory()
        }

        if(responseData.error){
            toast.error(responseData.message)
        }
    } catch (error) {
        AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className="p-2  bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpemUploadCategory(true)}
          className="text-sm border border-primary-100 hover:bg-primary-100 hover:text-white px-3 py-1 rounded-md"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}

      <div className=" pt-5  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 place-content-between gap-2 ">
        {categoryData.map((category) => {
         return (
            <div className="w-40 h-56 mb-5 bg-blue-50 rounded-md overflow-hidden  flex-col flex justify-between items-center shadow-lg shadow-zinc-400 ">
              <img
                src={category.image}
                alt={category.name}
                className="w-36 h-48 object-scale-down "
              />
              <div className=" w-full justify-between items-center h-6 flex ">
                <button
                  onClick={() => {setOpenEdit(true)
                    setEditData(category)
                  }}
                  className="flex-1 bg-green-100 text-green-600 font-medium py-1 rounded hover:scale-125"
                >
                  Edit
                </button>
                {/* <button onClick={()=>{setOpenConfirmBoxDelete(true)}} className="flex-1 bg-red-100 text-red-600 font-medium py-1 rounded hover:scale-125">
                  Delete
                </button> */}
                <button onClick={()=>{setDeleteData((prev)=>({
                    ...prev,
                    name:category.name,
                    image:category.image,
                    categoryId:category._id,
                }))
                    setOpenConfirmBoxDelete(true)
                    }} className="flex-1 bg-red-100 text-red-600 font-medium py-1 rounded hover:scale-125">
                  Delete
                </button>
            </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpemUploadCategory(false)}
        />
      )}

      {
        openEdit &&(
            <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}
            />
        )
      }

      {
        openConfirmBoxDelete && (
            <ConfirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
        )
      }
    </section>
  );
};

export default Category;

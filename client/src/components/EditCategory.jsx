import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryAPI from "../common/SummaryAPI";
import uploadImage from "../utils/UploadImage";
import toast from "react-hot-toast";

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
  const [data, setData] = useState({
    categoryId: CategoryData._id,
    name: CategoryData.name,
    image: CategoryData.image,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((previous) => {
      return { ...previous, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryAPI.updateCategory,
        data: data,
      });

      const { data: responseData } = response;
      // console.log(responseData)

      if (responseData.error) {
        toast.error(responseData.message);
      }
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
      // console.log(error)
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setUploading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    // console.log(ImageResponse)

    setData((previous) => {
      return {
        ...previous,
        image: ImageResponse.data.url,
      };
    });

    if (response.data.error) {
      toast.error(response.data.message);
    }
    if (response.data.success) {
      toast.success(response.data.message);
    }
    setUploading(false);
  };
  return (
    <section className="fixed flex items-center justify-center top-0 bottom-0 p-4 left-0 right-0 bg-neutral-500 bg-opacity-65">
      <div className="bg-white max-w-4xl w-full p-4 rounded ">
        <div className="flex items-center justify-between">
          <h1 className="text-red-600 font-bold">Edit Category</h1>
          <button className="w-fit block ml-auto text-red-500" onClick={close}>
            <IoIosClose size={45} />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter Category Name"
              value={data.name}
              name="name"
              className="bg-blue-50 p-2 border border-blue-100 outline-none rounded focus-within:border-primary-100"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>Image</p>
            <div className="flex mb-5 gap-4 flex-col">
              <div className="border  w-36 h-25 rounded-md overflow-hidden flex items-center  justify-center">
                <img
                  src={data.image}
                  className="bg-zinc-800 object-scale-down"
                  alt="No Image"
                />
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    data.name
                      ? "border-primary-100 hover:bg-primary-100 hover:text-white"
                      : "bg-gray-400"
                  } border w-36 py-1 px-2 text-center`}
                >
                {
                    uploading ? ("Uploading..."):("Upload Image")
                }
                </div>
              </label>
              <input
                disabled={!data.name}
                onChange={handleUploadCategoryImage}
                type="file"
                className="hidden "
                id="uploadCategoryImage"
                accept="image/*"
                name="image"
              />
            </div>
          </div>

          <button
            disabled={!data.name}
            className={`${
              data.name
                ? "border-primary-100 hover:bg-primary-100"
                : "bg-gray-400"
            }  border font-semibold py-1`}
          >
            Update Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;

import React from "react";
import { IoIosClose } from "react-icons/io";
import { TbMessageCancel } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
  <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-neutral-800 bg-opacity-65">
    {/* fixed flex items-center justify-center top-0 bottom-0 p-4 left-0 right-0 bg-neutral-500 bg-opacity-65 */}
    <div className="bg-white  max-w-4xl w-full p-4 rounded ">
            <div className="flex items-center justify-between">
              <h1 className="text-red-600 font-bold">Delete Category</h1>
              <button className="w-fit block ml-auto text-red-500" onClick={close}>
                <IoIosClose size={45} />
              </button>
            </div>
                <h1 className="font-mono">Are You Sure want to Delete this category!</h1>
            <div className="m-3 flex gap-5">
                <button onClick={cancel} className="border-2 border-blue-300 py-1 px-2 font-semibold   text-center rounded-md text-blue-600 hover:text-white hover:bg-blue-500"><TbMessageCancel className="inline"/> Cancel</button>
                <button onClick={confirm} className="border-2 border-red-300  px-2 font-semibold rounded-md text-red-600 hover:text-white hover:bg-red-500"><GiConfirmed className="inline"/> Delete</button>
            </div>
          </div>
    </div>
  )
};

export default ConfirmBox;

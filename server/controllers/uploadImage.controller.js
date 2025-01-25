import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImagecController = async (req,res)=>{
    try {
        const file = req.file;

        // console.log(file);

        const uploadImage = await uploadImageCloudinary(file);

        return res.json({
            message:"upload Done!",
            data: uploadImage,
            success:true,
            error:false,
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false,
        })
    }
}

export  default uploadImagecController;
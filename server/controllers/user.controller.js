import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import sendEmail from '../config/sendEmail.js'
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generateOtp from '../utils/generateOTP.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken'

export async function registerUserController(req,res){
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "provide email, name, password",
                error:true,
                success:false
            })
        }

        const user = await UserModel.findOne({email});

        if(user){
            return res.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);

        const payload = {
            name,
            email,
            password:hashPassword
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "verify email from SnapCart",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })
        })

        return res.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message|| error,
            error:true,
            success:false
        })
    }
}

export async function verifyEmailController(req,res){
    try {
        
        const {code} = req.body;

        const user = await UserModel.findOne({_id:code});

        if(!user){
            return res.status(400).json({
                message : "Invalid Code",
                error:true,
                success: false,
            })
        }

        const updateUser = await UserModel.updateOne({_id:code},{verify_email:true});
        
        res.json({
            message:"Verification is Done!",
            success:true,  
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error:true,
            success:false
        })
    }
}

// login controller
export async function loginController(req,res){
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Provide Email Password",
                error:true,
                success:false,
            });
        }

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "User not registered",
                error:true,
                success:false,
            })
        }

        if(user.status !== "Active"){
            return res.status(402).json({
                message : "You Are Suspende/Inactive",
                error:true,
                success:false,
            })
        }

        const chechkPassword = await bcryptjs.compare(password,user.password);

        if(!chechkPassword){
            return res.status(400).json({
                message: "Check Your Password",
                error:true,
                success:false,
            })
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const cookiesOption = {
            httpOnly : true,
            secure: true,
            sameSite:"None"
        }
        res.cookie('token',accessToken,cookiesOption);
        res.cookie('refreshToken',refreshToken,cookiesOption);
        
        return res.json({
            message: "Login Successfully ",
            error : false,
            success:true,
            data :{
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success:false,
        })
    }
}

export async function logoutcontroller(req,res){
    try {
        const userid = req.userId;
        
        const cookiesOption = {
            httpOnly : true,
            secure: true,
            sameSite:"None"
        }
        res.clearCookie('token',cookiesOption);
        res.clearCookie('RefreshToken',cookiesOption)

        const removeRefreshToken = await UserModel.findOneAndUpdate({_id:userid},{refresh_token: ""});

        return res.json({
            message: "Logout SuccessFully",
            error:false,
            success:true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true,
            success:false,
        })
    }
}

export async function uploadAvatar(req,res){
    try {
        const userId = req.userId;
        const image = req.file;

        const upload = await uploadImageCloudinary(image);
        // console.log(image);

        const updateUser = await UserModel.findOneAndUpdate({_id:userId},{
            avatar : upload.url
        });

        return res.json({
            message:"upload profile",
            data: {
                _id : userId,
                avatar: upload.url,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success:false,
        })
    }
}

export async function updateUserDetail(req,res){
    try{

        const userId = req.userId;
        const {name,email,mobile,password} = req.body;

        const hashPassword=""

        if(password){
        const salt = await bcryptjs.genSalt(10);
        hashPassword = await bcryptjs.hash(password,salt);
        }

        const updateUser = await UserModel.updateOne({_id:userId},{
            ...(name && {name:name}),
            ...(email && {email:email}),
            ...(mobile && {mobile:mobile}),
            ...(password && {password:hashPassword})
        })
        
        return res.json({
            message: "User Detail is Updated",
            error:false,
            success:true,
            Data :{
                updateUser
            }
        })
    
    } catch(error){
        return res.status(500).json({
            message: error.message||error,
            error:true,
            success:false
        })
    }
}

export async function forgotPasswordController(req,res){
    try {
        const {email} = req.body;

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"Email is not Found",
                error:true,
                success:false,
            })
        }

        const OTP = generateOtp();
        const expireTime = new Date() + 60 * 60 * 1000 // 1Hr
        const ISOExpireTime = new Date(expireTime).toISOString();

        user.forgot_password_otp = OTP;
        user.forgot_password_expiry = ISOExpireTime;
        await user.save();

        await sendEmail({
            sendTo: email,
            subject : "Forgot Password from SanpCart",
            html: forgotPasswordTemplate({
                name : user.name,
                otp : OTP
            })
        })
    
        return res.json({
            message : "check your email",
            error:false,
            success:true,
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message|| error,
            error:true,
            success:false,
        })
    }
}

export async function verifyForgotPasswordOtp(req,res){
    try {
        const {email,otp} = req.body;

        if(!email || !otp){
            return res.status(400).json({
                message: "Provide required field email , OTP",
                error:true,
                success:false,
            })
        }

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Email not availabe",
                error: true,
                success: false,
            })
        }

        const currentTime = new Date();

        if(user.forgot_password_expiry < currentTime.toISOString){
            return res.status(400).json({
                message: "OTP is Expied!",
                error:true,
                success:false
            })
        }

        if(otp !== user.forgot_password_otp){
            return res.status(400).json({
                message:"Invalid OTP",
                error:true,
                success:false
            })
        }

        // If OTP is not expired && OTP is Correct
        user.forgot_password_otp= null;
        await user.save();
        return res.json({
            message: "Verify OTP Successfully",
            error:false,
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message||error,
            error:true,
            success:false
        })
    }
}

export async function resetPassword(req,res){
    try {
        const {email,newPassword,confirmPassword}= req.body;

        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message: "provide required fields email, newPassword, confirmPassword",
                error:true,
                success:false,
            })
        }

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Email is not available",
                error:true,
                success:false,
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: "Both Password doesn't Match",
                error:true,
                success:false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword,salt);

        user.password= hashPassword;
        user.forgot_password_otp=null;
        user.forgot_password_expiry=null;
        user.save();

        return res.json({
            message:"Password is Updated Successfully",
            error:false,
            success:true,
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message|| error,
            error: true,
            success:false
        })
    }
}

export async function refreshToken(req,res){
    try {
        const refreshToken = req.cookies.refreshToken || req?.head?.authorization?.split(" ")[1]; // [  Bearer ,Token]\
        console.log(req);
        if(!refreshToken){
            return res.status(401).json({
                message:"Token is Expired!",
                error:true,
                success:false
            })
        }
        
        const verifyToken = await jwt.verify(refreshToken,process.env.SECRT_KEY_REFRESH_TOKEN);

        if(!verifyToken){
            return res.status(401).json({
                message:"Refresh Token is Expired",
                error:true,
                success:false
            })
        }
        
        const userId = verifyToken?.id;

        const newAccessToken = await generateAccessToken(userId);
        const cookiesOption = {
            httpOnly : true,
            secure: true,
            sameSite:"None"
        }
        
        res.cookie('accessToken',newAccessToken,cookiesOption);

        return res.json({
            message: "New Access Token Generated",
            error:false,
            success:true,
            data:{
                accessToken :newAccessToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
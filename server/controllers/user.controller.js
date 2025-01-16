import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import sendEmail from '../config/sendEmail.js'
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';

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
        res.cookie('RefreshToken',refreshToken,cookiesOption);
        
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
        const image = req.file;

        console.log(image);

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success:false,
        })
    }
}
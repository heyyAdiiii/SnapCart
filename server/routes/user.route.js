import {Router} from 'express';
import {registerUserController,verifyEmailController,loginController, logoutcontroller, uploadAvatar,updateUserDetail, forgotPasswordController, verifyForgotPasswordOtp, resetPassword, refreshToken, userDetails} from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const userRouter = Router();

userRouter.get('/',(req,res)=>{
    res.json({
        message: "Success"
    })
})
userRouter.post('/register',registerUserController);
userRouter.post('/verify-email',verifyEmailController);
userRouter.post('/login',loginController);
userRouter.get('/logout',auth,logoutcontroller);
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar);
userRouter.put('/update-user',auth,updateUserDetail);
userRouter.put('/forgot-password',forgotPasswordController);
userRouter.put('/verify-forgot-password',verifyForgotPasswordOtp);
userRouter.put('/reset-password',resetPassword);
userRouter.post('/refresh-token',refreshToken);
userRouter.get('/user-details',auth,userDetails);

export default userRouter;
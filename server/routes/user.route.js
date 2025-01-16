import {Router} from 'express';
import {registerUserController,verifyEmailController,loginController, logoutcontroller, uploadAvatar} from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const userRouter = Router();

userRouter.get('/',(req,res)=>{
    res.json({
        message: "Success"
    })
})
userRouter.post('/register',registerUserController);
userRouter.post('verify-email',verifyEmailController);
userRouter.post('/login',loginController);
userRouter.get('/logout',auth,logoutcontroller);
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar);

export default userRouter;
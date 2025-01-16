import {Router} from 'express';
import {registerUserController} from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/',(req,res)=>{
    res.json({
        message: "Success"
    })
})
userRouter.post('/register',registerUserController);

export default userRouter;
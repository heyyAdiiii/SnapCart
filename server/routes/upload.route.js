import {Router} from 'express'
import auth from '../middleware/auth.js'
import uploadImagecController from '../controllers/uploadImage.controller.js'
import upload from '../middleware/multer.js';

const uploadRouter = Router()

uploadRouter.post('/upload',auth,upload.single('image'),uploadImagecController);

export default uploadRouter
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js'

const generateRefreshToken = async(data)=>{
    const token = await jwt.sign({id:data},
            process.env.SECRT_KEY_REFRESH_TOKEN,
            { expiresIn: '7d'}
        )

        const updateRefreshTokenUser = await UserModel.updateOne(
            {_id:data},
            {
                refresh_token:token
            }
        )

        return token;
}

export default generateRefreshToken;
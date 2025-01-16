import jwt from 'jsonwebtoken';

const generateAccessToken = async (data)=>{
    const token = await jwt.sign({id:data},
        process.env.SECRT_KEY_ACCESS_TOKEN,
        { expiresIn: '5h'}
    )

    return token;
}

export default generateAccessToken;
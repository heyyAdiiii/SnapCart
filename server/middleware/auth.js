import jwt from 'jsonwebtoken';

const auth = async(req,res,next) =>{
    try {
        const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1];
        // console.log('token',token);

        const decode = await jwt.verify(token,process.env.SECRT_KEY_ACCESS_TOKEN)

        if(!decode){
            return response.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }
        req.userId = decode.id;
        next();
    } catch (error) {
        return res.json({
            message:error.message||error,
            error:true,
            success:false,
        })   
    }
}

export default auth;
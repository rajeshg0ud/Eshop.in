import jwt from 'jsonwebtoken'


const generateToken= (res, userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
        })

        //set token through server as http cookie, not directly to client local storgae
        res.cookie('jwt', 
            token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 30* 34* 60* 60* 1000,//30days
            }
        )
}

export default generateToken;
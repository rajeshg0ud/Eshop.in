import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'


const protect= asyncHandler(async (req, res, next)=>{

    let token;

    token= req.cookies.jwt;

    if(token){
        try{
            const decoded= jwt.verify(token, process.env.JWT_SECRET);
            req.user= await User.findById(decoded.userId).select('-password');// here we are finding the user by token and 
                                                                            //assigning the user id for frontend purspose
            next()
        }
        catch(err){
            res.status('401')
            throw new Error('not authorized , token failed')
        }
    }
    else{
        res.status('401')
        throw new Error('not authorized , no token')
    }

})

const admin= (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status('404')
        throw new Error('not authorized not an admin')

    }
}

export {admin, protect};
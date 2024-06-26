import asyncHandler from "../middleWare/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import  generateToken  from "../utils/generateToken.js";

//Login  /POST /api/users/login
const authUser= asyncHandler(async(req, res, next)=>{
    const {emailId, password}= req.body;

    const user= await User.findOne({emailId});

    if(user && (await user.matchPassword(password))){
       generateToken(res, user._id);

        res.json(

           { 
            _id: user._id,
            name: user.name,
            emailId: user.emailId,
            isAdmin: user.isAdmin
           }
        )
    }
    else{
        res.status('404');
        throw new Error('Invalid email or password')
    }
    res.send('its login time mawa!')

});

//register /POST /api/users/ 
const registerUser= asyncHandler(async(req, res, next)=>{
    const { name, emailId, password}= req.body;

    const userExists= await User.findOne({emailId})

    if(userExists){
        res.status(401)
        throw new Error('User already exists!')
    }

    const registerUser=await User.create({name, emailId, password});

    if(registerUser){
        generateToken(res, registerUser._id)
        res.status(201)
        res.json({
            id: registerUser._id,
            name: registerUser.name,
            emailId: registerUser.emailId,
            password: registerUser.password
        })
    }
    else{
        res.status('404');
        throw new Error('Invalid user data')
    }
    res.send('its register time mawa!')
});

//logout private /post
const logoutUser= asyncHandler(async(req, res, next)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),

    })

    res.status(200)
    res.json('user logged out!')
});

//getProfile /get
const getProfile= asyncHandler(async(req, res, next)=>{
    
    const user= await User.findById(req.user._id)

    if(user){
        res.json({
            id: user._id,
            name: user.name,
            emailId: user.emailId,
            password: user.password
        })
    }
    else{
        res.status('404');
        throw new Error(' not logged in, please do login and try')
    }

});

//updateProfile /put
const updateProfile= asyncHandler(async(req, res, next)=>{
    const user= await User.findById(req.user._id)

    if(user){
        user.name= req.body.name || user.name;
        user.emailId= req.body.emailId || user.emailId

        if(req.body.password){
            user.password= req.body.password || user.password 
        }

        const updatedUser= await user.save();

        res.status(200)
        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            emailId: updatedUser.emailId,
            password: updatedUser.password
        })
    }
    else{
        res.status('404');
        throw new Error(' not logged in, please do login and try')
    }
});

//getUserbyId /private/admin
const getUserbyId= asyncHandler(async(req, res, next)=>{
    res.send('its getUserbyId time mawa!')
});

//getUsers /private/admin
const getUsers= asyncHandler(async(req, res, next)=>{
    res.send('its getUsers time mawa!')
});

//deleteUsers /private/admin
const deleteUser= asyncHandler(async(req, res, next)=>{
    res.send('its deleteUser time mawa!')
});

//updateUser /private/admin /put
const updateUser= asyncHandler(async(req, res, next)=>{
    res.send('its updateUser time mawa!')
});

export {authUser, registerUser, logoutUser, getProfile, updateProfile, getUsers, getUserbyId, deleteUser, updateUser}


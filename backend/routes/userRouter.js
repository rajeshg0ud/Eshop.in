import express from 'express';
import {authUser, registerUser, logoutUser, getProfile, updateProfile, getUsers, getUserbyId, deleteUser, updateUser} from '../controller/userController.js'
import { protect, admin } from '../middleWare/authMiddleware.js';
const userRouter= express.Router();

userRouter.route('/').post(registerUser).get(protect, admin, getUsers);

userRouter.post("/logout", logoutUser);

userRouter.post("/auth", authUser);

userRouter.route("/profile").get(protect, getProfile).put(protect, updateProfile); 
userRouter.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserbyId).put(protect, admin, updateUser);

export default userRouter;
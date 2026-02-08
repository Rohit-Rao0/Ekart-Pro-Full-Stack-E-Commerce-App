import express from 'express';
import { register, verify, reVerify, login, logout, forgetPassword, verifyOTP, changePassword, allUser,getUserById } from '../controller/userController.js';
import { isAuthenticated,isAdmin } from '../middleware/isAuthenticated.js';


const router=express.Router();
console.log("User routes loaded");

router.post('/register',register)
router.post('/verify',verify)
router.post('/reVerify',reVerify)
router.post('/login',login)
router.post('/logout', isAuthenticated, logout) 
router.post('/forgotPassword', forgetPassword)
router.post("/verifyOTP", verifyOTP);
router.post("/changePassword/:email", changePassword);
router.get('/allUser',isAuthenticated,isAdmin, allUser)
router.get('/getUserById/:userId', getUserById)


export default router;
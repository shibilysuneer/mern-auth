import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test = (req,res) => {
    res.json({
       message:'API working'  
    })
}
//update user

export const updateUser = async(req,res,next) => {
    if(req.user.id !==req.params.id){
        // return res.status(401).json('you can update only your account')
        return next(errorHandler(401,'you can update only your account'));
    }
    try {
       if(req.body.password){
        req.body.password =  bcryptjs.hash(req.body.password,10)
       } 
       const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
           $set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            profilePicture:req.body.profilePicture,

           } 
        },
        {new:true}
       );
       const {password,...rest} = updatedUser._doc
       res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"

export const getUsers = async(req,res,next) =>{
    try {
        const userList = await User.find({},{password:0})
        console.log(userList);
        return res.status(200).json(userList)
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req,res,next) => {
    try {
        const userId =req.params.id;
        const user = await User.findById({_id:userId},{password:0})
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

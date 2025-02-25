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

// export const getUser = asyn

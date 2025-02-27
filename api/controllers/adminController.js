import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

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

export const createUser = async(req,res,next) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        console.log('body::=',req.body);
        if(!username || !email || !password){
            return  next(errorHandler(400,"All fields are required"));
            
        }
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return next(errorHandler(400, "Email already exists"));
            }
            if (existingUser.username === username) {
                return next(errorHandler(400, "Username already exists"));
            }      
         }
    
    const hashedPassword =  bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
      });
      await newUser.save();
      console.log('newOne=',newUser);
      
      res.status(201).json({ success: true, message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Error creating user:", error);
        next(errorHandler(500,"Server error"))
    }
}
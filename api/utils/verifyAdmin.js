import { errorHandler } from "./error.js";

export const verifyAdmin = async(req,res, next)=>{

    console.log("User Data:", req.user); 
    
    if(!req.user) return next(errorHandler(401,'User not authenticated'))
        if(!req.user.isAdmin)
            return next(errorHandler(403,'Access denied!'));

    next();
} ;     
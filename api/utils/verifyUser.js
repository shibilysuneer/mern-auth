import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verifyToken = (req,res,next) =>{
    console.log('coockies=',req.cookies);
    console.log('body=',req.body);
    
    const token = req.cookies.access_token ;

         
    console.log("Received token:", token);

    if(!token) return next(errorHandler(401,'You are not authenticated'))

        jwt.verify(token,process.env.JWT_SECRET,(err , user) =>{
            if(err) return next(errorHandler(403,'token not valid'))

                req.user = user;
                next();
        })
}
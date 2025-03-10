import express from 'express';
import { google, signin, signup,signout, adminSignIn } from '../controllers/authController.js';


const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout',signout)
router.post('/admin/signin',adminSignIn)

export default router;
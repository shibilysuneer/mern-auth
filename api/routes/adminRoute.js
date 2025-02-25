import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { getUser, getUsers } from '../controllers/adminController.js';


const router = express.Router();

router.use(verifyToken);
// router.use(verifyAdmin);

router.get('/users',verifyToken,getUsers)
router.get('/users/:id',verifyToken,getUser)

export default router;
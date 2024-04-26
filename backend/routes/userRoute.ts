import express from 'express'
import { signUp,login,auth,logout, editUser,getUser } from '../controllers/userController';
import {authenticateAdmin, authenticateUser} from '../middleware/authMiddleware';
import { uploadProfile } from '../middleware/multerMiddleware';

const router = express.Router();

// router.post('/auth',authUser)
router.get('/auth',authenticateUser, auth);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/edit-user',uploadProfile, editUser);
router.post('/logout', logout);
router.post('/get-user', getUser);


    
export default router;
import express from 'express'
import { signUp,login,auth,logout, editUser,getUser } from '../controllers/userController';
import {authenticateAdmin, authenticateUser} from '../middleware/authMiddleware';
import {upload} from '../middleware/multerMiddleware';

const router = express.Router();

// router.post('/auth',authUser)
router.get('/auth',authenticateUser, auth);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/edit-user',upload.single('image'), editUser);
router.post('/logout', logout);
router.post('/get-user', getUser);


    
export default router;
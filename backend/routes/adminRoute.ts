import express from 'express'
import { getUser,adminLogin,auth,editUser,deleteUser,addUser } from '../controllers/adminController';
import {authenticateAdmin, authenticateUser} from '../middleware/authMiddleware';
import { upload } from '../middleware/multerMiddleware';

const router = express.Router();

router.get('/get-user', getUser);
router.post('/login', adminLogin);
router.get('/auth-admin',authenticateAdmin, auth);
router.put('/edit-user',upload.single('image'), editUser);
router.delete('/delete-user/:id', deleteUser);
router.post('/add-user',upload.single('image'),addUser);


export default router;
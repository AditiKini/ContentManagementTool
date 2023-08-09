import express from 'express';
import {userSignUp, loginUser} from '../controller/user_controller.js';
import {uploadFile, getImage} from '../controller/imgae_controller.js';
import {savingPost, getAllPosts, getPost, updatePost, deleteBlog} from '../controller/post_controller.js';
import upload from '../utils/upload.js';
import { authenticateToken } from '../controller/jwt_controller.js';
import { addComments , getComments, deleteComment} from '../controller/comment_controller.js';



const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', loginUser);

router.post('/file/upload',upload.single('file') ,uploadFile);
router.get('/file/:filename', getImage);

router.post('/save', authenticateToken, savingPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deleteBlog);
router.post('/comment/new', authenticateToken, addComments);
router.get('/comments/:id', authenticateToken, getComments );
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;

//router takes three argument 1.routing URL 2.Middleware 3.API function
//GridfS strorage engine for Multer to store uploaded files directly to MongoDB
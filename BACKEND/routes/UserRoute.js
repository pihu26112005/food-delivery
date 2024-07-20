import  { userLogin, userRegister , verifyToken} from "../controllers/UserControllers.js";
import express from 'express';

const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);
userRouter.post('/verify', verifyToken);

export default userRouter;
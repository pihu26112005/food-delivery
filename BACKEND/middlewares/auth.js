import jwt from 'jsonwebtoken';


const authMiddleware = (req, res, next) => {
    const token = req.headers['token'];
    if(!token) {
        return res.status(400).json({success:false,msg: "Authorization denied"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userID = decoded.id;
        next();
    }
    catch(err) {
        return res.status(400).json({success:false,msg: "Invalid token",error:err})
    }
}

export default authMiddleware;
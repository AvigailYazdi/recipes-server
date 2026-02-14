import jwt from "jsonwebtoken";
import "dotenv/config";

export const optionalAuth = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract "Bearer TOKEN"
    if (!token) {
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
} 
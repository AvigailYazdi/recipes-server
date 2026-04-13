export const requireAdmin = (req, res, next) => {
    if (req.user.role !== "מנהל") {
        return res.status(403).json({ message: "Administrator access only" });
    }
    next();
}
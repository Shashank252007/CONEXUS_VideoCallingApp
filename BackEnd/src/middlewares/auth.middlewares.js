
//Copilot suggested fix for the error: TypeError: req.auth(...).isAuthenticated is not a function
export function protectRoute(req, res, next) {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}
// ...existing code...
const admin = require("../firebase");

const authenticate = async (req, res, next) => {
    if (process.env.TYPE === "personal") {
        return next(); 
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; 
        console.log("Token received:", token);
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded token:", decodedToken); //decoded token

        req.user = decodedToken; 
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = authenticate;

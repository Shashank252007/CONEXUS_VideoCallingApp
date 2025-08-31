import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async ( req , res) => {
    try {
        const userId = req.auth().userId;
        console.log("User ID for Stream token:", userId);
        if (!userId) throw new Error("No userId found in auth");

        const token = await generateStreamToken(userId);
        res.status(200).json({token});
    } catch (error) {
        console.error("Failed to get Stream Token : ", error);
        res.status(401).json({ message : "Failed to get stream token" });
    }
}

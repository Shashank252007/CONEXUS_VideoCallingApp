import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async ( req , res) => {
    
    try {
        
        
        console.log("User ID:", req.auth().userId);
        const token = await generateStreamToken(req.auth().userId);
        res.status(200).json({token});

    } catch (error) {
        console.error("Failed to get Stream Token : ",error);
        res.status(401).json(
            { message : "Failed to get stream token", }
        )
    }
}

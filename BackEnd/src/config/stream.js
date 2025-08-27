import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY , ENV.STREAM_API_SECRET);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted Successfully : ", userData.name);

        return userData;
        
    } catch (error) {
        console.error("Error in upserting Stream User : ",error);
        return null;
    }
};

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId)
        console.log("User Delete Successfully");
    } catch (error) {
        console.error("Error in deleting user : ",error);
    }
}

export const generateStreamToken = async (userId) => {
    try {
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.log("Error Generating Stream Token");
        return null;
    }
}






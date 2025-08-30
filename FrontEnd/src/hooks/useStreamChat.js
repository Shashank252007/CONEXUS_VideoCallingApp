import { useState , useEffect, Component } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import {useQuery} from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";
import * as Sentry from "@sentry/react";

const STREAM_API_KEY = import.meta.vite.VITE_STREAM_API_KEY;

export const useStreamChat = () => {
    const {user} = useUser();
    const [chatClient , setChatClient] = useState(null);

    //fetching token using tanStackQuery
    const {data , isLoading , error} = useQuery({
        queryKey : ["streamToken"],
        queryFn : getStreamToken,
        enabled : !!user?.id,
    });

    useEffect( () => {
        let cancelled = false;
        const initChat = async () => {

            try {
                const client = StreamChat.getInstance(STREAM_API_KEY);
                

                await client.connectUser({
                    id : user.id,
                    fullName : user.fullName,
                    image : user.imageUrl
                });
                if(!cancelled) setChatClient(client);
                
            } catch (error) {

                console.log("Error connect to stream : " , error);
                Sentry.captureException(error , {
                    tags : {component : "useStreamChat"},
                    extra : {
                        context : "stream_chat_connection",
                        userId : user?.id,
                        streamApiKey : STREAM_API_KEY ? "present" : "missing",
                    },
                });

            }
            
        }

        initChat();

        return () => {
            cancelled = true;
            if(chatClient){
                chatClient.disconnectUser();
            }
        }
    } , [data , user]);
    
    return {chatClient , isLoading , error};
}
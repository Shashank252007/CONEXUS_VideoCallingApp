import React, { useEffect } from 'react'
import { UserButton } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useStreamChat } from '../hooks/useStreamChat.js';
import PageLoader from '../components/PageLoader.jsx';
import '../styles/stream-chat-theme.css';
//import CustomChannelHeader from '../components/CustomChannelHeader.jsx';
import CustomChannelPreview from '../components/CustomChannelPreview.jsx';
import UsersList from '../components/UsersList.jsx';
import CreateChannelModal from '../components/CreateChannelModal.jsx';

import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { HashIcon, PlusIcon, UsersIcon } from "lucide-react";


export default function HomePage() {

   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [activeChannel , setActiveChannel] = useState(null);
  const [searchParams , setSearchParams] = useSearchParams();

  const {chatClient , isLoading , error} = useStreamChat();

  useEffect( () => {
    if(chatClient){
        const channelId = searchParams.get("channel");
        if(channelId){
            const channel = chatClient.channel("messaging" , channelId);
            setActiveChannel(channel);
        }
    }

  } , [chatClient , searchParams]);

  // // todo : make a better error notification using react-hot-toast
  if(error) return <p>Error loading chat client</p>;
  if(isLoading || !chatClient){
    console.log("isLoading : ",isLoading);
    console.log("chatClient : ",chatClient);
    return (<PageLoader />);
  } 


  return (
    <div className="chat-wrapper">
      <Chat client={chatClient}>
        <div className="chat-container">
          {/* Left  Side bar*/}
          <div className="str-chat__channel-list">
            <div className="team-channel-list">
              {/* Header */}
              <div className="team-channel-list__header gap-4">
                <div className="brand-container">
                  <img src="/logo.png" alt="Logo" className="brand-logo" />
                  <span className="brand-name">Slap</span>
                </div>
                <div className="user-button-wrapper">
                  <UserButton />
                </div>
              </div>
              {/*End of Header */}

              {/*Add channel button*/}
               <div className="team-channel-list__content">
                <div className="create-channel-section">
                  <button onClick={() => setIsCreateModalOpen(true)} className="create-channel-btn">
                    <PlusIcon className="size-4" />
                    <span>Create Channel</span>
                  </button>
                </div>
                </div>
              {/* End of Add channel button*/}
            </div>
          </div>
          {/* End of left side bar */}

          {/* Right side */}
          <div className="chat-main">
            <Channel channel={activeChannel}>
              <Window>
                {/* <CustomChannelHeader /> */ }
                <MessageList/>
                <MessageInput />
              </Window>
              <Thread />  
            </Channel>
          </div>
        </div>
        {isCreateModalOpen && (
          <CreateChannelModal
            onClose={() => setIsCreateModalOpen(false)}
          />
        )}
      </Chat>
    </div>
  );
}



 

"use client";

import { useState, useEffect, useRef, useContext } from "react";
import ChatComponent from "@/components/chatbox/ChatBox";
import TopImage from "@/components/subNavBar/gallery/TopImage";
import UserInput from "@/components/UserInput";
import { AppContext } from "@/providers";
import BackButton from "@/components/chatbox/BackButton";

type Message = {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  userIcon?: string;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { appData } = useContext(AppContext);

  useEffect(() => {
    if (appData?.card) {
      setMessages([]);
    }
  }, [appData]);

  return (
    <div className="flex-1 relative grow overflow-x-auto block lg:flex lg:flex-col bg-neutral-50 max-h-[100vh]">
      <div className="scrollbar-gutter-both-edges relative h-full overflow-y-auto overflow-x-hidden">
        <BackButton />
        <ChatComponent messages={messages} />
        <UserInput messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

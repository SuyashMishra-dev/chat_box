import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import TopImage from "../subNavBar/gallery/TopImage";

type Messages = {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  userIcon?: string;
}[];

const ChatComponent = ({ messages }: { messages: Messages }) => {
  const chatEndRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const renderMessages = () => {
    let lastDate: any = null;
    return messages.map((message, index) => {
      // Get today's date
      const currentDate = new Date(message.timestamp);
      const messageDate = currentDate.toDateString();
      const todayDate = new Date().toDateString();
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const isYesterday = messageDate === yesterdayDate.toDateString();

      let dateLabel = "";
      if (messageDate === todayDate) {
        dateLabel = "Today";
      } else if (isYesterday) {
        dateLabel = "Yesterday";
      } else if (messageDate !== lastDate) {
        dateLabel = currentDate.toLocaleDateString();
      }

      const renderDivider = messageDate !== lastDate && dateLabel;

      lastDate = messageDate;

      return (
        <React.Fragment key={message.id}>
          {renderDivider && index ? <Divider text={dateLabel} /> : null}
          {message.user === "assistant" ? (
            <ChatBubble text={message.text} />
          ) : (
            <UserMessage text={message.text} />
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="relative grow overflow-x-auto lg:flex lg:flex-col">
      <div className="relative flex flex-col overflow-hidden sm:overflow-x-visible h-full grow">
        <div className="relative w-full mx-auto xl:max-w-[40rem]">
          <div className="absolute w-full bg-gradient-to-t from-neutral-50 to-transparent lg:h-[50px] lg:bg-gradient-to-b lg:from-neutral-50 lg:to-transparent z-10 h-[50px]"></div>
        </div>
        <div className="relative grow overflow-y-hidden">
          <div className="h-full" style={{ opacity: 1 }}>
            <div className="scrollbar-gutter-both-edges relative h-[84vh] overflow-y-auto overflow-x-hidden">
              <div className="t-body-chat relative h-full space-y-6 px-5 text-primary-700 w-full mx-auto xl:max-w-[40rem]">
                {/* Content */}
                <div className="hidden lg:block relative h-8 shrink-0 xl:h-12 z-30"></div>
                <div className="space-y-6 pt-20" style={{ opacity: 1 }}>
                  <TopImage />
                  {renderMessages()}
                  <div ref={chatEndRef} autoFocus={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBubble = ({ text }: { text: string }) => (
  <div className="break-anywhere">
    <div className="flex items-center">
      <div className="w-full">
        <div className="whitespace-pre-wrap mb-4 font-medium text-[22px] text-primary-700 last:mb-0">
          <ReactMarkdown className="overflow-auto hide-scrollbar">
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  </div>
);

const UserMessage = ({ text }: { text: string }) => (
  <div className="flex justify-end break-anywhere">
    <div className="max-w-[83%] space-y-1 whitespace-pre-wrap">
      <div className="rounded-[10px] font-medium text-[22px] text-primary-700 bg-neutral-200 p-3 ml-auto w-fit max-w-full">
        <ReactMarkdown className="overflow-auto hide-scrollbar">
          {text}
        </ReactMarkdown>
      </div>
    </div>
  </div>
);

const Divider = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center pt-6">
    <div className="h-[1px] bg-[#a69986] grow"></div>
    <span className="t-action-s px-3 font-medium text-[#a69986]">{text}</span>
    <div className="h-[1px] bg-[#a69986] grow"></div>
  </div>
);

export default ChatComponent;

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { toast } from "./ui/use-toast";
import { AppContext } from "@/providers";

type Message = {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  userIcon?: string;
};

const UserInput = ({
  setMessages,
  messages,
}: {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(1);
  const LINE_HEIGHT = 32;
  const { appData, setAppData } = useContext(AppContext);

  const calculateRows = (value: string) => {
    const lineCount = value.split("\n").length; // Count lines based on `\n`
    return Math.max(lineCount, 1); // At least 1 row
  };

  const handleInputChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = ev.target.value;
    if (!newValue.trim() && !inputValue) return;
    setInputValue(newValue);
    const newRows = calculateRows(newValue);
    setRows(newRows);
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      user: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setRows(1);
    setAppData({ ...appData, card: null });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((msg) => ({
              role: msg.user === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: inputValue },
          ],
        }),
      });

      if (!response.body) {
        console.error("No response body found.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let assistantMessage = "";

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk
          .split("\n")
          .filter((line) => line.trim().startsWith("data: "));

        for (const line of lines) {
          const data = line.replace(/^data: /, "").trim();
          if (data === "[DONE]") {
            done = true;
            break;
          }

          try {
            const parsed = JSON.parse(data);
            assistantMessage += parsed.content;

            // Update the UI with the partial response
            setMessages((prev) => [
              ...prev.filter((msg) => msg.id !== newMessage.id + 1), // Remove placeholder
              {
                id: newMessage.id + 1,
                user: "assistant",
                text: assistantMessage,
                timestamp: new Date(),
              },
            ]);

            toast({
              title: "There is some problem with AI agent",
            });
          } catch (err) {
            console.error("Failed to parse data:", data, err);
            toast({
              title: "There is some problem with AI agent",
            });
          }
        }
      }
    } catch (error) {
      toast({
        title: "There is some problem with AI agent",
      });
      console.error("Failed to fetch reply:", error);
    }
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log("ev.shiftKey", ev.shiftKey, ev.key === "Enter" && !ev.shiftKey);
    if (ev.key === "Enter" && !ev.shiftKey) {
      if (inputValue.trim()) {
        sendMessage();
      }
    } else if (ev.key === "Enter" && ev.shiftKey) {
      setRows((prevRows) => prevRows + 1);
    } else if (ev.key === "Backspace") {
      const newRows = calculateRows(inputValue);
      setRows(newRows); // Update rows based on remaining text
    }
  };
  return (
    <>
      <div className="pt-2">
        <div className="max-h-[40%] px-5 sm:px-0 z-15 w-full mx-auto xl:max-w-[40rem]">
          <div className="relative flex h-full w-full cursor-text items-end border border-transparent bg-neutral-25 shadow-input transition-all duration-300 focus-within:border-neutral-400 focus-within:shadow-none hover:border-neutral-400 hover:shadow-none rounded-[30px]">
            <div className="max-h-[200px] grow overflow-y-auto py-3 pl-[1.185rem] pr-4 lg:py-2.5 xl:py-[8.5px]">
              <textarea
                ref={textareaRef}
                role="textbox"
                className={`t-body-chat block px-1 h-[32px] w-full resize-none overflow-y-hidden whitespace-pre-wrap bg-transparent text-[22px] text-primary-700 outline-none placeholder:text-neutral-600`}
                placeholder="Talk with Pi"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                style={{ height: `${rows * LINE_HEIGHT}px` }}
              />
            </div>
            <button
              aria-label="Submit text"
              className={`flex h-9 w-9 items-center justify-center rounded-full p-1.5 ${
                inputValue
                  ? "text-white bg-primary-600 cursor-pointer"
                  : "text-neutral-600 bg-neutral-50 cursor-text"
              } m-2 transition-colors duration-300`}
              type="button"
              onClick={inputValue ? sendMessage : () => {}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="16"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M.852 7.648a1.2 1.2 0 0 1 0-1.696l4.8-4.8a1.2 1.2 0 0 1 1.696 0l4.8 4.8a1.2 1.2 0 1 1-1.697 1.696L7.7 4.897V14a1.2 1.2 0 0 1-2.4 0V4.897L2.548 7.648a1.2 1.2 0 0 1-1.696 0Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="px-5 my-6 w-full mx-auto xl:max-w-[40rem]">
        <div style={{ opacity: 1 }}>
          <div className="t-label mx-auto text-center text-neutral-900">
            Pi may make mistakes, please don't rely on its information.
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInput;

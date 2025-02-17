"use client";
import { DrawerHeader } from "@/components/cpn_dashboard";
import { useParams } from "next/navigation";
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState } from "react";
import { ModelMessage, UserMessage } from "@/components/cpn_chatMessage";
import { chatMessagesSamples } from "../testData";

export default function ChatPage() {
  const params = useParams();
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 6 * 24)}px`;
    }
    setText(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Gửi tin nhắn:", text);
      setText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };
 
  
  const index = Number(params.id) || 1;
  console.log(">>> Check index:", index);
  const chatMessages = chatMessagesSamples[index - 1]

  return (
    <div className="flex items-center flex-col h-full overflow-auto">
      <DrawerHeader />
      {/* ------ */}
      <div className="w-full h-full flex-1 overflow-hidden">
        <div className="flex h-full flex-col overflow-y-auto w-full items-center">
          <div className="flex flex-col text-lg px-4 w-full max-w-3xl">
            {chatMessages.map((msg, index) =>
              msg.role === "user" ? (
                <UserMessage key={index} message={msg.message} />
              ) : (
                <ModelMessage key={index} message={msg.message} />
              )
            )}
          </div>
        </div>
      </div>
      {/* ------ */}
      <div className="w-full max-w-3xl min-h-6 max-h-48 mb-4">
        <div className="flex items-center rounded-[2rem] shadow-xl p-4 border-gray-200 border-2">
          <form className='w-full flex'>
            <textarea
              ref={textareaRef}
              placeholder="Enter Message"
              className="block h-10 w-full outline-none resize-none border-0 bg-transparent px-2 py-2"
              rows={1}
              value={text}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              style={{ minHeight: "24px", maxHeight: "144px" }}
            />
            <div className="flex">
              <button className="bg-black text-white rounded-full p-2 ml-2 mt-auto">
                <SendIcon fontSize="medium" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

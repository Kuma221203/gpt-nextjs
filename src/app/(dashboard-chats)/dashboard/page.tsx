"use client";
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SummarizeIcon from '@mui/icons-material/Summarize';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useRef, useState } from "react";
import { postNewState } from '../handleApi';
import { redirect } from 'next/navigation';


export default function Dashboard() {
  const [text, setText] = useState<string>("");
  const model = "gpt-4o";
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 6 * 24)}px`;
    }
    setText(e.target.value);
  };
  async function fetchNewState(){
    const response = await postNewState(model, text);
    redirect(`chats/${response.stateId}`);
  }
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await fetchNewState()
      setText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <h1 className="text-4xl font-bold mb-8">What can I help you with?</h1>
      <div className="w-full max-w-3xl">
        <div className="flex items-center rounded-[2rem] shadow-xl p-4 mb-4 border-gray-200 border-2">
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
      <div className="flex justify-evenly gap-4">
        <button className='flex border-2 p-4 gap-2 rounded-full'>
          <CodeIcon />
          <span>Code</span>
        </button>
        <button className='flex border-2 p-4 gap-2 rounded-full'>
          <ImageSearchIcon />
          <span>Analyze images</span>
        </button>
        <button className='flex border-2 p-4 gap-2 rounded-full'>
          <SummarizeIcon />
          <span>Summarize text</span>
        </button>
        <button className='flex border-2 p-4 gap-2 rounded-full'>
          <StickyNote2Icon />
          <span>Make a plan</span>
        </button>
      </div>
    </div>
  );
}

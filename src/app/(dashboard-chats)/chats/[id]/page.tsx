"use client";
import { DrawerHeader } from "@/components/cpn_dashboard";
import { useParams } from "next/navigation";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from "react";
import { ModelMessage, UserMessage } from "@/components/cpn_chatMessage";
import { getChatList } from "../../handleApi";
import { smoothScrollToBottom, scrollToBottomInstant } from "./smoothScroll";
import { postQuestion } from "../../handleApi.client";
type Message = {
  chatRole: string;
  content: string;
};

type SingleConversation = Message[];

type Model = {
  name: string;
}

type Chat = {
  model: Model,
  messages: SingleConversation;
}


export default function ChatPage() {
  const { id } = useParams() as { id: string };
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-4o");
  const [answer, setAnswer] = useState<string>("");
  const [isInit, setIsInit] = useState<boolean>(false);
  const [chatList, setChatList] = useState<SingleConversation[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (duration: number) => {
    if (containerRef.current && bottomRef.current) {
      smoothScrollToBottom(
        containerRef.current,
        bottomRef.current,
        duration,
      );
    }
  };

  const scrollToBottomImmediate = () => {
    if (containerRef.current) {
      scrollToBottomInstant(containerRef.current);
    }
  };

  useEffect(() => {
    fetchChatList();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      scrollToBottom(1500);
    }
    setIsInit(false)
  }, [chatList]);

  useEffect(() => {
    if (answer) {
      scrollToBottom(100);
    }
  }, [answer]);

  useEffect(() => {
    if (isInit) {
      fetchPostInit();
    }
  }, [isInit]);

  async function fetchChatList() {
    setAnswer("");
    const response = await getChatList(Array.isArray(id) ? id[0] : id);
    const messagesList = response.map((item: Chat) => item.messages);
    setChatList(messagesList);
    if (messagesList.length === 1 && messagesList[0].length === 1) {
      setIsInit(true);
    }
  }

  async function fetchPostQuestion(question: string) {
    const newMessage: Message = { chatRole: "USER", content: question };
    setText("");
    setChatList((prevChatList) => [...prevChatList, [newMessage]]);
    await postQuestion(model, question, isInit, id, (chunk) => {
      setAnswer((prevAnswer) => prevAnswer + chunk);
    });
  }

  async function fetchPostInit() {
    if (chatList.length === 1 && chatList[0].length === 1) {
      const question = chatList[0][0].content;
      await fetchPostQuestion(question);
      setIsInit(false);
      await fetchChatList();
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 6 * 24)}px`;
    }
    setText(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      scrollToBottomImmediate()
      e.preventDefault();
      try {
        await fetchPostQuestion(text);
      } catch (error) {
        console.error(error);
      }

      await fetchChatList();

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="flex items-center flex-col h-full overflow-auto">
      <DrawerHeader />
      <div className="w-full h-full flex-1 overflow-hidden">
        <div
          className="flex h-full flex-col overflow-y-auto w-full items-center"
          ref={containerRef}
        >
          <div className="flex flex-col text-lg px-4 w-full max-w-3xl">
            {chatList?.flatMap((chat, listIndex) =>
              chat?.map((single, index) => (
                single.chatRole === "USER"
                  ? <UserMessage key={`${listIndex}-${index}`} message={single.content} />
                  : <ModelMessage key={`${listIndex}-${index}`} message={single.content} />
              ))
            )}
            {answer ? <><ModelMessage message={answer} /> <div ref={bottomRef} /></> : <div ref={bottomRef} />}
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl min-h-6 max-h-48 my-4">
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

"use client";
import { DrawerHeader } from "@/components/cpn_dashboard";
import { useParams } from "next/navigation";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ModelMessage, UserMessage } from "@/components/cpn_chatMessage";
import { getChatList } from "../../handleApi";
import { scrollToBottomInstant } from "./smoothScroll";
import { postQuestion } from "../../handleApi.client";
import { useDashboardContext } from "../../DashboardContext";

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
  const { model } = useDashboardContext();
  const { id } = useParams() as { id: string };
  const [answer, setAnswer] = useState<string>("");
  const [isInit, setIsInit] = useState<boolean>(false);
  const [chatList, setChatList] = useState<SingleConversation[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottomImmediate = () => {
    if (containerRef.current) {
      scrollToBottomInstant(containerRef.current);
    }
  };

  useLayoutEffect(() => {
    scrollToBottomImmediate();
  }, [chatList, answer]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getChatList(Array.isArray(id) ? id[0] : id);
      const messagesList = response.map((item: Chat) => item.messages);
      setChatList(messagesList);
      if (messagesList.length === 1 && messagesList[0].length === 1) {
        setIsInit(true);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (isInit) {
      const fetchInit = async () => {
        await fetchPostInit();
      };
      fetchInit();
    }
  }, [isInit]);

  async function fetchPostQuestion(question: string) {
    let response: string = "";
    await postQuestion(model, question, isInit, id, (chunk) => {
      setAnswer((prevAnswer) => prevAnswer + chunk);
      response += chunk;
    });
    return response;
  }

  async function fetchPostInit() {
    const question = chatList[0][0].content;
    await fetchPostQuestion(question);
    setIsInit(false);
  }

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 6 * 24)}px`;
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (answer) {
        const modelMessage: Message = { chatRole: "MODEL", content: answer };
        setAnswer("")
        setChatList((prevChatList) => [...prevChatList, [modelMessage]]);
      }
      if (textareaRef.current) {
        const question = textareaRef.current.value;
        textareaRef.current.value = '';
        handleInput()
        if (question) {
          const userMessage: Message = { chatRole: "USER", content: question };
          setChatList((prevChatList) => [...prevChatList, [userMessage]]);
          try {
            await fetchPostQuestion(question);
          } catch (error) {
            console.error(error);
          }
        }
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
          <div className="w-full max-w-sm  sm:max-w-xl md:max-w-2xl lg:min-w-3xl flex flex-col text-lg px-4 ">
            {chatList?.flatMap((chat, listIndex) =>
              chat?.map((single, index) =>
                single.chatRole === "USER" ? (
                  <UserMessage key={`${listIndex}-${index}`} message={single.content} />
                ) : (
                  <ModelMessage key={`${listIndex}-${index}`} message={single.content} />
                )
              )
            )}
            {answer && <ModelMessage message={answer} />}
            <div className="h-[1px] w-full" ref={bottomRef} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:min-w-3xl min-h-6 max-h-48 my-4 px-6">
        <div className="flex items-center rounded-[2rem] shadow-xl p-4 border-gray-200 border-2">
          <form className="w-full flex">
            <textarea
              ref={textareaRef}
              placeholder="Enter Message"
              className="block h-10 w-full outline-none resize-none border-0 bg-transparent px-2 py-2"
              rows={1}
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
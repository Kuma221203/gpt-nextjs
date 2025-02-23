"use client";

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import 'highlight.js/styles/github.css';

interface MessageProps {
  message: string;
}

export function UserMessage({ message }: MessageProps) {
  return (
    <div className="self-end max-w-[70%] mt-3">
      <article className="bg-gray-100 rounded-3xl">
        <div className="p-5">
          {message}
        </div>
      </article>
    </div>
  );
}

export function ModelMessage({ message }: MessageProps) {
  return (
    <div className="self-start prose text-lg min-w-full">
      <article>
        <div className=" marker:text-gray-700">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre({ children, ...props }) {
                return (
                  <pre {...props} className="border-gray-800  bg-white p-3 rounded-lg w-full border-2 text-gray-800">
                    {children}
                  </pre>
                );
              },
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <>
                    <pre className={`${className} m-0 pt-0 w-full`}>
                      <div className='pb-3 text-gray-800 flex justify-between'>
                        <span>{match[1]}</span>
                        <div className='flex gap-3'>
                          <button className='flex items-center'>
                            <CopyAllIcon fontSize='small'/>
                            <span>Copy</span>
                          </button>
                        </div>
                      </div>
                      <code {...props} className='w-full'>{children}</code>
                    </pre>
                  </>
                ) : (
                    <code {...props} className={`${className}`}>
                      {children}
                    </code>
                );
              },
            }}
          >
            {message}
          </Markdown>
        </div>
      </article>
    </div>
  );
}
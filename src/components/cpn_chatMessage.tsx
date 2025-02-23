"use client";

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import CheckIcon from '@mui/icons-material/Check';
import 'highlight.js/styles/github.css';
import { ReactNode, useState } from 'react';

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

const PreBlock = (className: string | undefined, match: RegExpExecArray, codeContent: string, props: Object, children: ReactNode) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <pre className={`${className} m-0 pt-0 w-full`}>
      <div className='pb-3 text-gray-800 flex justify-between'>
        <span>{match[1]}</span>
        <button
          className="flex items-center gap-1"
          onClick={(event) => {
            navigator.clipboard.writeText(codeContent);
            const button = event.currentTarget;
            setIsCopied(true);
            button.disabled = true;
            setTimeout(() => {
              setIsCopied(false);
              button.disabled = false;
            }, 2000);
          }}
        >
          {isCopied ?
            <>
              <CheckIcon className='text-green-600' fontSize='small' />
              <span>Copied</span>
            </>
            :
            <>
              <CopyAllIcon  fontSize='small' />
              <span>Copy</span>
            </>
          }
        </button>
      </div>
      <code {...props} className='w-full'>{children}</code>
    </pre>
  )
}

export function ModelMessage({ message }: MessageProps) {
  const extractTextFromChildren = (children: any): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(child => extractTextFromChildren(child)).join('');
    }
    if (children && typeof children === 'object' && 'props' in children) {
      return extractTextFromChildren(children.props.children);
    }
    return '';
  };
  return (
    <div className="self-start prose text-lg w-full max-w-xl md:max-w-2xl lg:min-w-3xl">
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
                const codeContent = extractTextFromChildren(children).trim();
                return match ?
                  PreBlock(className, match, codeContent, props, children)
                  : (
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
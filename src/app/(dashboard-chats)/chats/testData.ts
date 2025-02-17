const conversation_1 = [{
  role: "user",
  message: "How do I set up Prisma with PostgreSQL in a Next.js app?"
},
{
  role: "model",
  message: `To set up Prisma with PostgreSQL in a Next.js app, follow these steps:

1. **Install Dependencies**:
\`\`\`sh
npm install @prisma/client @prisma/cli
\`\`\`

2. **Initialize Prisma**:
\`\`\`sh
npx prisma init
\`\`\`
This creates a \`.env\` file and a \`prisma/schema.prisma\` file.

3. **Configure PostgreSQL**:
Update the \`.env\` file with your database connection string:
\`\`\`
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
\`\`\`

4. **Define Schema**:
Modify \`schema.prisma\`:
\`\`\`prisma
model User {
 id    Int    @id @default(autoincrement())
 name  String
 email String @unique
}
\`\`\`

5. **Migrate Database**:
\`\`\`sh
npx prisma migrate dev --name init
\`\`\`

6. **Generate Prisma Client**:
\`\`\`sh
npx prisma generate
\`\`\`

7. **Use in Next.js API Route**:
\`\`\`js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
   const users = await prisma.user.findMany();
   res.json(users);
}
\`\`\`

And that’s it! Prisma is now integrated with PostgreSQL in your Next.js app.`
},]

const conversation_2 = [{
  role: "user",
  message: "Explain JWT authentication in a simple way."
},
{
  role: "model",
  message: `JWT (JSON Web Token) is a way to securely transmit information between two parties.

### How JWT Works:
1. **User Logs In**: They provide credentials (email/password).
2. **Server Generates a JWT**: If valid, the server creates a JWT containing user info.
3. **JWT Sent to Client**: The client stores the token (e.g., in HTTP-only cookies or local storage).
4. **Client Uses JWT**: It includes the JWT in requests to access protected routes.
5. **Server Verifies JWT**: It checks the token’s signature and grants or denies access.

### JWT Structure:
A JWT has three parts:
\`\`\`
Header.Payload.Signature
\`\`\`
Example:
\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
\`\`\`

### Why Use JWT?
- Stateless authentication (no need to store sessions in DB).
- Secure (when used with HTTP-only cookies).
- Works across different services.

However, JWTs should be **signed** and **not stored in local storage** for security reasons.`
},]

const conversation_3 = [{
  role: "user",
  message: "How do I deploy a Next.js app to Vercel?"
},
{
  role: "model",
  message: `Deploying a Next.js app to Vercel is simple:

1. **Install Vercel CLI** (optional but useful):
\`\`\`sh
npm install -g vercel
\`\`\`

2. **Login to Vercel**:
\`\`\`sh
vercel login
\`\`\`

3. **Deploy Your Next.js App**:
- Run:
\`\`\`sh
vercel
\`\`\`
- Follow the prompts to select the correct project settings.

4. **Alternative: Deploy via GitHub**:
- Push your project to GitHub.
- Go to [Vercel](https://vercel.com/) and import your repo.
- Configure build settings if needed.

5. **Success!** Your Next.js app is now live on a Vercel domain (e.g., \`your-app.vercel.app\`).`
},]

const conversation_4 = [{
  role: "user",
  message: "What is React Query, and why should I use it?"
},
{
  role: "model",
  message: `React Query is a powerful library for managing server state in React apps.

### Why Use React Query?
- **Automatic Caching**: Stores API responses, reducing redundant network calls.
- **Background Refetching**: Keeps data fresh by automatically fetching updates.
- **Optimistic Updates**: Instantly updates UI before the server responds.
- **Easy Pagination & Infinite Scrolling**: Simplifies data fetching.
- **Works with Any API**: REST, GraphQL, Firebase, etc.

### Example:
\`\`\`js
import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
const res = await fetch('/api/data');
return res.json();
};

const MyComponent = () => {
const { data, error, isLoading } = useQuery(['data'], fetchData);

if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error fetching data</p>;

return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
\`\`\`

React Query improves performance, simplifies API fetching, and reduces boilerplate code.`
}]

const conversation_5 = [{
  role: "user",
  message: "Give me a demo of react-markdown."
},
{
  role: "model",
  message: `# A demo of \`react-markdown\`

\`react-markdown\` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`'h1'\`)
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
<Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
document.querySelector('#content')
)
\`\`\`

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import MyFancyRule from './components/my-fancy-rule.js'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
<Markdown
components={{
  // Use h2s instead of h1s
  h1: 'h2',
  // Use a component instead of hrs
  hr(props) {
    const {node, ...rest} = props
    return <MyFancyRule {...rest} />
  }
}}
>
{markdown}
</Markdown>,
document.querySelector('#content')
)
\`\`\`

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/)`
}]

export const chatMessagesSamples = [
  conversation_1,
  conversation_2,
  conversation_3,
  conversation_4,
  conversation_5,
];

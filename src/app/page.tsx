import getMe from "./get-me";

export default async function Home() {
  const me = await getMe();

  return <div>Hello {me?.username}, đây là Home Page</div>;
}

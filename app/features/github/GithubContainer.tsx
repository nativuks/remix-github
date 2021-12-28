import { useLoaderData } from "remix";
import { LoaderData, User } from "./types";

export interface GithubContainerProps {
  user: User;
}

export function GithubContainer({ user }: GithubContainerProps) {
  return (
    <>
      <h1>UserName: {user?.login}</h1>
      <blockquote>{user.bio}</blockquote>
      <img src={user.avatar_url} width="150" />
    </>
  );
}

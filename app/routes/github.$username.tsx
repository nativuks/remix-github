import { LoaderFunction, useLoaderData } from "remix";

export interface User {
  login: string;
  avatar_url: string;
  bio: string;
}

export interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({ params }) => {
  const HEADERS = {
    headers: {
      Authorization: `token ${process.env.USER_GITHUB_TOKEN}`,
      Accept:
        "application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json",
    },
  };
  const res = await fetch(
    `https://api.github.com/users/${params.username}`,
    HEADERS
  );
  return {
    user: await res.json(),
  };
};

export default function () {
  const { user } = useLoaderData<LoaderData>();
  return (
    <>
      <h1>{user.login}</h1>
      <blockquote>{user.bio}</blockquote>
      <img src={user.avatar_url} width="150" />
    </>
  );
}

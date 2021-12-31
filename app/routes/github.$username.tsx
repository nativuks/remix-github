import { LoaderFunction, useLoaderData } from "remix";
import { GithubApi, Types, Repositories } from "~/features/github/index";

import styles from "../styles/tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ params }) => {
  const res = {
    user: await GithubApi.getGithubUser(params.username),
    repos: await GithubApi.getUserRepos(params.username),
  };
  return res;
};

export default function () {
  const { user, repos } = useLoaderData<Types.Repositories.LoaderData>();
  return (
    <>
      <Repositories user={user} repos={repos} />
    </>
  );
}

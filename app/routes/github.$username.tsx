import { LoaderFunction, useLoaderData } from "remix";
import { getGithubUser, GithubContainer, LoaderData } from "~/features/github";

export const loader: LoaderFunction = async ({ params }) => {
  return {
    user: await getGithubUser(params.username),
  };
};

export default function () {
  const { user } = useLoaderData<LoaderData>();

  return <GithubContainer user={user} />;
}

import invariant from "tiny-invariant";
import pick from "lodash/pick";
import { Types } from ".";

const token = process.env.USER_GITHUB_TOKEN;
const HEADERS = {
  headers: {
    Authorization: `token ${token}`,
    Accept:
      "application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json",
  },
};

export const getGithubUser = async (username?: string) => {
  invariant(username, "Please provide an username as string!!");
  const res = await fetch(
    `https://api.github.com/users/${username.toLocaleLowerCase()}`,
    HEADERS
  );
  return pick(await res.json(), ["login", "avatar_url", "html_url", "bio"]);
};

export const getUserRepos = async (username?: string) => {
  invariant(username, "Please provide an username as a string");

  const res = await fetch(
    `https://api.github.com/users/${username}/repos`,
    HEADERS
  );

  return (await res.json()).map((repo: Types.Repositories.Repo) =>
    pick(repo, [
      "id",
      "full_name",
      "stargazers_count",
      "html_url",
      "language",
      "name",
    ])
  );
};

export const getCommits = async (
  reponame?: string,
  username?: string
): Promise<Types.Commits.Commit[]> => {
  invariant(reponame, "Please provide an repository name as a string");
  invariant(username, "Please provide an user name as a string");

  const res = await fetch(
    `https://api.github.com/repos/${username}/${reponame}/commits`,
    HEADERS
  );

  return (await res.json()).map((commit: Types.Commits.ApiResponse) => ({
    sha: commit.sha,
    message: commit.commit.message,
    html_url: commit.html_url,
  }));
};

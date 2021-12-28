import invariant from "tiny-invariant";

const token = process.env.USER_GITHUB_TOKEN;

export const getGithubUser = async (username?: string) => {
  invariant(username, "Please provide an username as string!!");
  const HEADERS = {
    headers: {
      Authorization: `token ${token}`,
      Accept:
        "application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json",
    },
  };
  const res = await fetch(`https://api.github.com/users/${username}`, HEADERS);

  const { login, avatar_url, html_url, bio } = await res.json();

  return {
    login,
    avatar_url,
    html_url,
    bio,
  };
};

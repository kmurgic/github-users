import fetchFromGithubApi from './fetchFromGithubApi';

const fetchFollowers = async (url) => {
  const { nextUrl, data, error } = await fetchFromGithubApi(url);
  if (error) {
    return { error };
  }
  const followersList = data.map((user) => ({
    id: user.id,
    imgUrl: user.avatar_url,
    url: user.html_url,
    username: user.login,
  }));
  return { nextUrl, followersList };
};

export default fetchFollowers;

import fetchFromGithubApi from './fetchFromGithubApi';

const fetchUsers = async (url) => {
  const { nextUrl, data, error } = await fetchFromGithubApi(url || 'https://api.github.com/users');
  if (error) {
    return { error };
  }
  const userList = data.map((user) => ({
    id: user.id,
    imgUrl: user.avatar_url,
    url: user.html_url,
    username: user.login,
  }));
  return { nextUrl, userList };
};

export default fetchUsers;

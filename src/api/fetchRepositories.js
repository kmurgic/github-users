import fetchFromGithubApi from './fetchFromGithubApi';

const fetchRepositories = async (url) => {
  const { nextUrl, data, error } = await fetchFromGithubApi(url);
  if (error) {
    return { error };
  }
  const repositoriesList = data.map((repository) => ({
    id: repository.id,
    description: repository.description || '',
    forks: repository.forks,
    link: repository.html_url,
    name: repository.name,
    watchers: repository.watchers,
  }));
  return { nextUrl, repositoriesList };
};

export default fetchRepositories;

import parse from 'parse-link-header';

const fetchFromGithubApi = async (url) => {
  const token = process.env.REACT_APP_AUTH_TOKEN;
  const headers = token ? { authorization: `token ${token}` } : {};
  try {
    const response = await fetch(url, { headers });
    if (response.status < 200 || response.status >= 300) throw (response);
    const data = await response.json();
    const linkHeader = response.headers.get('Link');
    const parsedLinkHeader = parse(linkHeader);
    const nextUrl = (parsedLinkHeader.next || null) && parsedLinkHeader.next.url;
    return { nextUrl, data };
  } catch (error) {
    return { error };
  }
};

export default fetchFromGithubApi;

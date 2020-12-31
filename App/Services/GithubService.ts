import { create } from 'apisauce';
import { Config } from '../Config';
import type { GithubRepoType } from '~/typings';

const GithubApiClient = create({ baseURL: Config.GITHUB_API, timeout: 10000 });

/** Fetch latest version */
const fetchLatestVersion = async (): Promise<GithubRepoType> => {
  const response = await GithubApiClient.get<GithubRepoType[]>(Config.REPO);
  if (response.ok && response.data) {
    return response.data[0];
  }
  throw Error('error while fetchLatestVersion (GithubService)');
};

export default { fetchLatestVersion };

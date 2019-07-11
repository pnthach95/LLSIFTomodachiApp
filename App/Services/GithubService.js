import { create } from 'apisauce';
import { Config } from '../Config';

const GithubApiClient = create({
  baseURL: Config.GITHUB_API,
  timeout: 10000,
});

/**
 * Fetch latest version
 *
 * @returns
 */
async function fetchLatestVersion() {
  return new Promise((resolve, reject) => {
    GithubApiClient.get(Config.REPO).then((response) => {
      if (response.ok) {
        resolve(response.data[0]);
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('error while fetchLatestVersion (GithubService)');
    });
  });
}

// eslint-disable-next-line import/prefer-default-export
export const GithubService = {
  fetchLatestVersion,
};

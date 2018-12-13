import { create } from 'apisauce';
import Reactotron from 'reactotron-react-native';
import { Config } from '../Config';

const GithubApiClient = create({
  baseURL: Config.GITHUB_API,
  timeout: 10000
});

GithubApiClient.addMonitor(Reactotron.apisauce);

/**
 * Fetch latest version
 *
 * @returns
 */
async function fetchLatestVersion() {
  return new Promise((resolve, reject) => {
    GithubApiClient.get(Config.REPO).then(response => {
      if (response.ok) {
        resolve(response.data[0]);
      }
      reject(null);
    });
  });
}

export const GithubService = {
  fetchLatestVersion
}

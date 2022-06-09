import type {Config} from '@jest/types';
import { getJestProjects } from '@nrwl/jest'
// Sync object
const config: Config.InitialOptions = {
  projects: getJestProjects()
};
export default config;

// const { getJestProjects } = require('@nrwl/jest');

// module.exports = {
//   projects: getJestProjects(),
// };

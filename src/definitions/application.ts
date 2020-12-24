import { AppMode } from '../constants';

export interface IOptions {
  rootPath?: string;
  port?: number;
  env?: string;
  mode?: AppMode;
  loadedCallback?: () => void;
}

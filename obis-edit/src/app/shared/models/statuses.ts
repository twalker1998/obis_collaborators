import { FedStatus } from './fed-status';
import { StateStatus } from './st-status';

export interface Statuses {
  fed_statuses: Array<FedStatus>;
  st_statuses: Array<StateStatus>;
}

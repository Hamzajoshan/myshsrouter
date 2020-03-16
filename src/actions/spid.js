
import { ADD_SPID } from './types';
export const spid = value => {
  return {
    type: ADD_SPID,
    payload: value
  }
}

import { ADD_TOKEN } from './types';
export const tokenState = value => {
  return {
    type: ADD_TOKEN,
    payload: value
  }
}
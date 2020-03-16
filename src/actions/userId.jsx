import { ADD_USERID } from "./types";
export const userIdState = value => {
  return {
    type: ADD_USERID,
    payload: value
  };
};

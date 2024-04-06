import { ACTION_TYPE } from "../actions/action-type";
export const setPostData = (postData) => ({
  type: ACTION_TYPE.SET_POST_DATA,
  payload: postData,
});

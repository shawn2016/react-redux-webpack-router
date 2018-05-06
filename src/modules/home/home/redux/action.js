import { ADD_HOME_COUNT, REDUCE_HOME_COUNT, DESP_GETACCOUNTDATA } from './constants';
export const add = () => ({
  type: ADD_HOME_COUNT,
});
export const decrease = () => ({
  type: REDUCE_HOME_COUNT,
});
export const asyncAction = () => ({
  type: DESP_GETACCOUNTDATA,
  callApiParam: {
    type: DESP_GETACCOUNTDATA,
    path: '/curruser/getInfo',
    method: 'POST',
  },
});

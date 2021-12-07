import {
  GET_ACCESS_TOKEN,
  GET_USER_INFO,
  LOG_OUT_USER,
  UserAction,
  UserInfoType,
} from '../actions/UserAction';
import { userState } from '../initialState';

export default function userReducer(state = userState, action: UserAction) {
  switch (action.type) {
    case GET_USER_INFO:
      return Object.assign({}, state, {
        ...state,
        ...(action.payload as UserInfoType),
      });
    case GET_ACCESS_TOKEN:
      return Object.assign({}, state, {
        ...state,
        token: action.payload,
      });
    case LOG_OUT_USER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

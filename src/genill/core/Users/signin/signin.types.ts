// this is for mutations and actions
export const USER_LOGIN = '[LOGIN] User Login';
export const USER_REGISTER = '[REGISTER] User Register';
export const USER_LOGOUT = '[LOGOUT] User Logout';
export const GET_USERNAME = '[USER] Username';
export const CLEAR_ALL_STATE = '[CLEAR] ALL STATE';

// this is module name
const NAME = 'user/';

// this is for when ever you need to dispatch or commit in component
export const ORDER_USER_LOGIN = `${NAME}${USER_LOGIN}`;
export const ORDER_USER_REGISTER = `${NAME}${USER_REGISTER}`;
export const ORDER_USER_LOGOUT = `${NAME}${USER_LOGOUT}`;
export const ORDER_CLEAR_ALL_STATE = `${NAME}${CLEAR_ALL_STATE}`;

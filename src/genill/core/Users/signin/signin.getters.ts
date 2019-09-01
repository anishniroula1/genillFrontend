import store from '@/store/store';

export function getState() {
  return store.getters['user/getState'];
}

export function isUserLoggedin() {
  return !!getState().user;
}

export function getUsername() {
  const username = localStorage.getItem('user');
  return !!username ? username.substr(1, username.length - 2) : '';
}

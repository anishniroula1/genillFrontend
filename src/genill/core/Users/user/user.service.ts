import { apiConfig } from '@/genill/core/api';

export const login = `${apiConfig}/login`;
export const register = `${apiConfig}/register`;

export function getUserProfileByUsername(username: string) {
  return `${apiConfig}/username/${username}`;
}

export function checkUsernameExist(username: string) {
  return `${apiConfig}/${username}/checkusername`;
}

export function checkEmailExist(email: string) {
  return `${apiConfig}/${email}/checkemail`;
}

export function uploadProfilePicture() {
  return `${apiConfig}/uploadprofileimage`;
}

export function uploadUserAlbum() {
  return `${apiConfig}/uploadalbum`;
}

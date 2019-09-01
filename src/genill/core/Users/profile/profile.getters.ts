import store from '@/store/store';
import { createObs } from '@/utils/createObs';

export function getProfileState() {
  return store.getters['profile/getState'];
}

export function getFullProfile() {
  return getProfileState();
}

export function getProfileUsername() {
  return getProfileState().username;
}

export function getFirstname() {
  return getProfileState().firstName;
}

export function getLastName() {
  return getProfileState().lastName;
}

export function getEmailId() {
  return getProfileState().email;
}

export function getFirstName() {
  return createObs(getProfileState().firstName);
}

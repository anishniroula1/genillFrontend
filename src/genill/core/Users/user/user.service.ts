import {apiConfig, auth, graphQLConfig, profile} from '@/genill/core/api';
import {GET_USER_PROFILE} from "@/genill/core/Users/profile/profile.types";
import {getUsername} from "@/genill/core/Users/signin/signin.getters";
import axios from "axios";

export const login = `${apiConfig(auth)}/login`;

export const register = `${apiConfig(auth)}/register`;

export const logout = `${apiConfig(auth)}/logout`;

export function getUserProfileByUsername(username: string) {
  return `${apiConfig(auth)}/username/${username}`;
}

export function checkUsernameExist(username: string) {
  return `${apiConfig(profile)}/${username}/checkusername`;
}

export function checkEmailExist(email: string) {
  return `${apiConfig(profile)}/${email}/checkemail`;
}

export function uploadProfilePicture() {
  return `${apiConfig(profile)}/uploadprofileimage`;
}

export function uploadUserAlbum() {
  return `${apiConfig(profile)}/uploadalbum`;
}

export function profileGraphQL() {
  return `${graphQLConfig(profile)}`;
}


/*async [GET_USER_PROFILE]({commit}) {
  const username = getUsername();
  const query = `query getUser($username: String){
       userByUsername(username:$username) {
                username
                firstName
                lastName
                email
                profilePicture
        }
        }`;
  return await axios({
    url: profileGraphQL(),
    method: 'POST',
    data: {
      query,
      variables: {username}
    }
  }).then((result) =>  commit(GET_USER_PROFILE,result.data.data.userByUsername))


},*/


export function userGraphQl(query: any, variables: any) {
  return axios({
    url: profileGraphQL(),
    method: 'POST',
    data: {
      query,
      variables: variables
    }
  });
}

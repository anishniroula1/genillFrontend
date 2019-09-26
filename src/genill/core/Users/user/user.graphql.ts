import axios from "axios";
import {profileGraphQL} from "@/genill/core/Users/user/user.service";

export const queryForUser = `query getUser($username: String){
       userByUsername(username:$username) {
       username firstName lastName email profilePicture accountCreatedDateTime
        }
     }`;

export function userGraphQlWithVariables(query: any, variables: any) {
    return axios({
        url: profileGraphQL(),
        method: 'POST',
        data: {
            query,
            variables: variables
        }
    });
}

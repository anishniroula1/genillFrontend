import {getFirstname} from '@/genill/core/Users/profile/profile.getters';
import {GET_USER_PROFILE} from '@/genill/core/Users/profile/profile.types';
import {getUsername} from '@/genill/core/Users/signin/signin.getters';
import {ActionTree} from 'vuex';
import {queryForUser, userGraphQlWithVariables} from "@/genill/core/Users/user/user.graphql";

export const actions: ActionTree<any, any> = {
    async [GET_USER_PROFILE]({commit}) {
        const username = getUsername();
        return await userGraphQlWithVariables(queryForUser, {username}).then((result) =>  commit(GET_USER_PROFILE,result.data.data.userByUsername))
    },
};

// export const apiConfig = 'http://localhost:8097/auth/genill/api';
// List of Paths
export const auth = 'auth';
export const profile = 'profile';

export function apiConfig(path: string) {
    return `http://localhost:8097/${path}/genill/api`;
}

export function graphQLConfig(path: string) {
    return `http://localhost:8097/${path}/graphql`
}

import fetcher from './fetcher';

export function login(username: string, password: string) {
    return fetcher.post(`/login`, {username, password});
}

export function tokenLogin() {
    return fetcher.get(`/tokenLogin`);
}

import axios from 'axios';

export const login = (credentials) => {
    return axios.post('/api/session/', credentials);
}

export const logout = () => {
    return axios.delete('/api/session/');
}
import axios from 'axios';

export const createUser = (userData) => {
    return axios.post('api/users/', userData);
}

export const fetchUser = (id) => {
    return axios.get(`api/users/${id}`, id);
};

export const fetchUsers = () => {
    return axios.get('api/users/');
};
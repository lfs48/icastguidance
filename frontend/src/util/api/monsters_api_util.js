import axios from 'axios';

export const createMonster = (monster) => {
    return axios.post('/api/monsters', monster);
}
import $ from 'jquery';

export const createMonster = (monster) => {
    return $.ajax({
        method: 'POST',
        url: '/api/monsters',
        data: monster
    });
};
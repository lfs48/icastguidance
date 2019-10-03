import * as MonstersAPIUtil from '../../util/api/monsters_api_util';
import * as actionTypes from '../types';

// Standard actions

export const receiveMonster = (monster) => ({
    type: actionTypes.RECEIVE_MONSTER,
    monster: monster
});

// Thunk actions

export const createMonster = (formMonster) => (dispatch) => {
    return MonstersAPIUtil.createMonster(formMonster)
    .then(monster => dispatch(receiveMonster(monster)));
}
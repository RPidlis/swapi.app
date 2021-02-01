import {createSelector} from 'reselect'

export const getCharacters = (state) => {
    return state.character.items;
};
export const getLikedId = (state) => {
    return state.character.likesId;
};

export  const getLikedCharacters = createSelector([getCharacters, getLikedId],(items, id) => {
    const liked = items.filter((item) => id.includes(item.id))
    return liked;
});


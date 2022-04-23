const INITIAL_STATE = {
  favorites: [],
  currFavorite: null,
};
export function favoriteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites,
      };
    case 'SET_FAVORITE':
      return {
        ...state,
        currFavorite: action.favorite,
      };

    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite._id !== action.favoriteId
        ),
      };
    default:
      return state;
  }
}

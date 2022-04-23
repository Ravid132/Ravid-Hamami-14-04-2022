import { favoriteService } from '../../services/favoritesService';

export function loadFavorites() {
  return async (dispatch) => {
    try {
      const favorites = await favoriteService.query();
      dispatch({ type: 'SET_FAVORITES', favorites });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getFavoriteById(favoriteId) {
  return async (dispatch) => {
    const favorite = await favoriteService.getById(favoriteId);
    dispatch({ type: 'SET_FAVORITE', favorite });
  };
}

export function removeFavorite(favoriteId) {
  return async (dispatch) => {
    await favoriteService.remove(favoriteId);
    dispatch({ type: 'REMOVE_FAVORITE', favoriteId });
  };
}

export function addFavorite(location, currentWeather, weeklyWeather) {
  return async (dispatch) => {
    const favoriteToSave = {
      location,
      currentWeather,
      weeklyWeather,
    };
    var res = await favoriteService.save(favoriteToSave);
    if (!res) return null;
    dispatch({ type: 'ADD_FAVORITE', favoriteToSave });
    return res;
  };
}

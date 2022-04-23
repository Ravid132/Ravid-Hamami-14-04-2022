import { storageService } from './storageService.js';
import { makeId } from './utilService.js';

export const favoriteService = {
  query,
  save,
  remove,
  getById,
};

const STORAGE_KEY = 'favorites';

var gFavorites = [];

function query() {
  gFavorites = _loadFavorites();
  return Promise.resolve([...gFavorites]);
  //   return Promise.resolve(gFavorites);
}

function getById(id) {
  const favorite = gFavorites.find((favorite) => favorite._id === id);
  if (!favorite || typeof favorite === undefined) return Promise.reject();
  return Promise.resolve({ ...favorite });
}

function remove(id) {
  const idx = gFavorites.findIndex((favorite) => favorite._id === id);
  gFavorites.splice(idx, 1);
  if (!gFavorites.length) gFavorites = gFavorites.slice();
  storageService.store(STORAGE_KEY, gFavorites);
  return Promise.resolve();
}

function save(favoriteToSave) {
  //   if (favoriteToSave._id) return;
  var res = gFavorites.find(
    (favorite) => favorite._id === favoriteToSave.location
  );
  if (res) {
    return null;
  }
  favoriteToSave._id = favoriteToSave.location;

  gFavorites.push(favoriteToSave);

  storageService.store(STORAGE_KEY, gFavorites);
  return Promise.resolve(favoriteToSave);
}

function _loadFavorites() {
  let favorites = storageService.load(STORAGE_KEY);
  if (!favorites || !favorites.length) favorites = [];
  //   storageService.store(STORAGE_KEY, favorites);
  return favorites;
}

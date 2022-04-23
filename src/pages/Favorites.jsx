import { connect, useDispatch, useSelector } from 'react-redux';
import { Component, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForecastCardList } from '../cmps/ForecastCardList';
import {
  loadFavorites,
  removeFavorite,
} from '../store/actions/favoriteActions';
import { Bars } from 'react-loader-spinner';

export const Favorites = (props) => {
  // componentDidMount() {
  // }

  const { favorites } = useSelector((state) => state.favoriteModule);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

  const onRemoveFavorite = useCallback(async (favoriteId) => {
    dispatch(removeFavorite(favoriteId));
    dispatch(loadFavorites());
  }, []);

  if (!favorites)
    return (
      <Bars
        heigth='100'
        width='100'
        color='grey'
        ariaLabel='loading-indicator'
      />
    );
  return (
    <div className='favorites-container'>
      <h2>Favorites</h2>
      <ForecastCardList
        list={favorites}
        removeFavorite={onRemoveFavorite}
        isFavorite={true}
        // unit={unit}
      />
    </div>
  );
};

// Connects the store with the component, injects it to the props

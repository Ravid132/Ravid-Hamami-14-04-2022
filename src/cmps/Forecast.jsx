import React, { useState } from 'react';
import { addFavorite } from '../store/actions/favoriteActions';
import { ForecastCardList } from './ForecastCardList';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { helpers } from '../services/helpers';
import { Bars } from 'react-loader-spinner';
import { showErrorMsg } from '../services/eventBusService';
export const Forecast = ({
  currentWeather,
  weeklyWeather,
  location,
  unit,
  addFavorite,
  isFavorite,
}) => {
  async function onAddFavorite(ev) {
    ev.stopPropagation();
    var fav = await addFavorite(location, currentWeather, weeklyWeather);
    if (!fav) {
      showErrorMsg('Already exists in your favorite!');
    }
  }

  if (!currentWeather || typeof currentWeather === 'undefined')
    return (
      <Bars
        heigth='100'
        width='100'
        color='grey'
        ariaLabel='loading-indicator'
      />
    );
  return (
    <div
      className={`forecast-container background-image ${helpers.getImage(
        currentWeather.WeatherIcon
      )}`}
    >
      <div className='forecast-details'>
        <div className='forecast-info'>
          <img
            src={
              require(`../assets/imgs/weather-icons/${currentWeather.WeatherIcon}.png`)
                .default
            }
          />
          <div>
            <h2>{location}</h2>
            <h3>
              {currentWeather.Temperature.Metric.Value} {unit}
            </h3>
          </div>
        </div>
        <div className='favorite-actions'>
          {isFavorite && <FaHeart className='red' />}
          {!isFavorite && <FaRegHeart />}
          <button className='favorites-btn' onClick={onAddFavorite}>
            Add to Favorites
          </button>
        </div>
      </div>
      <h3>{currentWeather.WeatherText}</h3>

      <ForecastCardList list={weeklyWeather.DailyForecasts} unit={unit} />
    </div>
  );
};

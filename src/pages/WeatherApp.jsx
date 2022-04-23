import { connect, useDispatch, useSelector } from 'react-redux';
import { Component, useCallback, useEffect, useState } from 'react';
import { SearchForm } from '../cmps/SearchForm';
import { storageService } from '../services/storageService';
import axios from 'axios';
import { Forecast } from '../cmps/Forecast';
import { addFavorite, loadFavorites } from '../store/actions/favoriteActions';
import { favoriteService } from '../services/favoritesService';
import useGeoLocation from '../hooks/useGeoLocation';

const api = {
  key: 'baRT05mKK74zU4kaQYIKKXYbJr2GP4fA',
};

const WEEK_URL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
const CURRENT_URL = 'http://dataservice.accuweather.com/currentconditions/v1/';
const AUTOCOMPLETE_URL =
  'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';

const LOCATION_URL =
  'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

export const WeatherApp = (props) => {
  const [weeklyWeather, setWeeklyWeather] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [location, setLocation] = useState('Tel Aviv');
  const [unit, setUnit] = useState('C');
  const [isFavorite, setIsFavorite] = useState(false);
  const coordinates = useGeoLocation();
  const [currentCity, setCurrentCity] = useState('');

  const dispatch = useDispatch();

  const onAddFavorite = useCallback(
    async (location, currentWeather, weeklyWeather) => {
      dispatch(addFavorite(location, currentWeather, weeklyWeather));
      dispatch(loadFavorites());
      setIsFavorite(true);
    },
    []
  );

  // useEffect(() => {
  //   var currentCoor =
  //     coordinates.coordinates.lat.toString() +
  //     ',' +
  //     coordinates.coordinates.lng.toString();

  //   async function currentLocaiton(currentCoor) {
  //     const currentLocation = await axios.get(`${LOCATION_URL}`, {
  //       params: { apikey: api.key, q: currentCoor },
  //     });
  //     setCurrentCity(currentLocation.data.EnglishName, () => {
  //       onSubmit(currentCity);
  //       checkIsFavorite(currentCity);
  //     });
  //   }
  //   currentLocaiton(currentCoor);
  // }, [currentCity]);

  useEffect(() => {
    if (props.location.forecast) {
      setLocation(props.location.forecast.location);
      setCurrentWeather(props.location.forecast.currentWeather);
      setWeeklyWeather(props.location.forecast.weeklyWeather);
      checkIsFavorite(props.location.forecast.location);
    } else {
      var lat = coordinates.coordinates.lat ? coordinates.coordinates.lat : 32;
      var lng = coordinates.coordinates.lng ? coordinates.coordinates.lng : 34;
      var currentCoor = lat + ',' + lng;

      async function currentLocaiton(currentCoor) {
        const currentLocation = await axios.get(`${LOCATION_URL}`, {
          params: { apikey: api.key, q: currentCoor },
        });

        var city = currentLocation.data.EnglishName;
        setCurrentCity(city);
        if (!city || city === '') {
          console.log('default city Tel Aviv');
          onSubmit('Tel Aviv');
          checkIsFavorite('Tel Aviv');
        } else {
          console.log('current city:', city);
          onSubmit(city);
          checkIsFavorite(city);
        }
        // updateCity(currentCity);
      }
      currentLocaiton(currentCoor);
      dispatch(loadFavorites());
    }
  }, []);

  const updateCity = () => {
    if (!currentCity || currentCity === '') {
      console.log('default city Tel Aviv');
      onSubmit('Tel Aviv');
      checkIsFavorite('Tel Aviv');
    } else {
      console.log('current city:', currentCity);
      onSubmit(currentCity);
      checkIsFavorite(currentCity);
    }
  };

  const onSubmit = async (val) => {
    const autocompleteRes = await axios.get(`${AUTOCOMPLETE_URL}`, {
      params: { apikey: api.key, q: val },
    });
    setLocation(val);
    storageService.store('auto_complete', autocompleteRes);

    var location = autocompleteRes.data[0].Key;

    if (
      autocompleteRes.data[0].LocalizedName.toLowerCase() !== val.toLowerCase()
    )
      return; //error
    const currentWeatherRes = await axios.get(
      `${CURRENT_URL}${location}?apikey=${api.key}`
    );
    storageService.store('currentWeather', currentWeatherRes);
    setCurrentWeather(currentWeatherRes.data[0]);
    const weeklyWeatherRes = await axios(
      `${WEEK_URL}${location}?apikey=${api.key}`
    );
    storageService.store('weekly', weeklyWeatherRes);
    setWeeklyWeather(weeklyWeatherRes.data);

    dispatch(loadFavorites());
    checkIsFavorite(val);
  };

  const checkIsFavorite = async (location) => {
    if (!location) return;
    console.log('currloctaion', location);
    try {
      var currLocation = await favoriteService.getById(location);
      setIsFavorite(true);
    } catch (er) {
      setIsFavorite(false);
    }
    // if (!currLocation || typeof currLocation === undefined) {
    //   console.log('this is false');
    //   setIsFavorite(false);
    // } else {
    //   console.log('this is true');
    //   setIsFavorite(true);
    // }
  };

  return (
    <div className='weather-app'>
      <SearchForm onSubmitLocation={onSubmit} />

      {weeklyWeather && currentWeather && (
        <Forecast
          weeklyWeather={weeklyWeather}
          currentWeather={currentWeather}
          location={location}
          unit={unit}
          addFavorite={onAddFavorite}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
};

// Connects the store with the component, injects it to the props

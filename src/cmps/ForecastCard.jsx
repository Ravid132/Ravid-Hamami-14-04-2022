import { Link } from 'react-router-dom';
import { helpers } from '../services/helpers';
// import * as images from '../assets/imgs/weather-icons';
import { Bars } from 'react-loader-spinner';

export function ForecastCard({ forecast, unit, removeFavorite, isFavorite }) {
  const getDay = (time) => {
    var a = new Date(time * 1000);
    // var days = [
    //   'Sunday',
    //   'Monday',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    // ];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dayOfWeek = days[a.getDay()];
    return dayOfWeek;
  };

  function onRemoveFavorite(ev) {
    ev.stopPropagation();
    removeFavorite(forecast._id);
  }
  const newTo = {
    pathname: '/',
    forecast,
  };

  if (forecast.length === 0) return <h2>No Favorites yet..</h2>;
  if (!forecast)
    return (
      <Bars
        heigth='100'
        width='100'
        color='grey'
        ariaLabel='loading-indicator'
      />
    );
  return (
    <div className='forecast-card-conatiner'>
      {!isFavorite && (
        <div className='forecast-card'>
          <img
            src={
              require(`../assets/imgs/weather-icons/${forecast.Day.Icon}.png`)
                .default
            }
          />

          <h2 className='forecast-card-day'>{getDay(forecast.EpochDate)}</h2>

          <h3 className='forecast-card-temp'>
            {helpers.convert(forecast.Temperature.Minimum.Value, unit)}
            {unit} -{helpers.convert(forecast.Temperature.Maximum.Value, unit)}
            {unit}
          </h3>
        </div>
      )}
      {isFavorite && (
        <div
          className={`favorite-card background-image ${helpers.getImage(
            forecast.currentWeather.WeatherIcon
          )}`}
        >
          <h2>{forecast.location}</h2>
          <h3>
            {helpers.convert(
              forecast.currentWeather.Temperature.Metric.Value,
              unit
            )}
            C{/* {unit} */}
          </h3>
          <h3>{forecast.currentWeather.WeatherText}</h3>
          <button className='remove-btn' onClick={onRemoveFavorite}>
            Remove
          </button>
          <Link to={newTo}>Click to see the forecast!</Link>
        </div>
      )}
    </div>
  );
}

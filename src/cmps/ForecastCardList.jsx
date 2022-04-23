import { Bars } from 'react-loader-spinner';
import { ForecastCard } from './ForecastCard';

export const ForecastCardList = ({
  list,
  unit,
  removeFavorite,
  isFavorite = false,
}) => {
  if (!list)
    return (
      <Bars
        heigth='100'
        width='100'
        color='grey'
        ariaLabel='loading-indicator'
      />
    );
  return (
    <div className='forecast-list'>
      {!isFavorite &&
        list.map((forecast, index) => (
          <ForecastCard forecast={forecast} key={index} unit={unit} />
        ))}

      {isFavorite &&
        list.map((favorite) => (
          <ForecastCard
            forecast={favorite}
            key={favorite._id}
            removeFavorite={removeFavorite}
            unit={unit}
            isFavorite={isFavorite}
          />
        ))}
    </div>
  );
};

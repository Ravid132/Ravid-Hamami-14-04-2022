import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const api = {
  key: 'baRT05mKK74zU4kaQYIKKXYbJr2GP4fA',
};
const AUTOCOMPLETE_URL =
  'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';

export default function AutoCompleteInput() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  //   useEffect(() => {
  //     const cities = [];
  //     const promises = new Array(5)
  //     .fill()
  //     .map((v, i) => {
  //         const promises = await axios.get(`${AUTOCOMPLETE_URL}`, {
  //             params: { apikey: api.key, q: val },
  //           });
  //           return promises.data;
  //     });
  //   Promise.all(promises).then(cityArr => {
  //     return cityArr.map(value =>
  //       value
  //         .json()
  //         .then(({ Key }) =>
  //         cities.push(Key)
  //         )
  //     );
  //   });

  //     setOptions(cities);
  //   }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOut);
    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  const handleClickOut = (ev) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(ev.target)) {
      setDisplay(false);
    }
  };

  const setCity = (city) => {
    setSearch(city);
    setDisplay(false);
  };

  const handleSearch = (ev) => {
    const cities = [];
    const promises = new Array(5).fill().map(async (v, i) => {
      const promises = await axios.get(`${AUTOCOMPLETE_URL}`, {
        params: { apikey: api.key, q: ev.target.value },
      });
      return promises.data;
    });
    console.log('promises', promises);
    Promise.all(promises).then((cityArr) => {
      return cityArr.map((value) => {
        cities.push({ Key: value.Key, name: value.LocalizedName });
      });
    });

    setOptions(cities);
    setSearch(ev.target.value);
  };

  return (
    <div ref={wrapperRef}>
      <div>
        <input
          value={search}
          onClick={() => setDisplay(!display)}
          onChange={(ev) => handleSearch(ev)}
        ></input>
      </div>
      {display &&
        options
          .filter((name) => name.indexOf(search.toLowerCase()) > -1)

          .map((v, i) => {
            return (
              <div onClick={() => setCity(v)} key={i} tabIndex='0'>
                <span>
                  {v.Key} - {v.name}
                </span>
              </div>
            );
          })}
    </div>
  );
}

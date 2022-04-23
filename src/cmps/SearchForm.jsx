import React, { useState } from 'react';
import { eventBusService, showErrorMsg } from '../services/eventBusService';
import AutoCompleteInput from './AutoCompleteInput';

import UserModal from './UserModal';

export const SearchForm = ({ onSubmitLocation }) => {
  const [input, setInput] = useState('');
  // const [isModalShown, setIsModalShown] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input || input === '') return;
    onSubmitLocation(input);
  };

  const onChangeInput = (e) => {
    let value = e.target.value;
    let regex = /[^A-Za-z]/gi;
    if (value.match(regex)) {
      console.log('match');
      showErrorMsg('The Input can only accept English letters');
    }
    value = value.replace(regex, '');
    setInput(value);
  };

  return (
    <>
      <AutoCompleteInput />
      <form className='search-form' onSubmit={onSubmit}>
        <input
          className='search-input'
          placeholder='Search...'
          value={input}
          onChange={onChangeInput}
          required
        />
        <button className='submit-btn' type='submit' onClick={onSubmit}>
          Search
        </button>
      </form>
      {/* <UserModal handleModal={handleModal} isModalShown={isModalShown} /> */}
    </>
  );
};

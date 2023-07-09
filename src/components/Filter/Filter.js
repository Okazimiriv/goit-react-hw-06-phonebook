import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterBlock, FilterLabel, FilterInput } from './Filter.styled';
import { getFilter } from 'redux/selectors';

import { filterContacts } from 'redux/filterSlice';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleInput = event => {
    dispatch(filterContacts(event.target.value));
  };

  return (
    <FilterBlock>
      <FilterLabel>Find Contacts by name</FilterLabel>
      <FilterInput
        type="text"
        name="filter"
        value={filter}
        onChange={handleInput}
        placeholder="Enter contact's name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title=" Enter name may contain only letters, apostrophe, dash and spaces."
      />
    </FilterBlock>
  );
};

export default Filter;

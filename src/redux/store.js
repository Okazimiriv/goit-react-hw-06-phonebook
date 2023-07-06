import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer, filterReducer } from './reduser';
// import { contactsReducer } from './contactsSlice';
// import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

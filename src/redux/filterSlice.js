import { createSlice } from '@reduxjs/toolkit';

const filterState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterState,
  reducers: {
    filterContacts(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { filterContacts } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

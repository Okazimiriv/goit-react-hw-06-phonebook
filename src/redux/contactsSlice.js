import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialContactsState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '4591256' },
  { id: 'id-2', name: 'Hermione Kline', number: '4438912' },
  { id: 'id-3', name: 'Eden Clements', number: '6451779' },
  { id: 'id-4', name: 'Annie Copeland', number: '2279126' },
];

// const initialContactsState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare: (name, number) => {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

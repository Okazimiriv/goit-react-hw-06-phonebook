import { createSlice, nanoid } from '@reduxjs/toolkit';

// const initialContactsState = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

const initialContactsState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    addContact: {
      reducer(state, action) {
        // state.push(action.payload);
        const contact = { ...action.payload, id: nanoid() };
        state.push(contact);
      },
      // prepare: (name, number) => {
      //   return {
      //     payload: {
      //       id: nanoid(),
      //       name,
      //       number,
      //     },
      //   };
      // },
    },
    deleteContact(state, action) {
      // state.contacts = state.contacts.filter(
      //   contact => contact.id !== action.payload
      // );
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
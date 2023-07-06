import { addContact, deleteContact, getVisibleContacts } from './actions';

const initialContactsState = [
  { id: '1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: '2', name: 'Hermione Kline', number: '443-89-12' },
  { id: '3', name: 'Eden Clements', number: '645-17-79' },
  { id: '4', name: 'Annie Copeland', number: '227-91-26' },
];

export const contactsReducer = (state = initialContactsState, action) => {
  switch (action.type) {
    case 'addContact.type':
      return [...state, action.payload];
    case 'deleteContact.type':
      return state.filter(contact => contact.id !== action.payload);
    default:
      return state;
  }
};

export const filterReducer = (state = initialContactsState, action) => {
  switch (action.type) {
    case 'getVisibleContacts.type':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

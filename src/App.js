// import { useState, useEffect } from 'react';

// import shortId from 'shortid';
import { Container } from './App.styled';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Container from 'components/Container';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
// import { useDispatch } from 'react-redux';
// import initialContacts from '../src/contacts.json';

export const App = () => {
  return (
    <Container>
      <h1>Phonebook</h1>
      {/* <ContactForm onAddContact={onContactFormSubmit} /> */}
      <ContactForm />
      <ToastContainer
        autoClose={3000}
        transition={Zoom}
        theme="colored"
        style={{ top: '1px' }}
      />
      <h2>Contacts</h2>
      {/* <Filter value={filter} onChange={changeFilter} /> */}
      <Filter />
      <ContactList
      // contacts={getVisibleContacts()}
      // onDeleteContact={deleteContact}
      />
    </Container>
  );
};

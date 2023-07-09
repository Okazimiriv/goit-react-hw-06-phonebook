import { Container } from './App.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

export const App = () => {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Container>
  );
};

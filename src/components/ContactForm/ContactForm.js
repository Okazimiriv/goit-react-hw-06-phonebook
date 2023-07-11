import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

import { Form, Label, Input, StyledButton } from './ContactForm.styled';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const listContacts = useSelector(getContacts);

  const handleChange = evt => {
    switch (evt.target.name) {
      case 'name':
        setName(evt.target.value);
        break;
      case 'number':
        setNumber(evt.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (name.includes(Number(name))) {
      return toast.warn('Name may contain only letters', {
        position: toast.POSITION.TOP_CENTER,
        icon: false,
      });
    }

    const newContact = { name, number };
    if (
      listContacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      toast.warn(`${newContact.name} is already in contacts`, {
        position: toast.POSITION.TOP_CENTER,
        icon: false,
      });
      resetForm();
      return;
    }

    dispatch(addContact(name, number));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <ToastContainer
        autoClose={3000}
        transition={Zoom}
        theme="colored"
        style={{ top: '1px' }}
      />
      <Form autoComplete="on" onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={name}
          placeholder="Harry Potter"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <Label htmlFor="number">Number</Label>
        <Input
          id="number"
          type="phone"
          name="number"
          value={number}
          placeholder="765-43-21"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          title="The phone number format ###-##-##"
          required
          onChange={handleChange}
        />
        <StyledButton type="submit">Add contact</StyledButton>
      </Form>
    </>
  );
};

export default ContactForm;

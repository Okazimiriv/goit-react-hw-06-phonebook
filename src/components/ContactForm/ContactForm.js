import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

import shortId from 'shortid';
// import IconButton from 'components/IconButton/IconButton';

import {
  Form,
  FormLabel,
  FormField,
  ErrorMessage,
  StyledButton,
} from './ContactForm.styled';

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const listContacts = useSelector(getContacts);

  const nameInputId = shortId.generate();
  const numberInputId = shortId.generate();

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

  const handleSubmit = (event, { resetForm }) => {
    event.preventDefault();
    // if (!name.trim() || !number.trim())
    //   return toast.warn('Please, fill the field.', {
    //     position: toast.POSITION.TOP_CENTER,
    //   });

    const data = {
      name: name,
      number: number,
    };
    if (
      listContacts.some(
        item => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      return toast.warn(`${data.name} is already in contacts.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      dispatch(addContact(data));
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="on">
        <FormLabel>Name</FormLabel>
        <FormField
          id={nameInputId}
          type="text"
          name="name"
          value={name}
          placeholder="Harry Potter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <ErrorMessage name="name" component="span" />
        <FormLabel>Number</FormLabel>
        <FormField
          id={numberInputId}
          type="tel"
          name="number"
          value={number}
          placeholder="765-43-21"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
        <ErrorMessage name="number" component="span" />
        <ToastContainer
          autoClose={3000}
          transition={Zoom}
          theme="colored"
          style={{ top: '1px' }}
        />
        <StyledButton type="submit">Add contact</StyledButton>
      </Form>
    </Formik>
  );
};

export default ContactForm;

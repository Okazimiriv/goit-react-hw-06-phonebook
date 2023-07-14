import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Form,
  FormLabel,
  FormField,
  ErrorMessage,
  StyledButton,
} from './ContactForm.styled';

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
  const dispatch = useDispatch();
  const listContacts = useSelector(getContacts);

  const handleSubmit = contactData => {
    const { name, number } = contactData;
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
      return;
    }

    dispatch(addContact(name, number));
  };

  return (
    <>
      <ToastContainer
        autoClose={3000}
        transition={Zoom}
        theme="colored"
        style={{ top: '1px' }}
      />
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          // console.log(values);
          handleSubmit({ ...values });
          resetForm();
        }}
      >
        <Form autoComplete="on">
          <FormLabel>Name</FormLabel>
          <FormField type="text" name="name" placeholder="Harry Potter" />
          <ErrorMessage name="name" component="span" />
          <FormLabel>Number</FormLabel>
          <FormField type="phone" name="number" placeholder="765-43-21" />
          <ErrorMessage name="number" component="span" />
          <StyledButton type="submit">Add contact</StyledButton>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;

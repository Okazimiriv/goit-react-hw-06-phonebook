import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

import {
  Form,
  Label,
  Input,
  StyledButton,
  ErrorMessage,
} from './ContactForm.styled';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [numberDirty, setNumberDirty] = useState(false);
  const [nameError, setNameError] = useState(
    'Please, enter the name of the contact'
  );
  const [numberError, setNumberError] = useState('Please, enter phone number');

  const dispatch = useDispatch();
  const listContacts = useSelector(getContacts);

  // const handleChange = evt => {
  //   switch (evt.target.name) {
  //     case 'name':
  //       setName(evt.target.value);
  //       break;
  //     case 'number':
  //       setNumber(evt.target.value);
  //       break;
  //     default:
  //       return;
  //   }
  // };

  const handleChangeName = e => {
    setName(e.target.value);
    const reName = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
    if (!reName.test(String(e.target.value).toLowerCase())) {
      setNameError('Name is not correct');
    } else {
      setNameError('');
    }
  };

  const handleChangeNumber = e => {
    setNumber(e.target.value);
    const reNumber = '/(?d{3})?([-/.])d{2}/1/d{2}/';
    // const reNumber =
    //   '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}';
    if (!reNumber.test(String(e.target.value))) {
      setNumberError('The expected format is like ###-##-##');
    } else {
      setNumberError('');
    }
  };

  const blurHandler = e => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'number':
        setNumberDirty(true);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = { name, number };
    if (
      listContacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      toast.warn(`${newContact.name} is already in contacts`, {
        position: toast.POSITION.TOP_CENTER,
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
    setNumberDirty(false);
    setNameDirty(false);
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
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Harry Potter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => handleChangeName(e)}
          onBlur={e => blurHandler(e)}
        />
        {nameDirty && nameError && <ErrorMessage>{nameError}</ErrorMessage>}
        <Label>Number</Label>
        <Input
          type="tel"
          name="number"
          value={number}
          placeholder="765-43-21"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => handleChangeNumber(e)}
          onBlur={e => blurHandler(e)}
        />
        {numberDirty && numberError && (
          <ErrorMessage>{numberError}</ErrorMessage>
        )}
        <StyledButton type="submit">Add contact</StyledButton>
      </Form>
    </>
  );
};

export default ContactForm;

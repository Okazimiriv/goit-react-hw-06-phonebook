import { ReactComponent as DeleteIcon } from '../../icons/remove.svg';
import { ButtonIcon } from '../IconButton/IconButton.styled';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

import {
  ContactListBlock,
  ContactItem,
  ContactInfo,
  ContactName,
  // ContactButton,
} from './ContactList.styled';

const ContactList = ({ onDeleteContact }) => {
  const contacts = useSelector(getContacts);

  return (
    <ContactListBlock>
      {contacts.map(contact => {
        const { id, name, number } = contact;
        return (
          <ContactItem key={id}>
            {' '}
            <ContactInfo>
              {name}:<ContactName>{number}</ContactName>
            </ContactInfo>
            <ButtonIcon onClick={() => onDeleteContact(id)}>
              <DeleteIcon width="32" height="32" fill="teal"></DeleteIcon>
            </ButtonIcon>
          </ContactItem>
        );
      })}
    </ContactListBlock>
  );
};

export default ContactList;

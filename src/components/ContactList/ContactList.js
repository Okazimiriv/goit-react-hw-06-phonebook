// import { ReactComponent as DeleteIcon } from '../../icons/remove.svg';
// import { DeleteButton } from '../ContactList/ContactList.styled';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { IoClose } from 'react-icons/io5';
import {
  ContactListBlock,
  ContactItem,
  ContactInfo,
  ContactName,
  DeleteButton,
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
            <DeleteButton
              type="button"
              // onClick={() => dispatch(deleteContact(id))}
            >
              <IoClose size={32} fill="teal" />
            </DeleteButton>
          </ContactItem>
        );
      })}
    </ContactListBlock>
  );
};

export default ContactList;

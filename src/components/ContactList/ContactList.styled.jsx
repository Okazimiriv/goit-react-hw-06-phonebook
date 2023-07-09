import styled from '@emotion/styled';
 
export const ContactListBlock = styled.ul`
   padding-left: 0px;
`;

export const ContactItem = styled.li`
  width: 400px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background-color: #fff;
`;

export const ContactInfo = styled.p`
  display: flex;
  font-size: 18px;
`;
export const ContactName = styled.span`
  margin-left: 15px;
`;

export const ContactButton = styled.button`
  padding: 5px 20px;

  background-color: teal;
  border: none;
  outline: none;
  color: aliceblue;
  border-radius: 5px;

  &:hover,
  &:focus {
    background-color: #008080a8;
  }
`;

export const DeleteButton = styled.button` 
  margin: 0;
  margin-right: 50px;
  padding: 10px;
  border: none;   
  background-color: transparent;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  

  transform: scale(1);
  transition: transform 200ms;

  &:hover,
  &:focus {
    transform: scale(1.2);
  `;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 700;

  text-align: center;
  margin-bottom: 20px;
`;

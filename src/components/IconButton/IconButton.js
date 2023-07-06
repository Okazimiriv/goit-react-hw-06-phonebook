import React from 'react';
// import { IconButton } from './IconButton.styled';

const IconButton = ({ children, onClick, ...allyProps }) => (
  <button type="button" onClick={onClick} {...allyProps}>
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

export default IconButton;

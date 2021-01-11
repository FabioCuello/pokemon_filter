import React from 'react';
import propTypes from 'prop-types';

export const Buttom = ({ name, size, effect, color, additional, click }) => {
  const CustomClassName = `${effect} ${color} btn${size} ${additional}`;

  return (
    <buttom onClick={click} className={CustomClassName}>
      {name}
    </buttom>
  );
};

Buttom.defaultProps = {
  size: '',
  effect: 'waves-effect',
  color: 'waves-light',
  additional: '',
  click: () => {}
};

Buttom.propTypes = {
  name: propTypes.string.isRequired,
  size: propTypes.string,
  effect: propTypes.string,
  color: propTypes.string,
  additional: propTypes.string,
  click: propTypes.func
};

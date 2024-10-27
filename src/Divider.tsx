import React from 'react';
import colors from './color';

const Divider: React.FC = () => {
  return (
    <div
      style={{
        height: '1px',
        backgroundColor: colors.black,
        width: '100%',
        opacity: '0.2',
      }}
    />
  );
};

export default Divider;
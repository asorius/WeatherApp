import React from 'react';

export default function Header(props) {
  const { name } = props;
  return (
    <div className="row s12">
      <div className="center">
        <h1>{name}</h1>
      </div>
    </div>
  );
}

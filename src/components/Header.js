import React from 'react';

export default function Header(props) {
  const { name } = props;
  return (
    <div className="title">
      <h1>{name}</h1>
    </div>
  );
}

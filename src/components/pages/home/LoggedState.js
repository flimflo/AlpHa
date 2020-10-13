import React from "react";

export const LoggedState = ({ user: { name } = { name: 'Brenaro '} }) => (
  
    <h3>{`¡Bienvenido ${name}!`}</h3>
);

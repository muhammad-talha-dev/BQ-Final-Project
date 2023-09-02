import React, { useContext } from 'react';
import Admin from './Admin';
import User from './User';
import Guest from './Guest';
import { GlobalContext } from './Context/context';
import { decodeToken } from 'react-jwt';

const componentByRole = {
  admin: Admin,
  user: User,
  guest: Guest,
};

const getUserRole = (userRole) => componentByRole[userRole] || componentByRole['guest'];

function App() {
  const { state, dispatch } = useContext(GlobalContext);

  const decodeUser = (token) => {
    if (!token) {
      return undefined;
    } else {
      const res = decodeToken(token);
      return res?.role;
    }
  };

  const currentToken = decodeUser(state.token);

  const CurrentRole = currentToken ? getUserRole(currentToken) : getUserRole('guest');

  return (
    <div>
      <CurrentRole />
    </div>
  );
}

export default App;

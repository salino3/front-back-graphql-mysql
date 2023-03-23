import React from 'react';
import { CreateUser, UsersList } from '../components';

export const Home: React.FC = () => {
  return (
    <>
      <CreateUser />
      <UsersList />
    </>
  );
}

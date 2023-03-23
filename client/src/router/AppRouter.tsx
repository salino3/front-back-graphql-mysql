import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { Home, Update } from '../pages';
import { root, update } from './interfaces';

export const AppRouter: React.FC = () => {

  return (
    <Routes>
      <Route path={root} element={<Home />} />
      <Route path={update} element={<Update />} />
    </Routes>
  );
}

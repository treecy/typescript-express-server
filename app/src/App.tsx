import React from "react";
import AppRouter from './routes';
import './style/vendor.scss';
import Header from 'components/Header';

export default () => (
  <div className="App">
    <AppRouter>
      <Header />
    </AppRouter>
  </div>
);

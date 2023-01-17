import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutersLinks } from './constants/RoutersLinks';
import Page from './Page';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path={`/mercadeo/${RoutersLinks.Peru}`} element={<Page nombre={'Peru'} />} />
        <Route exact path={`/mercadeo/${RoutersLinks.Bolivia}`} element={<Page nombre={'Bolivia'} />} />
        <Route exact path={`/mercadeo/${RoutersLinks.Ecuador}`} element={<Page nombre={'Ecuador'} />} />
      </Routes>
    </div>
  );
}

export default App;

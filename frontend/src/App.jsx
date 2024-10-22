import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CakeList from './components/CakeList';
import Header from './components/Header';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <CakeList />
    </>
  );
}

export default App;

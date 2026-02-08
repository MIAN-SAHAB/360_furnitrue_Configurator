import React, { useState } from 'react';
import Homepage from './components/Homepage';
import Configurator from './components/Configurator';
import Navigation from './components/Navigation';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'configurator'

  return (
    <>
      {currentPage === 'home' ? (
        <Homepage onNavigateToConfigurator={() => setCurrentPage('configurator')} />
      ) : (
        <>
          <Navigation onNavigateHome={() => setCurrentPage('home')} />
          <Configurator />
        </>
      )}
    </>
  );
}
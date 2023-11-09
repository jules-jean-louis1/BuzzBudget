
function App() {

  return (
    <>

    </>
  )
}

export default App

// semi-working code for page navigation

/* import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import BudgetPage from './components/BudgetPage';

function App() {
  const [page, setPage] = useState('landing');

  const renderPage = () => {
    switch(page) {
      case 'landing':
        return <LandingPage />;
      case 'budget':
        return <BudgetPage />;
      default:
        return <LandingPage />;
    }
  }

  return (
    <div>
      <button onClick={() => setPage('landing')}>Go to Landing Page</button>
      <button onClick={() => setPage('budget')}>Go to Budget Page</button>
      {renderPage()}
    </div>
  );
}

export default App; */
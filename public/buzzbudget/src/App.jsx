import { useState } from "react"
import Homepage from "./pages/Home/homepage.jsx";

function App() {
  const [page, setPage] = useState('homepage');

  const renderPage = () => {
    switch(page) {
      case 'homepage':
        return <Homepage />;
      default:
        return <Homepage />;
    }
  }
  return (
    <>
      {renderPage()}
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
import React, { useState } from 'react';
import { FrappeProvider } from 'frappe-react-sdk';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Expenses } from './pages/Expenses';
import { Login } from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
      <BrowserRouter basename={import.meta.env.VITE_BASE}>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <Expenses /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </FrappeProvider>
  );
}
export default App;

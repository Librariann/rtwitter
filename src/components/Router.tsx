import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';

interface IProps {
  isLoggedIn: boolean;
}

function RootRouter({ isLoggedIn }: IProps) {
  return (
    <>
      {isLoggedIn && <Navigation />}
      {isLoggedIn ? (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      )}
    </>
  );
}

export default RootRouter;

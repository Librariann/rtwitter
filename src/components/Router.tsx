import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';

interface IProps {
  isLoggedIn: boolean;
  userObj: any;
  refreshUser: () => void;
}

function RootRouter({ isLoggedIn, userObj, refreshUser }: IProps) {
  return (
    <>
      {isLoggedIn && <Navigation userObj={userObj} />}
      {isLoggedIn ? (
        <div>
          <Routes>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
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

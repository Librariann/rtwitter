import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import { IProps } from 'interface/common';

interface IPropsRouter {
  isLoggedIn: boolean;
  userObj: IProps;
  refreshUser: () => void;
}

function RootRouter({ isLoggedIn, userObj, refreshUser }: IPropsRouter) {
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

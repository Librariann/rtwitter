import React, { useState, useEffect } from 'react';
import RootRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObjUid, setUserObjUid] = useState('');
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObjUid(user.uid);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <span>
      {init ? (
        <RootRouter isLoggedIn={isLoggedIn} userObjUid={userObjUid} />
      ) : (
        'Initializing...'
      )}
    </span>
  );
}

export default App;

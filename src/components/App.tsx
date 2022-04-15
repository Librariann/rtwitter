import React, { useState, useEffect } from 'react';
import RootRouter from 'components/Router';
import { authService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: () =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: () =>
        updateProfile(user, { displayName: user.displayName }),
    });
  };
  return (
    <Container>
      {init ? (
        <RootRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}
    </Container>
  );
}

export default App;

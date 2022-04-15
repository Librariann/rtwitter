import React, { useState, useEffect } from 'react';
import RootRouter from 'components/Router';
import { authService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import { IProps } from 'interface/common';

const Container = styled.div`
  width: 100%;
  margin-top: 50px;
`;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState<IProps>(null);
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

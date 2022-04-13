import React from 'react';
import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };
  return (
    <>
      <button type="button" onClick={onLogOutClick}>
        로그아웃!
      </button>
      <div>Profile</div>
    </>
  );
}

export default Profile;

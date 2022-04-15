import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from '@firebase/firestore';
import { orderBy, where } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { IProps } from 'interface/common';

interface IPropsObj {
  userObj: IProps;
  refreshUser: () => void;
}

function Profile({ userObj, refreshUser }: IPropsObj) {
  const [newDisplayName, setNewDisplayName] = useState('');
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const getMyRwits = async () => {
    const rwits = query(
      collection(dbService, 'rwits'),
      where('creatorId', '==', `${userObj.uid}`),
      orderBy('createdAt', 'desc'),
    );
    await getDocs(rwits);
  };
  useEffect(() => {
    getMyRwits();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button type="button" onClick={onLogOutClick}>
        로그아웃!
      </button>
      <div>{`${userObj.displayName}의`}Profile</div>
    </>
  );
}

export default Profile;

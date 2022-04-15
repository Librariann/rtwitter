import Rwit from 'components/Rwit';
import { dbService, storageService } from 'fbase';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { v4 } from 'uuid';
import React, { useEffect, useRef, useState } from 'react';
import { IProps } from 'interface/common';

interface IPropsObj {
  userObj: IProps;
}

function Home({ userObj }: IPropsObj) {
  console.log(userObj);
  const [rwit, setRwit] = useState('');
  const [rwits, setRwits] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const q = query(
      collection(dbService, 'rwits'),
      orderBy('createdAt', 'desc'),
    );
    onSnapshot(q, (snapshot) => {
      const rwitArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRwits(rwitArr);
    });
  }, []);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== null) {
      const attachmentRefRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(
        attachmentRefRef,
        attachment,
        'data_url',
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const rwitObj = {
      text: rwit,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, 'rwits'), rwitObj);
    setRwit('');
    setAttachment(null);
    inputRef.current.value = '';
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setRwit(value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment(reader.result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={rwit}
          onChange={onChange}
        />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onFileChange}
        />
        <input type="submit" value="rtwit" />
        {attachment && (
          <div>
            <img src={attachment} width="500px" alt="test" />
            <button type="button" onClick={onClearAttachment}>
              ClearPhoto
            </button>
          </div>
        )}
      </form>
      <div>
        {rwits.map((item) => (
          <Rwit
            key={item.id}
            rwitObj={item}
            isOwner={item.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

function Home() {
  const [rwit, setRwit] = useState('');
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(collection(dbService, 'rwits'), {
      rwit,
      createAt: Date.now(),
    });
    setRwit('');
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setRwit(value);
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
        <input type="submit" value="rtwit" />
      </form>
    </div>
  );
}

export default Home;

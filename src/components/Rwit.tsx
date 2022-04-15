import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

function Rwit({ rwitObj, isOwner }: any) {
  const [editing, setEditing] = useState(false);
  const [newRwit, setNewRwit] = useState(rwitObj.text);
  const RwitTextRef = doc(dbService, 'rwits', `${rwitObj.id}`);
  const onDeleteClick = async () => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm('Are you sure delete this rwit?');
    if (ok === true) {
      await deleteDoc(RwitTextRef);
      await deleteObject(ref(storageService, rwitObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const RwitTextRef = doc(dbService, 'rwits', `${rwitObj.id}`);
    await updateDoc(RwitTextRef, {
      text: newRwit,
    });
    setEditing(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNewRwit(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newRwit}
              placeholder="Edit yout rwit!"
              onChange={onChange}
              required
            />
            <input type="submit" value="update rwit" />
          </form>
          <button type="button" onClick={toggleEditing}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{rwitObj.text}</h4>
          {rwitObj.attachmentUrl && (
            <img
              src={rwitObj.attachmentUrl}
              width="10%"
              height="10%"
              alt="url"
            />
          )}
          {isOwner && (
            <>
              <button type="button" onClick={onDeleteClick}>
                Delete Rwit
              </button>
              <button type="button" onClick={toggleEditing}>
                Edit Rwit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Rwit;

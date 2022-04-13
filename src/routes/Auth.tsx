import { authService, authCheck } from 'fbase';
import React, { useState } from 'react';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authCheck.createUserWithEmailAndPassword(authService, email, password);
      } else {
        data = await authCheck.signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (e) {
      const result = (e as Error).message;
      setError(result);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const { name } = target;
    let provider;
    if (name === 'google') {
      provider = new authCheck.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new authCheck.GithubAuthProvider();
    }
    const data = await authCheck.signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required value={email} onChange={onChange} />
        <input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} />
        <input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />
        {error}
      </form>
      <button type="button" onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </button>
      <div>
        <button type="button" name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button type="button" name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;

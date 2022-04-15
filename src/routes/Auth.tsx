import { authService, authCheck } from 'fbase';
import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
`;

const Div = styled.div``;

const Input = styled.input`
  border: 1px solid #fff;
  display: block;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  margin-top: 10px;
`;

const InputSubmit = styled.input`
  margin-top: 10px;
  padding: 3px 40px 3px 40px;
  border-radius: 10px;
  display: block;
  text-align: center;
  background-color: green;
`;

const ButtonToggleAccount = styled.button`
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: white;
`;

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
      if (newAccount) {
        await authCheck.createUserWithEmailAndPassword(
          authService,
          email,
          password,
        );
      } else {
        await authCheck.signInWithEmailAndPassword(
          authService,
          email,
          password,
        );
      }
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
    await authCheck.signInWithPopup(authService, provider);
  };
  return (
    <Div>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <InputSubmit
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error}
      </Form>
      <ButtonToggleAccount type="button" onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </ButtonToggleAccount>
      <div>
        <button type="button" name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button type="button" name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </Div>
  );
}

export default Auth;

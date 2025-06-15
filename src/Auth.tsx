import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { User } from './User';
import colors from './color';

const REQUEST_LOGIN_CHALLENGE = gql`
  mutation RequestLoginChallenge($username: String!) {
    requestLoginChallenge(username: $username) {
      publicKey
    }
  }
`;

const COMPLETE_LOGIN = gql`
  mutation CompleteLogin($username: String!, $credential: JSON!) {
    completeLogin(username: $username, credential: $credential) {
      id
      name
      username
    }
  }
`;

const REQUEST_REG_CHALLENGE = gql`
  mutation RequestRegistrationChallenge($username: String!, $name: String!) {
    requestRegistrationChallenge(username: $username, name: $name) {
      publicKey
    }
  }
`;

const COMPLETE_REGISTRATION = gql`
  mutation CompleteRegistration($username: String!, $name: String!, $credential: JSON!) {
    completeRegistration(username: $username, name: $name, credential: $credential) {
      id
      name
      username
    }
  }
`;

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [requestLoginChallenge] = useMutation(REQUEST_LOGIN_CHALLENGE);
  const [completeLogin] = useMutation(COMPLETE_LOGIN);
  const [requestRegChallenge] = useMutation(REQUEST_REG_CHALLENGE);
  const [completeRegistration] = useMutation(COMPLETE_REGISTRATION);

  useEffect(() => {
    if (mode === 'register') {
      const generated = User.makeGeneratedUser();
      setName(generated.name);
      setUsername(generated.username);
    }
  }, [mode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await requestLoginChallenge({ variables: { username } });
      const publicKey = data?.requestLoginChallenge?.publicKey;
      const credential = await navigator.credentials.get({ publicKey } as CredentialRequestOptions);
      const { data: finishData } = await completeLogin({ variables: { username, credential } });
      const userResp = finishData?.completeLogin;
      if (userResp) {
        const user = new User(userResp.name, userResp.username, userResp.id);
        User.setCurrentUser(user);
        User.saveToLocalStorage();
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await requestRegChallenge({ variables: { username, name } });
      const publicKey = data?.requestRegistrationChallenge?.publicKey;
      const credential = await navigator.credentials.create({ publicKey } as CredentialCreationOptions);
      const { data: finishData } = await completeRegistration({ variables: { username, name, credential } });
      const userResp = finishData?.completeRegistration;
      if (userResp) {
        const user = new User(userResp.name, userResp.username, userResp.id);
        User.setCurrentUser(user);
        User.saveToLocalStorage();
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>{mode === 'login' ? 'Sign In' : 'Register'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form
        onSubmit={mode === 'login' ? handleLogin : handleRegister}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {mode === 'register' && (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            style={{
              padding: '12px',
              fontSize: '1.2em',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          />
        )}
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          style={{
            padding: '12px',
            fontSize: '1.2em',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px 15px',
            backgroundColor: colors.blue,
            color: colors.white,
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '1em',
            fontWeight: 700,
          }}
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <button
        style={{
          marginTop: '20px',
          background: 'none',
          border: 'none',
          color: colors.blue,
          cursor: 'pointer',
          textDecoration: 'underline',
          fontSize: '1em',
        }}
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
      >
        {mode === 'login'
          ? 'Need an account? Register'
          : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default Auth;

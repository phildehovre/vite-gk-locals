import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import app, { auth, provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup } from 'firebase/auth';

const Login = () => {


  const auth = getAuth()

  console.log(auth.currentUser)

  const handleSignInWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider)
  };


  return (
    <div>
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Login;

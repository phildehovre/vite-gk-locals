import React from 'react';
// import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup } from 'firebase/auth';

const Login = () => {


  const auth = getAuth()
  const navigate = useNavigate()

  console.log(auth.currentUser)

  const handleSignInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider)

    }
    catch (err) {
      alert(err)
    }

    finally {
      navigate('/')
    }
  };


  return (
    <div>
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Login;

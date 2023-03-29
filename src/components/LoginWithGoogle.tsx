import React from 'react';
// import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { provider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {


  const auth = getAuth()
  const navigate = useNavigate()

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
      <button onClick={handleSignInWithGoogle}>
        <FontAwesomeIcon icon={faGoogle} />
        <span style={{ padding: '0 .5em' }}>
          Sign in with Google
        </span>
      </button>

    </div>
  );
};

export default Login;

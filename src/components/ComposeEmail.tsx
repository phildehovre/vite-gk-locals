import React from 'react'
import EmailSender from './EmailSender'
import { useBusinesses } from '../util/db';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
// import './ComposeEmail.scss'

function ComposeEmail() {

    const auth = getAuth()
    const [user, loading, errors] = useAuthState(auth);
    const { data, isLoading, error } = useBusinesses(auth.currentUser?.uid);


    return (
        <div className='compose-ctn'>
            <h4>New E-mail campaign:</h4>
            <div >
                <label className='compose-label'>
                </label>
                <input type='text' className='compose-input subject' placeholder='Subject...' />
            </div >
            <div >
                <label className='compose-label'>
                </label>
                <textarea id="email-content" name="content" placeholder='Content...' className='compose-input content'
                    rows={15} cols={35}
                >
                </textarea>
            </div >
            <EmailSender customers={data} />
        </div >
    )
}

export default ComposeEmail
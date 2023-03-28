import React from 'react'
import EmailSender from './EmailSender'
import { useBusinesses } from '../util/db';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import './ComposeEmail.scss'

function ComposeEmail() {

    const auth = getAuth()
    const [user, loading, errors] = useAuthState(auth);
    const { data, isLoading, error } = useBusinesses(auth.currentUser?.uid);


    return (
        <div className='compose-ctn'>
            <span>
                <label className='compose-label'>Subject
                </label>
                <input type='text' className='compose-input subject' />
            </span>
            <span>
                <label className='compose-label'>Content
                </label>
                <textarea id="email-content" name="content" className='compose-input content'
                    rows={15} cols={35}
                >
                </textarea>
            </span>
            <EmailSender customers={data} />
        </div >
    )
}

export default ComposeEmail
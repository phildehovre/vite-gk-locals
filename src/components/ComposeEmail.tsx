import React from 'react'
import EmailSender from './EmailSender'
import { useBusinesses } from '../util/db';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import './ComposeEmail.scss'

function ComposeEmail() {

    const auth = getAuth()
    const [user, loading, errors] = useAuthState(auth);
    const { data, isLoading, error } = useBusinesses(auth.currentUser?.uid);
    const [emailSubject, setEmailSubject] = React.useState<string>('')
    const [emailContent, setEmailContent] = React.useState<string>('')
    const [displayCheck, setDisplayCheck] = React.useState<boolean>(false)

    const onSend = () => {
        setEmailContent('')
        setEmailSubject('')
        setDisplayCheck(true)
        setTimeout(() => {
            setDisplayCheck(false)
        }, 2000)
    }



    return (
        <div className='compose-ctn'>
            <h4>New E-mail campaign:</h4>
            <div >
                <label className='compose-label'>
                </label>
                <input type='text' className='compose-input subject' placeholder='Subject...'
                    onChange={(e) => { setEmailSubject(e.target.value) }}
                    value={emailSubject}
                />
            </div >
            <div >
                <label className='compose-label'>
                </label>
                <textarea id="email-content" name="content" placeholder='Content...' className='compose-input content'
                    rows={15} cols={25}
                    onChange={(e) => { setEmailContent(e.target.value) }}
                    value={emailContent}
                >
                </textarea>
            </div >
            <span style={{ display: 'flex' }}>
                <EmailSender customers={data} content={emailContent} subject={emailSubject} onSend={onSend} />
                {displayCheck && <FontAwesomeIcon icon={faCircleCheck} color='lightgreen' size='2x'
                    className={`check ${displayCheck ? 'displayed' : ''}`} />}
            </span>
        </div >
    )
}

export default ComposeEmail
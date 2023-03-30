import React, { useState } from 'react';
import firebase from 'firebase/app';
import { FirebaseFunctions } from '@firebase/functions-types';
import { apiURL } from '../internal/fixedStrings';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// import './SendEmailTestButton.scss'
// Import the FirebaseFunctions type


const SendEmailsButton = () => {
    const auth = getAuth()
    const [user] = useAuthState(auth);

    const handleSendEmail = () => {
        sendTransactionalMailAccepted('ph.dehovre@gmail.com', user?.email, 'test', 'test')
    }



    const sendTransactionalMailAccepted = (
        recipientMail: string,
        adminMail: string | null | undefined,
        mailTitle: string,
        mailBody: string
    ) => {

        var templateParams = {
            recipientMail: recipientMail,
            adminMail: adminMail,
            mailTitle: mailTitle,
            mailBody: mailBody
        }

        var requestData = {
            recipientMail: recipientMail,
            templatepParams: templateParams,
            templateId: 1
        }

        var requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        };

        fetch(apiURL + "/api/sendMail", requestOptions).then((response) => {
            return response.json()
        })
    }

    return (<>
        <button
            onClick={handleSendEmail}
            className='send-btn'
        >
            {/* {isLoading ? 'Sending Emails...' : 'Send Emails'} */}
            Send
        </button >
        <div className='send-btn'></div>
    </>
    );
};

export default SendEmailsButton
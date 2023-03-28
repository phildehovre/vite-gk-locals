import React, { SetStateAction, useState } from 'react';

function EmailSender() {
    const [response, setResponse] = useState<any>('');

    function sendEmail() {
        fetch('https://api.sendinblue.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': import.meta.env.VITE_REACT_APP_SENDINBLUE_APIKEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "sender": {
                    "name": "Phil De Hovre",
                    "email": "info@thegrovew5.co.uk"
                },
                "to": [
                    {
                        "email": "ph.dehovre@gmail.com",
                        "name": "John Doe"
                    },
                    {
                        "email": "dehovre_ph@hotmail.com",
                        "name": "John Doe"
                    }
                ],
                "subject": "Hello world",
                "htmlContent": "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
            })
        })
            .then(response => setResponse(response))
            .catch(error => console.error(error));
    }

    return (
        <div>
            <button onClick={sendEmail}>Send Email</button>
            {/* {response && <p>Response: {response}</p>} */}
        </div>
    );
}

export default EmailSender;

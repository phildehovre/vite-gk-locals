import React, { SetStateAction, useState } from 'react';

function EmailSender(props: { customers: any }) {
    const [response, setResponse] = useState<any>('');

    function sendEmail(content: string, subject: string) {

        for (let customer of props.customers) {
            const { firstName, lastName, email } = customer;
            try {

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
                                "email": email,
                                "name": `${firstName} ${lastName}`
                            },
                        ],
                        "templateId": 1,
                        "params": {
                            "firstName": firstName,
                            "lastName": lastName,
                            "content": content
                        },
                        "subject": subject,
                    })
                })
                    .then(response => setResponse(response))
                    .catch(error => console.error(error));
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div>
            <button onClick={() => sendEmail('TEST2', "TEST2")}>Send Email</button>
            {/* {response && <p>Response: {response}</p>} */}
        </div>
    );
}

export default EmailSender;

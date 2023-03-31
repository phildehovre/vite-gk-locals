import React, { SetStateAction, useState } from 'react';
import { Button } from 'react-bootstrap';


function EmailSender(props: { customers: any, content: string, subject: string }) {
    const [response, setResponse] = useState<any>('');

    const { subject, content } = props
    function sendEmail(subject: string, content: string) {

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
            <Button onClick={() => sendEmail(subject, content)}>Send Email</Button>
            {/* {response && <p>Response: {response}</p>} */}
        </div>
    );
}

export default EmailSender;

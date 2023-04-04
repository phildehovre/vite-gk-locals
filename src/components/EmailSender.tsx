import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';


function EmailSender(props: { customers: any, content: string, subject: string, onSend: () => void }) {
    const [response, setResponse] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { subject, content, onSend } = props

    function sendEmail(subject: string, content: string) {
        setIsLoading(true)
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
                        "to": [{
                            "email": "placeholder@email.com",
                            "name": "Phil De Hovre"
                        }],
                        "bcc": [
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
                    .then(response => {
                        setIsLoading(false)
                        onSend()
                        setResponse(response)
                    })
                    .catch(error => console.error(error));
            } catch (err) {
                console.log(err)
            }
        }
    }
    console.log(response)
    return (
        <div>
            <Button onClick={() => sendEmail(subject, content)}>
                {isLoading ? <Spinner /> : 'Send Emails'}
            </Button>
        </div>
    );
}

export default EmailSender;

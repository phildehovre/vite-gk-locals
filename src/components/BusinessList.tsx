import React from 'react'
import { faEdit, faEllipsisVertical, faListDots, faMarsAndVenus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { getBusinesses, useBusinesses } from '../util/db';
// import './BusinessList.scss'
import DropdownMenu from './Dropdown';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import Accordion from 'react-bootstrap/Accordion';


function BusinessList(props: {
    sizeProp?: SizeProp | undefined,
    businesses: any
}) {

    const [isOpen, setIsOpen] = React.useState(false);
    const { sizeProp, businesses } = props
    const auth = getAuth()
    const [user] = useAuthState(auth)

    const { data, isLoading, error } = useBusinesses(user?.uid);


    const renderBusinessList = () => {
        return (
            <Accordion>
                {

                    businesses?.map((business: any) => (
                        <Accordion.Item eventKey={business.businessId} key={business.businessId} className='business-ctn'>
                            <Accordion.Header className='business_column left'>
                                <p>{business.lastName} {business.firstName}</p>
                                <p>{business.email}</p>
                            </Accordion.Header>
                            <Accordion.Body className='business_column right'>
                                <p>{business.businessName}</p>
                                <p>{business.role}</p>
                                <div className='business_column small'>
                                    <DropdownMenu options={[{ label: 'Edit', value: 'edit' }, { label: 'Delete', value: 'delete' }]} onSelect={(e) => console.log(e)}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} size='lg' onClick={() => setIsOpen(true)} />
                                    </DropdownMenu>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))

                }
            </Accordion>

        )
    }


    return (
        <div className='business_list-ctn'>
            {
                !isLoading && !error && renderBusinessList()
                    ? renderBusinessList()
                    : <FontAwesomeIcon id='spinner' size={sizeProp} icon={faSpinner} />
            }
        </div>
    )
}

export default BusinessList
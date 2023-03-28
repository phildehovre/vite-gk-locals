import React from 'react'
import { faEdit, faEllipsisVertical, faListDots, faMarsAndVenus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Spinner.scss'
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { getBusinesses, useBusinesses } from '../util/db';
import './BusinessList.scss'
import DropdownMenu from './Dropdown';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

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
            businesses?.map((business: any) => (
                <div key={business.businessId} className='business-ctn'>
                    <span className='business_column left'>
                        <h4>{business.lastName} {business.firstName}</h4>
                        <p>{business.email}</p>
                    </span>
                    <span className='business_column right'>
                        <p>{business.businessName}</p>
                        <p>{business.role}</p>
                    </span>
                    <div className='business_column small'>
                        <DropdownMenu options={['Edit', 'Delete']} onSelect={(e) => console.log(e)}>
                            <FontAwesomeIcon icon={faEllipsisVertical} size='lg' onClick={() => setIsOpen(true)} />
                        </DropdownMenu>
                    </div>
                </div>
            ))

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
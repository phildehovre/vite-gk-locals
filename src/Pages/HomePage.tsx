import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getBusinesses, useBusinesses } from '../util/db';
import CreateCustomer from '../components/CreateCustomer';
import BusinessList from '../components/BusinessList';
import Section from '../components/Section';
import SearchBar from '../components/SearchBar';
import SearchProvider from '../contexts/SearchContext';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'


function HomePage() {



    const auth = getAuth()
    const { data, isLoading, error } = useBusinesses(auth.currentUser?.uid);

    const [user, loading, errors] = useAuthState(auth);

    return (<>
        {user &&
            <Section flexDirection='column' margin='10en 0 0  0' height='100vh'>
                < SearchProvider >
                    <SearchBar data={data} />
                </SearchProvider >
            </Section >
        }
    </>
    )
}

export default HomePage
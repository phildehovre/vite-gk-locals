import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { getBusinesses, useBusinesses } from '../util/db';
import CreateCustomer from '../components/CreateCustomer';
import BusinessList from '../components/BusinessList';
import Section from '../components/Section';
import SearchBar from '../components/SearchBar';
import SearchProvider from '../contexts/SearchContext';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';


function HomePage() {

    const auth = getAuth()

    const [user, loading, errors] = useAuthState(auth);
    const navigate = useNavigate()

    const { data, isLoading, error } = useBusinesses(auth.currentUser?.uid);


    useEffect(() => {
        if (!user) navigate("/login")
    })

    return (<>
        {user &&
            <PageContainer >
                <Section flexDirection='column' margin='10en 0 0  0' height='100vh'>
                    < SearchProvider >
                        <SearchBar data={data} />
                    </SearchProvider >
                </Section >
            </PageContainer>
        }
    </>
    )
}

export default HomePage
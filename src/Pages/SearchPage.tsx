import React, { useEffect } from 'react'
import PageContainer from '../components/PageContainer'
import SearchBar from '../components/SearchBar'
import SearchProvider from '../contexts/SearchContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useBusinesses } from '../util/db'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

function SearchPage() {

    const auth = getAuth()

    const [user, loading, errors] = useAuthState(auth);
    const navigate = useNavigate()

    const { data, isLoading, error } = useBusinesses(auth.currentUser?.uid);


    useEffect(() => {
        if (!user) navigate("/login")
    })


    return (
        <PageContainer>
            < SearchProvider >
                <SearchBar data={data} />
            </SearchProvider >
        </PageContainer>
    )
}

export default SearchPage
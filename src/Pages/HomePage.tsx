import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getBusinesses, useBusinesses } from '../util/db';
import CreateCustomer from '../components/CreateCustomer';
import BusinessList from '../components/BusinessList';
import Section from '../components/Section';
import SearchBar from '../components/SearchBar';
import SearchProvider from '../contexts/SearchContext';


function HomePage() {



    const { data, isLoading, error } = useBusinesses();


    return (
        <Section flexDirection='column' margin='10en 0 0  0' height='100vh'>
            < SearchProvider >
                <SearchBar data={data} />
            </SearchProvider >
        </Section >
    )
}

export default HomePage
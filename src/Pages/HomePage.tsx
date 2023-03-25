import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getBusinesses, useBusinesses } from '../util/db';
import CreateCustomer from '../components/CreateCustomer';

function HomePage() {

    const res = getBusinesses();

    const { data, isLoading, error } = useBusinesses();

    console.log(data)


    return (
        <div><CreateCustomer /></div>
    )
}

export default HomePage
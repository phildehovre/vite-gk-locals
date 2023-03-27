import React, { useContext } from 'react'
import './SearchBar.scss'
import { SearchContext } from '../contexts/SearchContext'

function SearchFilters() {

    const { setSelectedFilter } = useContext(SearchContext)

    const handleFilterClick = (filterName: string) => {
        setSelectedFilter(filterName)
    }

    return (
        <div className='search_filters-ctn'>
            <button onClick={() => { handleFilterClick('name') }}>Name</button>
            <button onClick={() => { setSelectedFilter('businessName') }}>Business</button>
            <button onClick={() => { setSelectedFilter('email') }}>E-mail Address</button>
        </div>
    )
}

export default SearchFilters;

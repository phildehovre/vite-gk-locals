import React, { useContext } from 'react'
// import './SearchBar.scss'
import { SearchContext } from '../contexts/SearchContext'

function SearchFilters() {

    const { selectedFilter, setSelectedFilter } = useContext(SearchContext)

    const handleFilterClick = (filterName: string) => {
        setSelectedFilter(filterName)
    }

    return (
        <div className='search_filters-ctn'>
            <button onClick={() => { handleFilterClick('name') }} className={`search_filters-btn ${selectedFilter === 'name' ? 'selected' : ''}`}>Name</button>
            <button onClick={() => { setSelectedFilter('businessName') }} className={`search_filters-btn ${selectedFilter === 'businessName' ? 'selected' : ''}`}>Business</button>
            <button onClick={() => { setSelectedFilter('email') }} className={`search_filters-btn ${selectedFilter === 'email' ? 'selected' : ''}`}>E-mail Address</button>
        </div>
    )
}

export default SearchFilters;

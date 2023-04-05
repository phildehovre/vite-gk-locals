import React, { useContext, useState } from 'react'
// import './SearchBar.scss'
import { SearchContext } from '../contexts/SearchContext'
import { ToggleButton, ButtonGroup } from 'react-bootstrap'

function SearchFilters() {

    const { selectedFilter, setSelectedFilter } = useContext(SearchContext)
    const [buttonValue, setButtonValue] = useState('name')



    const handleFilterClick = (filterName: string) => {
        setSelectedFilter(filterName)
    }


    const buttons = [
        { label: 'Name', value: 'name' },
        { label: 'Business name', value: 'businessName' },
        { label: 'E-mail', value: 'email' },
        { label: 'Phone Number', value: 'phone' },
    ]

    return (
        <ButtonGroup className='search_filters-ctn'>
            {buttons.map((button, idx) => {
                return (
                    <ToggleButton
                        key={idx}
                        id={`button-${idx}`}
                        type="radio"
                        variant="outline-primary"
                        name="radio"
                        value={button.value}
                        checked={selectedFilter === button.value}
                        onChange={(e) => handleFilterClick(e.currentTarget.value)}
                    >{button.label}</ToggleButton>
                )
            }
            )}
        </ButtonGroup>
    )
}

export default SearchFilters;

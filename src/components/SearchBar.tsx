import React, { SetStateAction, useContext, useEffect, useState } from "react";
import './SearchBar.scss'
import SearchFilters from "./SearchFilters";
import { SearchContext } from "../contexts/SearchContext";

function SearchBar(props: { data?: any[] }) {
    const [query, setQuery] = useState("");
    const [dataAfterFilters, setDataAfterFilters] = useState<SetStateAction<Business[]>>([]);
    const regex = new RegExp(query, "i");
    const { selectedFilter } = useContext(SearchContext)

    interface Business {
        id: string;
        firstName: string;
        lastName: string;
        businessName: string;
        email: string;
        phone: string;
    }

    useEffect(() => {
        if (query.length === 0) {
            setDataAfterFilters([])
        }
        if (selectedFilter === 'name' && query.length > 0) {
            let firstNames = props.data?.filter((item: any) => regex.test(item.firstName))
            let lastNames = props.data?.filter((item: any) => regex.test(item.lastName) && !firstNames?.includes(item))
            setDataAfterFilters([...firstNames, ...lastNames])
        }
        if (selectedFilter === 'business' && query.length > 0) {
            let businessNames = props.data?.filter((item: any) => regex.test(item.businessName))
            setDataAfterFilters(businessNames)
        }

    }, [query, selectedFilter])


    console.log('after filters ', dataAfterFilters)

    return (
        <div className='searchbar-ctn'>
            <SearchFilters />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            {dataAfterFilters && dataAfterFilters.length > 0 && (
                <ul>
                    {dataAfterFilters?.map((item) => (
                        <li key={item}>{item.lastName} {item.firstName}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default SearchBar
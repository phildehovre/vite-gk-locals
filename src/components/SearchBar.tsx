import React, { SetStateAction, useContext, useEffect, useState } from "react";
// import './SearchBar.scss'
import SearchFilters from "./SearchFilters";
import { SearchContext } from "../contexts/SearchContext";
import { v4 as uuid } from 'uuid';
import BusinessList from "./BusinessList";
import SendEmailsButton from "./SendEmailTestButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBar(props: { data?: any[] }) {
    const [query, setQuery] = useState("");
    const [dataAfterFilters, setDataAfterFilters] = useState<SetStateAction<Business[]>>([]);
    const regex = new RegExp(`.*${query}.*`, "gi");
    const { selectedFilter } = useContext(SearchContext)

    interface Business {
        id: string;
        firstName: string;
        lastName: string;
        businessName: string;
        email: string;
        phone: string;
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (query.length === 0) {
            setDataAfterFilters([])
        }
        if (selectedFilter === 'name' && query.length > 0) {
            let firstNames = props.data?.filter((item: any) => regex.test(item.firstName))
            let lastNames = props.data?.filter((item: any) => regex.test(item.lastName))
            setDataAfterFilters((prevData: any) => { return [...(firstNames || []), ...(lastNames || [])] })
        }
        if (selectedFilter === 'businessName' && query.length > 0) {
            let businessNames = props.data?.filter((item: any) => regex.test(item.businessName))
            setDataAfterFilters((prevData: any) => { return businessNames || [] })
        }
        if (selectedFilter === 'email' && query.length > 0) {
            let emailAddresses = props.data?.filter((item: any) => regex.test(item.email))
            setDataAfterFilters((prevData: any) => { return emailAddresses || [] })
        }

    }, [query, selectedFilter])



    return (
        <div className='searchbar-ctn'
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '1em' }}>
            <SearchFilters />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className='searchbar-input'
            />
            {dataAfterFilters && dataAfterFilters.length > 0 && (
                <BusinessList direction='down' businesses={dataAfterFilters} />
            )}
            <Button onClick={() => navigate('/new/business')}>Add new <FontAwesomeIcon icon={faPlus} /></Button>
        </div>
    );
}


export default SearchBar
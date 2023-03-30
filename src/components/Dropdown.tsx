import React, { useState, useRef, useEffect } from 'react';
// import './Dropdown.scss'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { SignOutHook, useSignOut } from 'react-firebase-hooks/auth';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { DropDirection } from 'react-bootstrap/esm/DropdownContext';

interface Options {
    value: string;
    label: string;
}

interface Props {
    options: Options[];
    onSelect: (option: string) => void;
    children: React.ReactNode,
    direction: DropDirection | undefined
}

const DropdownMenu: React.FC<Props> = ({
    options,
    onSelect, children, direction
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const auth = getAuth()
    const [signOut, isLoading, error] = useSignOut(auth)
    const navigate = useNavigate()



    const handleOptionClick = (option: string) => {
        setIsOpen(false);
        onSelect(option);
        navigate(option)
    };

    const handleSignOut = () => {
        signOut()
            .then(() => navigate('/'))
            .catch((error) => console.log('Error signing out:', error));
    }

    return (
        <Dropdown className="dropdown" ref={dropdownRef} drop={direction}>
            <Dropdown.Toggle className="dropdown-toggle"
            >
                {children}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
                {options.map((option) => {
                    if (option.value === '/signout') {
                        return (
                            <Dropdown.Item key={option.value} onClick={() => handleSignOut()}>
                                {option.label}
                            </Dropdown.Item>
                        )
                    }
                    return (
                        < Dropdown.Item
                            key={option.value}
                            className={`dropdown-option ${option.value === 'delete' ? 'delete' : ''} `}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown >
    );
};

export default DropdownMenu;

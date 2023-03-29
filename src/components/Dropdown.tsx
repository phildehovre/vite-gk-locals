import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.scss'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { SignOutHook, useSignOut } from 'react-firebase-hooks/auth';

interface Options {
    value: string;
    label: string;
}

interface Props {
    options: Options[];
    onSelect: (option: string) => void;
    children: React.ReactNode
}

const DropdownMenu: React.FC<Props> = ({ options,
    onSelect, children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const auth = getAuth()
    const [signOut, isLoading, error] = useSignOut(auth)
    const navigate = useNavigate()

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        <div className="dropdown" ref={dropdownRef} >
            <div className="dropdown-toggle"
                // style={{ backgroundImage: `url(${auth?.currentUser?.photoURL})` }}
                onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option) => {
                        if (option.value === '/signout') {
                            return (
                                <li key={option.value} onClick={() => handleSignOut()}>
                                    {option.label}
                                </li>
                            )
                        }
                        return (
                            < li
                                key={option.value}
                                className={`dropdown-option ${option.value === 'delete' ? 'delete' : ''} `}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </li>
                        )
                    })}
                </ul>
            )
            }
        </div >
    );
};

export default DropdownMenu;

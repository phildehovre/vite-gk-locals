import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.scss'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { SignOutHook, useSignOut } from 'react-firebase-hooks/auth';

interface Props {
    options: string[];
    // defaultOption: string;
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
                        if (option === 'Sign out') {
                            return (
                                <li key='sign out' onClick={() => handleSignOut()}>
                                    Sign out
                                </li>
                            )
                        }
                        return (
                            < li key={option} className={`dropdown-option ${option === 'Delete' ? 'delete' : ''} `} onClick={() => handleOptionClick(option)}>
                                {option}
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

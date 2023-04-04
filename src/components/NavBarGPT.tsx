import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faEnvelope, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBarGPT.scss'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const NavbarGPT: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate()

    const auth = getAuth()
    const [user, loading] = useAuthState(auth)
    const [signOut, isLoading, error] = useSignOut(auth)

    console.log(user ? true : false)

    const handleSignOut = () => {
        signOut()
            .then(() => {
                setIsOpen(false)
                navigate('/')
            })
            .catch((error) => console.log('Error signing out:', error));
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    metroLocals.
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNav}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${!user ? '' : 'disabled'}`}
                                to="/"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faHome} />
                                <span className="ms-2 d-none d-lg-inline">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${!user ? '' : 'disabled'}`}
                                to="/new/business"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faUsers} />
                                <span className="ms-2 d-none d-lg-inline">Customers</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${!user ? '' : 'disabled'}`}
                                to="/new/email"
                                onClick={() => setIsOpen(false)}
                            >
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span className="ms-2 d-none d-lg-inline">New e-mail</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-link nav-link" to="/" onClick={() => handleSignOut()}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span className="ms-2 d-none d-lg-inline">Sign Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarGPT;

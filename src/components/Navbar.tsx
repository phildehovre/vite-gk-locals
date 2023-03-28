import { getAuth } from 'firebase/auth';
import DropdownMenu from './Dropdown';
import './Navbar.scss'
import React from 'react'
import LoginWithGoogle from './LoginWithGoogle'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {

    const [show, setShow] = React.useState(false)
    const handleProfileClick = () => {
        setShow(show)
    };

    const auth = getAuth()
    const navigate = useNavigate()
    const [user, loading, errors] = useAuthState(auth);


    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>GK-Locals</h2>
            </div>
            <div className="navbar-buttons">
                <button onClick={() => navigate('/')} className="navbar-button">Home</button>
                <button onClick={() => navigate('/new/business')} className="navbar-button">New business</button>
                {user
                    ?
                    <DropdownMenu options={['About', 'Settings', 'Profile', 'sign out']} onSelect={() => { console.log('clicked') }}>
                        <div className='user-icon' style={{ backgroundImage: `url(${auth?.currentUser?.photoURL})` }}>
                        </div>
                    </DropdownMenu>
                    : <LoginWithGoogle />
                }
            </div>
        </nav>
    );
};

export default Navbar;

import { getAuth } from 'firebase/auth';
import DropdownMenu from './Dropdown';
import './Navbar.scss'
import React from 'react'
import LoginWithGoogle from './LoginWithGoogle'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [show, setShow] = React.useState(false)
    const handleProfileClick = () => {
        setShow(show)
    };

    const auth = getAuth()
    const navigate = useNavigate()

    const session = null

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>ToGoos</h2>
            </div>
            <div className="navbar-buttons">
                <button onClick={() => navigate('/')} className="navbar-button">Home</button>
                <button onClick={() => navigate('/new/business')} className="navbar-button">New business</button>
                {auth.currentUser
                    ? <div className='user-icon' style={{ backgroundImage: `url(${auth?.currentUser?.photoURL})` }}>
                        <DropdownMenu options={['About', 'Settings', 'Profile', 'sign out']} onSelect={() => { console.log('clicked') }}>
                        </DropdownMenu>
                    </div>
                    : <LoginWithGoogle />
                }
            </div>
        </nav>
    );
};

export default Navbar;

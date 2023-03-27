import { getAuth } from 'firebase/auth';
import DropdownMenu from './Dropdown';
import './Navbar.scss'
import React from 'react'
import LoginWithGoogle from './LoginWithGoogle'

const Navbar = () => {

    const [show, setShow] = React.useState(false)
    const handleProfileClick = () => {
        setShow(show)
    };

    const auth = getAuth()

    const session = null

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>ToGoos</h2>
            </div>
            <div className="navbar-buttons">
                <button className="navbar-button">Home</button>
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

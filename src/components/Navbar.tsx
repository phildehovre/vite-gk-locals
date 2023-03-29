import { getAuth } from 'firebase/auth';
import DropdownMenu from './Dropdown';
import './Navbar.scss'
import React, { SetStateAction, useContext, useEffect } from 'react'
import LoginWithGoogle from './LoginWithGoogle'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHamburger, faMarsAndVenus } from '@fortawesome/free-solid-svg-icons';
import ScreenSizeContext from '../contexts/ScreenSizeContext';

const Navbar = () => {

    const [show, setShow] = React.useState(false)
    const [collapseMenu, setCollapseMenu] = React.useState(false)
    const [screenSize, setScreenSize] = React.useState<SetStateAction<number>>()
    const handleProfileClick = () => {
        setShow(show)
    };

    const auth = getAuth()
    const navigate = useNavigate()
    const [user, loading, errors] = useAuthState(auth);


    useEffect(() => {
        window.addEventListener('load', (e) => {
            if (e.currentTarget instanceof Window) {
                setScreenSize(e.currentTarget.innerWidth)
                if (e.currentTarget.innerWidth < 1100) {
                    setCollapseMenu(true)
                } else {
                    setCollapseMenu(false)
                }
            }
        })
    });

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            if (e.currentTarget instanceof Window && e.currentTarget.innerWidth !== screenSize) {
                if (e.currentTarget instanceof Window && e.currentTarget.innerWidth < 1100) {
                    setCollapseMenu(true)
                } else {
                    setCollapseMenu(false)
                }
            }
        })
    }, [screenSize]);


    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>GK-Locals</h2>
            </div>
            <div className="navbar-buttons collapsed">
                {
                    collapseMenu
                        ? <DropdownMenu options={[
                            {
                                label: 'Home',
                                value: '/'
                            },
                            {
                                label: 'Businesses',
                                value: '/new/business'
                            },
                            {
                                label: 'New mail',
                                value: '/new/email'
                            },
                        ]} onSelect={() => console.log('clicked')}>

                            <FontAwesomeIcon icon={faBars} size='2x' color='white' />
                        </DropdownMenu>
                        : <>
                            <button onClick={() => navigate('/')} className="navbar-button">Home</button>
                            <button onClick={() => navigate('/new/business')} className="navbar-button">New business</button>
                            <button onClick={() => navigate('/new/email')} className="navbar-button">New e-mail</button>
                        </>
                }
                {user
                    &&
                    <DropdownMenu options={[
                        { label: 'About', value: '/about' },
                        { label: 'Settings', value: '/settings' },
                        { label: 'Profile', value: '/profile' },
                        { label: 'Sign out', value: '/signout' },
                    ]} onSelect={() => { console.log('clicked') }}>
                        <div className='user-icon' style={{ backgroundImage: `url(${auth?.currentUser?.photoURL})` }}>
                        </div>
                    </DropdownMenu>
                    // : <LoginWithGoogle />
                }
            </div>
        </nav>
    );
};

export default Navbar;

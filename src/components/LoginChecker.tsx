

import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';

function LoginChecker({ children }: { children: React.ReactNode }) {
    const [user] = useAuthState(getAuth())
    const location = useLocation();
    const navigate = useNavigate()


    useEffect(() => {
        if (!user) {
            navigate("/login")

        }
    }, [])

    const renderChildren = () => {
        if (Array.isArray(children)) {
            return children?.map((child: React.ReactNode) => {
                return child
            })
        }
    }




    return (
        < >
            {user
                ? renderChildren()
                : <LoginPage />
            }
        </>
    )
}

export default LoginChecker
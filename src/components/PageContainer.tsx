import { getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

function PageContainer(props: { children: React.ReactNode }) {

    const auth = getAuth()
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login')
    //     }
    // }, [])

    const { children } = props
    return (
        <div className='page-container'>{children}</div>
    )
}

export default PageContainer
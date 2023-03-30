import React from 'react'

function PageContainer(props: { children: React.ReactNode }) {

    const { children } = props
    return (
        <div className='page-container'>{children}</div>
    )
}

export default PageContainer
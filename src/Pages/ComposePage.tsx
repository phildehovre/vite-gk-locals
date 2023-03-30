import React from 'react'
import ComposeEmail from '../components/ComposeEmail'
import Stack from 'react-bootstrap/esm/Stack'
import PageContainer from '../components/PageContainer'

function ComposePage() {
    return (
        <PageContainer>
            <ComposeEmail />
        </PageContainer>
    )
}

export default ComposePage
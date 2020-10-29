import React from 'react'
import { Container } from 'react-bootstrap'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const withLayout = (WrappedComponent) => props => {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <WrappedComponent {...props} /> 
                </Container>
            </main>
            <Footer />
        </>
    )
}

import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const CheckoutSteps = ({ steps, protectedSteps }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            {
                steps.map((step, index) => {
                    const markColor = step.protected ? '' : '#4f3fff';
                    return (
                        <Nav.Item key={index}>
                            <LinkContainer disabled={step.protected} to={step.path} style={{ fontWeight: '800' }}>
                                <Nav.Link>{step.name}</Nav.Link>
                            </LinkContainer>
                            <div style={{ textAlign: 'center' }}>
                                <i className="fas fa-map-marker" style={{ color: `${markColor}` }}></i>
                            </div>
                        </Nav.Item>
                    )
                })
            }
        </Nav>
    )
}

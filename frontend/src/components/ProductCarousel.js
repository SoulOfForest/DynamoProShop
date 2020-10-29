import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Loader } from './Loader'

export const ProductCarousel = ({ products }) => {
    return (
        <Carousel pause='hover' className='bg-dark'>
            {
                products.map(product => (
                    <Carousel.Item key={product._id} style={{ textAlign: 'center' }}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className='carousel-caption'>
                                <h2 style={{ fontSize: '1rem' }}>{product.name} (${product.price})</h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

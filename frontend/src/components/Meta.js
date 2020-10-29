import React from 'react'
import { Helmet } from 'react-helmet'

export const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Dynamo Shop',
    keywords: 'electronics,  buy electronics, cheap electronics',
    description: 'We sell the best products for cheap'
}
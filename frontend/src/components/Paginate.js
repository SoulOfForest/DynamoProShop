import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
export const Paginate = ({ pages, page, path = '', keyword = '' }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x + 1} to={keyword ? `${path}/search?q=${keyword}&page=${x + 1}` : `${path}?page=${x + 1}`}>
                    <Pagination.Item active={x + 1 === page}>
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

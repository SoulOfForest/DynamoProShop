import React from 'react'
import PropTypes from 'prop-types';

export const Rating = ({ color, total, rating, text }) => {
    const starStyle = {
        color
    } 

    const renderRatingStars = (total, rating) => {
        const renderedStars = [];

        const fullStars = Math.floor(rating);
        const halfStarIndex = rating % 1 !== 0 ? fullStars : -1;

        for (let i = 0; i < total; i++) {
            let renderedStar = <i style={starStyle} key={i} className={`${i < fullStars ? 'fas': 'far' } fa-star`}></i>;
                    
            if (i === halfStarIndex) {
                renderedStar = <i style={starStyle} key={i} className='fas fa-star-half-alt'></i>;
            }         
            
            renderedStars.push(renderedStar);
        }
        
        return renderedStars;
    }

    return (
        <div>
           {renderRatingStars(total, rating)} 
            <span style={{ marginLeft: '.5rem' }}>
                {text}
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: 'gray'
}

Rating.propTypes = {
    total: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string,
    color: PropTypes.string
}

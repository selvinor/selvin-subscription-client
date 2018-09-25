import React from 'react';

/*import './arrangement.css';*/

export default function ProductCard(props) {
    return (
        <div className="productCard">
            {props.image}
            {props.text}
        </div>
    );
};

Arrangement.defaultProps = {
    image: '',
    text: ''
};

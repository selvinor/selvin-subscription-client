import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles/productListing.css';

export default function ProductLink(props) {
  console.log('props: ', props)
  const thumbImg= props.img;

  return (
    <Fragment>
      <div className="thumb">
        <Link to="/product"><img className="thumbnail" src={thumbImg} alt=""/></Link>
      </div> 
      <button className="arrangeButton">
        <Link style={{display: 'block', height: '100%'}} to="/product/" onClick={props.choice() } >SELECT</Link>
      </button>
    </Fragment>
  );
};

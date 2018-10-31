import React from 'react';
//import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './styles/product.css';

import { setDeliveryDate, setProductChoice } from '../actions'
export default function Product(props) {
  console.log('props: ', props)

    return (
      <ul classname="product">
      <li>
      <button className="jumpBack"  onClick={() => {return <Redirect to="/products" />}}  type="button">BACK</button>              
        <div className="productDetail">
          <h5>{props.productName}</h5> 
          <div className={props.productPhoto} onClick={() => { 
            // this.props.dispatch(setDeliveryDate(firstAvailableDate()));
            setProductChoice('p3');
          }} >
          </div>
          <p className="productDetailPrice">Starting at: ${props.productPrice}</p>
          <p className="productDetailDesc">{props.productDesc}</p> 
          <button className="chooseButton" onClick={() => {
            setProductChoice(props.productCode);
            return <Redirect to="/subscriptionAdd" />}}  
            type="button">SELECT</button><span className="price"></span>                
        </div>
      </li>
    </ul>

    );
};


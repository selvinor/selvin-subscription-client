import React from 'react';
//import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './styles/products.css';

export default function Products(props) {
  const WrappedLink = () => {
    return (
      <button className="arrangeButton">
        <Link style={{display: 'block', height: '100%'}} to="/product" >SELECT</Link>
      </button>
    )
  }
    return (
      <ul className="products">
      <li>
        <h5>CHOOSE THE ARRANGEMENT TYPE!</h5>
      </li>
      <li className="product">
        <div className="product3">         
          <div className="thumb">
          <Link to="/product"><img className="thumbnail" src="../img/_DSC3098.png" alt=""/></Link>
          </div>                                   
          <div className="pickArr3">
            <p className="productName">{props.ProductName3}</p>
            {WrappedLink}<span className="price"></span>                 
          </div>
        </div>
      </li>
      <li className="product"> 
      <div className="product2">          
        <div className="thumb">
        <Link to="/product"><img className="thumbnail" src="../img/_DSC2980.png" alt=""/></Link>                  
        </div>
        <div className="pickArr2">
          <p className="productName">{props.ProductName2}</p>
          {WrappedLink}<span className="price"></span>                 
        </div>
        </div>
      </li>
      <li className="product">     
        <div className="product1">   
          <div className="thumb">
          <Link to="/product"><img className="thumbnail" src="../img/_DSC3345.png" alt=""/></Link>                 
          </div>
          <div className="pickArr1">
            <p className="productName">{props.ProductName1}</p>
            {WrappedLink}<span className="price"></span>                 
          </div>
        </div>
      </li>
    </ul>

    );
};

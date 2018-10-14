import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

export default function Arrangement(props) {
    return (
      <ul>
      <li>
      <button className="jumpBack"  onClick={() => dispatchSection('arrangement')}  type="button">BACK</button>              
        <div className="productDetail">
          <h5>{props.productName}</h5> 
          <div className={props.productPhoto} onClick={() => { 
            this.props.dispatch(setDeliveryDate(firstAvailableDate()));
            dispatchProductChoice('p3');
          }} >
          </div>
          <p className="productDetailPrice">Starting at: ${props.productPrice}</p>
          <p className="productDetailDesc">{props.productDesc}</p> 
          <button className="chooseButton" onClick={() => {
            dispatchProductChoice(props.productCode);
            <Redirect to="/subscriptionAdd" />
          }}  type="button">SELECT</button><span className="price"></span>                
        </div>
      </li>
    </ul>

    );
};

export default connect(mapStateToProps)(Arrangement);

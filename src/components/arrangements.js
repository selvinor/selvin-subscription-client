import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

export default function Arrangements(props) {
  const WrappedLink = () => {
    return (
      <button className="arrangeButton">
        <Link style={{display: 'block', height: '100%'}} to="/arrangement" >SELECT</Link>
      </button>
    )
  }
    return (
      <ul className="arrangements">
      <li>
        <h4>CHOOSE THE ARRANGEMENT TYPE!</h4>
      </li>
      <li className="arrangement">
        <div className="arrangement3">         
          <div className="thumb">
          <Link to="/arrangement"><img className="thumbnail" src="../img/_DSC3098.png" alt=""/></Link>
          </div>                                   
          <div className="pickArr3">
            <p className="arrangementName ">{this.props.ProductName3)}</p>
            {WrappedLink}<span className="price"></span>                 
          </div>
        </div>
      </li>
      <li className="arrangement"> 
      <div className="arrangement2">          
        <div className="thumb">
        <Link to="/arrangement"><img className="thumbnail" src="../img/_DSC2980.png" alt=""/></Link>                  
        </div>
        <div className="pickArr2">
          <p className="arrangementName">{this.props.ProductName2}</p>
          {WrappedLink}<span className="price"></span>                 
        </div>
        </div>
      </li>
      <li className="arrangement">     
        <div className="arrangement1">   
          <div className="thumb">
          <Link to="/arrangement"><img className="thumbnail" src="../img/_DSC3345.png" alt=""/></Link>                 
          </div>
          <div className="pickArr1">
            <p className="arrangementName">{this.props.ProductName1}</p>
            {WrappedLink}<span className="price"></span>                 
          </div>
        </div>
      </li>
    </ul>

    );
};
export default connect(mapStateToProps)(Arrangements);

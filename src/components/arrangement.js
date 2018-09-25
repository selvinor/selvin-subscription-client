import React from 'react';

/*import './arrangement.css';*/

export default function Arrangement(props) {
    return (
      <ul className="arrangements">
      <li>
        <h4>CHOOSE THE ARRANGEMENT TYPE!</h4>
      </li>
      <li className="arrangement">
        <div className="arrangement3">         
          <div className="thumb">
              <img className="thumbnail"  onClick={() => dispatchArrangement('3')} src="../img/_DSC3098.png" alt=""/>
          </div>                                   
          <div className="pickArr3">
            <p className="arrangementName ">{thisProductName('3')}</p>
            <button className="arrangeButton" onClick={() => dispatchArrangement('3')}  type="button">SELECT</button><span className="price"></span>                 
          </div>
        </div>
      </li>
      <li className="arrangement"> 
      <div className="arrangement2">          
        <div className="thumb">
          <img className="thumbnail"  onClick={() => dispatchArrangement('2')} src="../img/_DSC2980.png" alt=""/>                  
        </div>
        <div className="pickArr2">
          <p className="arrangementName">{thisProductName('2')}</p>
          <button className="arrangeButton" onClick={() => dispatchArrangement('2')}  type="button">SELECT</button><span className="price"></span> 
        </div>
        </div>
      </li>
      <li className="arrangement">     
        <div className="arrangement1">   
          <div className="thumb">
            <img className="thumbnail" onClick={() => dispatchArrangement('1')} src="../img/_DSC3345.png" alt=""/>                 
          </div>
          <div className="pickArr1">
            <p className="arrangementName">{thisProductName('1')}</p>
            <button className="arrangeButton" onClick={() => dispatchArrangement('1')}  type="button">SELECT</button><span className="price"></span>  
          </div>
        </div>
      </li>
    </ul>

    );
};

Arrangement.defaultProps = {
    text: ''
};

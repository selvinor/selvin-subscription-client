import React from 'react';
export default class ProductBlock extends React.Component {
  render() {
console.log('productBlock - thus.props: ', this.props);
    return (
      <ul className="productBlock">
        <li><span className="title">Product: </span>{this.props.product.code}</li>
        <li><span className="title">Description: </span>{this.props.product.desc}</li>
        <li><span className="title">Image: </span>{this.props.product.image}</li>
        <li><span className="title">Price: </span>{this.props.product.price}</li>
      </ul>
    );
  }
}

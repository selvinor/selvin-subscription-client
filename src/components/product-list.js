import  React, { PropTypes } from 'react';
import { connect } from 'react-redux';
export function productsFetchData(url) {
import { fetchProducts } from '../actions/products';

export class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/products');
  }
  renderResults() {
    const productList = this.props.products.map((product, index) => {
      return (<li key={index}>{product}</li>)
    });
    return productList;
  }
// let products = this.props.products.map((product, index) => (
//   <li key={index}>{product}</li>
// ));
  render() {
    console.log(this.renderResults());
    return (
      <ul>
          {this.renderResults()}
      </ul>
    );
  }
}

ProductList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    products: state.products,
    hasErrored: state.productsHasErrored,
    isLoading: state.productsIsLoading
});
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(fetchProducts(url))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
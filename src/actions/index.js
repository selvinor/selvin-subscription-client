export const SUBSCRIPTIONS_HAS_ERRORED = 'SUBSCRIPTIONS_HAS_ERRORED';
export function subscriptionsHasErrored(bool) {
  return {
    type: SUBSCRIPTIONS_HAS_ERRORED,
    hasErrored: bool
  };
}
export const SUBSCRIPTIONS_IS_LOADING = 'SUBSCRIPTIONS_IS_LOADING'; 
export function subscriptionsIsLoading(bool) {
  return {
    type: SUBSCRIPTIONS_IS_LOADING,
    isLoading: bool
  };
}
export const FETCH_SUBSCRIPTION_SUCCESS = 'FETCH_SUBSCRIPTION_SUCCESS';
export function fetchSubscriptionSuccess(subscriptions) {
  return {
    type: FETCH_SUBSCRIPTION_SUCCESS,
    subscriptions
  };
}


export const PRODUCTS_HAS_ERRORED = 'PRODUCTS_HAS_ERRORED';
export function productsHasErrored(bool) {
  return {
      type: PRODUCTS_HAS_ERRORED,
      hasErrored: bool
  };
}
export const PRODUCTS_IS_LOADING = 'PRODUCTS_IS_LOADING';
export function productsIsLoading(bool) {
  return {
      type: PRODUCTS_IS_LOADING,
      isLoading: bool
  };
}
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export function fetchProductsSuccess(products) {
  return {
      type: FETCH_PRODUCTS_SUCCESS,
      products
  };
}
export const fetchSubscriptions = () => dispatch => {
  fetch(`http://localhost:8080/api/subscriptions`).then(res => {
      if (!res.ok) {
          return Promise.reject(res.statusText);
      }
      return res.json();
  }).then(subscriptions => {
      console.log('subscriptions from the fetch', subscriptions);
      dispatch(fetchSubscriptionSuccess(subscriptions));
  });
};

// export const fetchProducts = () => dispatch => {
//   fetch(`http://localhost:8080/products`).then(res => {
//       if (!res.ok) {
//           return Promise.reject(res.statusText);
//       }
//       return res.json();
//   }).then(products => {
//       dispatch(fetchProductSuccess(products));
//   });
// };
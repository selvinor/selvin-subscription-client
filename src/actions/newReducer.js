const initialState = {};

const reducer = (state=initialState, action) => {
  if (action.type === SET_PRODUCT_CHOICE) {
   return Object.assign({}, state, {productCode: action.productCode})
  }
}



cont initialState = {};
const reducer = (state=initialState, action) => {
  if (action.type=== BIG_ASS_LETTERS) {
    return Object.assign({}, state, {field:   action.payload})
  }
}

}
//import * as actions from '../actions'; 
const initialState = {
  subscriptions: [],
  hasErrored : false,
  isLoading : false,
  currentFormSection: "onboarding",
  currentProductName: "",
  currentProductPhoto: "",
  currentProductPrice: "",
  currentProductDesc: "",
  currentProductCode: "",
  currentFrequency: "monthly",
  currentDuration: "3 months",
  currentNumberOfDeliveries : "0",   
  currentDeliveryDate : '',
  showLogin : false
}

export const subscriptionReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SUBSCRIPTIONS_HAS_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
    });  

    case 'SUBSCRIPTIONS_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading
    }); 
    case  'LOAD_TEST_DATA':
    return Object.assign({}, state, {
      subscriptions: action.testData
  }); 

    case 'FETCH_SUBSCRIPTION_SUCCESS':
    console.log('subscription success action.subscriptions: ', action.subscriptions);
      return Object.assign({}, state, {        
        subscriptions: action.subscriptions
    });

    case 'ADD_SUBSCRIPTION_SUCCESS':
    return Object.assign({}, state, {
      subscriptions: [...state.subscriptions, action.newSubscription]
    });

    case 'SET_NUMBER_OF_DELIVERIES':
    return Object.assign({}, state, {
      currentNumberOfDeliveries: action.numberOfDeliveries,
      currentFormSection: 'checkout'
    });

    case 'SET_PRODUCT_CHOICE':
    return Object.assign({}, state, {
      currentProductChoice: action.productCode,
      currentFormSection: 'recipient'
    });

    case 'SET_FREQUENCY':
    return Object.assign({}, state, {
      currentFrequency: action.frequency      
    });

    case 'SET_DURATION':
    return Object.assign({}, state, {
      currentDuration: action.duration
    });

    case 'SET_DELIVERY_DATE':
    return Object.assign({}, state, {
      currentDeliveryDate: action.deliveryDate
    });

    case 'JUMP_TO_SECTION':
    return Object.assign({}, state, {
      currentFormSection: action.section
    });

    case 'ADD_RECEIVER_TO_SUBSCRIPTION':
      // Do some stuff to add the receiver to the receiver array in subscription 
      return Object.assign({}, state, {
        subscriptions: [...state.subscriptions, action.addReceiver]
    });

    case 'SHOW_LOGIN':
      return Object.assign({}, state, {
        showLogin: true
    });
    
      
    default:
        return state;
  }
}  

export const senderReceiverReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'RECIPIENTS_HAS_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
      });  
    case 'RECIPIENTS_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }); 
    case 'FETCH_RECIPIENTS_SUCCESS':
      return Object.assign({}, state, {
        senderReceivers: action.fetchSenderReceiversSuccess
      });
    default:
        return state;
  }
}  

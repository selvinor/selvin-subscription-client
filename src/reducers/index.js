//import * as actions from '../actions'; 
const initialState = {
  subscriptions: [{
      productCode: '',
      productName: '',
      productSize: '',
      status: 'active',
      frequency: '',
      duration: '',
      startDate: null,
      color: true,
      senderEmail: '',
      senderFirstName: '',
      senderLastName: '',
      senderPhone: '',
      firstName : '',
      lastName : '',
      streetAddress : '',
      aptSuite : '',
      recipientCity : '',
      state : '',
      zipcode : '',
      phone : ''   
  }],
  hasErrored : false,
  isLoading : false,
  currentFormSection: "arrangement",
  currentProductCode: "2",
  currentFrequency: "monthly",
  currentDuration: "3 months",
  currentNumberOfDeliveries : "0",   
  currentDeliveryDate : ''
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
    case 'FETCH_SUBSCRIPTION_SUCCESS':
      return Object.assign({}, state, {
        subscriptions: action.subscriptions
      });
    case 'ADD_SUBSCRIPTION_SUCCESS':
    // Do some stuff to create the subscription from the payload 
    return Object.assign({}, state, {
      subscriptions: [...state.subscriptions, action.newSubscription]
    });

    case 'SET_NUMBER_OF_DELIVERIES':
    console.log('SET_NUMBER_OF_DELIVERIES reducer called', action.numberOfDeliveries);
    return Object.assign({}, state, {
      currentNumberOfDeliveries:"12",
      currentFormSection: 'checkout'
    });

    case 'SET_PRODUCT_CHOICE':
    console.log('reducer | SET_PRODUCT_CHOICE | action.productCode: ', action.productCode);
    return Object.assign({}, state, {
      currentProductCode: action.productCode,
      currentFormSection: 'recipient'
    });
    case 'SET_FREQUENCY':
    console.log('reducer | SET_FREQUENCY | action.frequency: ', action.frequency);
    return Object.assign({}, state, {
      currentFrequency: action.frequency      
    });
    case 'SET_DURATION':
    console.log('reducer | SET_DURATION | action.setDuration: ', action.duration);
    return Object.assign({}, state, {
      currentDuration: action.duration
    });
    case 'SET_DELIVERY_DATE':
    console.log('reducer | SET_DELIVERY_DATE | action.setDeliveryDate: ', action.deliveryDate);
    return Object.assign({}, state, {
      currentDeliveryDate: action.deliveryDate
    });

    case 'JUMP_TO_SECTION':
    return Object.assign({}, state, {
      currentFormSection: action.section
    });
    case 'ADD_RECEIVER_TO_SUBSCRIPTION':
      console.log('ADD_RECEIVER reducer called', action);
      // Do some stuff to add the receiver to the receiver array in subscription 
      return Object.assign({}, state, {
        subscriptions: [...state.subscriptions, action.addReceiver]
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

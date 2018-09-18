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
      address1 : '',
      address2 : '',
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
  currentNumberOfDeliveries : "0"   
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
      currentFormSection: 'sender'
    });

    case 'SET_PRODUCT_CHOICE':
    console.log('reducer | SET_PRODUCT_CHOICE | action.productCode: ', action.productCode);
    return Object.assign({}, state, {
      currentProductCode: action.productCode,
      currentFormSection: 'schedule'
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

//import * as actions from '../actions'; 
const initialState = {
  subscriptions: [{
      productCode: '2',
      productName: 'Designer\'s Choice Arrangement',
      productSize: 'standard',
      status: 'active',
      frequency: 'monthly',
      duration: '3',
      startDate: null,
      color: true,
      senderEmail: '',
      senderFirstName: '',
      senderLastName: '',
      senderPhone: '',
      deliveries: [],
      recipients: [
        {
          firstName : '',
          lastName : '',
          address1 : '',
          address2 : '',
          city : '',
          state : '',
          zipcode : '',
          phone : '',
          deliveries: [
            {
              deliveryNumber: null
            }
          ]
        }
      ]    
  }],
  hasErrored : false,
  isLoading : false,
  currentFormSection: "arrangement",
  numRecipientsToAdd: 1,
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

    case 'ADD_RECIPIENT_FORM':
    console.log('addRecipientForm reducer called', action);
    return Object.assign({}, state, {
      numRecipientsToAdd: state.numRecipientsToAdd++
    });

    case 'JUMP_TO_SECTION':
    console.log('JUMP_TO_SECTION reducer called', action);
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

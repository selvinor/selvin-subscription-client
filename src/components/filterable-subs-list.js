import  React from 'react';
import SubscriptionList from './subscription-list';
class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show future deliveries
        </p>
      </form>
    );
  }
}
export default class FilterableSubscriptionList extends React.Component {
  render() {
    return (
      <div>
        <SearchBar /> 
        <SubscriptionList subscriptions={Subscriptions} />
      </div>     
    );
  }
}

const Subscriptions = [
  {userId: 'u0001', userName: 'foo123', userFirstName: 'foo', userLastName: 'bar', userEmail: 'foo123@fakeemail.com', userPhone: '555-555-1111', 
    orders: [
      {orderNum: 'ord0001', productCode: 'p1', productPrice: '$35', productImage: '../img/_DSC3345.png',       
        productDesc: 'An easy way to brighten up and beautify your home or office, plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions.', 
        frequency: 'monthly', duration: '3 months', deliveryDate: '11-03-2018', 
        recipientName: 'Bat Bar', 
        recipientAddress: '123 Maple St.', recipientAptSuite: '', 
        recipientCity: 'Portland', recipientState: 'OR', recipientZipcode: '97201', 
        recipientPhone: '555-555-7777'}, 
      {orderNum: 'ord0002', productCode: 'p1', productPrice: '$35', productImage: '../img/_DSC3345.png', 
        productDesc: 'An easy way to brighten up and beautify your home or office, plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions.', 
        frequency: 'monthly', duration: '6 months', deliveryDate: '11-17-2018', 
        recipientName: 'Bat Bar', recipientAddress: '123 Maple St.', recipientAptSuite: '', recipientCity: 'Portland', recipientState: 'OR', 
        recipientZipcode: '97202', recipientPhone: '555-555-7777'
      }
  ]}, 
  {userId: 'u0002', userName: 'bar474', userFirstName: 'bar', userLastName: 'dax', userEmail: 'foo123@fakeemail.com', userPhone: '555-555-1212', 
    orders: [{
      orderNum: 'ord0003', productCode: 'p3', productPrice: '$150', productImage: '../img/_DSC3098.png', 
      productDesc: 'See your lobby transformed by each successive flower product. As the season changes, so does the theme.', 
      frequency: 'weekly', duration: '3 months', deliveryDate: '11-18-2018', 
      recipientName: 'Aaf Doh', recipientAddress: '433 Spruce Ave.', recipientAptSuite: 'Suite 2500', recipientCity: 'Portland', recipientState: 'OR', 
      recipientZipcode: '97202', recipientPhone: '555-555-7643'
      }
  ]},
  {userId: 'u0003', userName: 'bif5555', userFirstName: 'bif', userLastName: 'bof', userEmail: 'foo123@fakeemail.com', userPhone: '555-555-9755', 
    orders: [{
      orderNum: 'ord0004', productCode: 'p2', productPrice: '$75', productImage: '../img/_DSC2980.png',  
      productDesc: 'Beautiful, fresh, custom flower products for your home or office, delivered on a weekly or monthly basis', 
      frequency: 'monthly', duration: '6 months', deliveryDate: '11-07-2018', 
      recipientName: 'Myr Rif', recipientAddress: '8678 Glenn Ln.', recipientAptSuite: '', recipientCity: 'Portland', recipientState: 'OR', 
      recipientZipcode: '97213', recipientPhone: '555-555-5677'
    }
  ]},
  {userId: 'u0004', userName: 'baf1', userFirstName: 'baf', userLastName: 'foo', userEmail: 'foo123@fakeemail.com', userPhone: '555-555-1232', 
    orders: [{
      orderNum: 'ord0005', productCode: 'p1', productPrice: '$35', productImage: '../img/_DSC3345.png', 
      productDesc: 'An easy way to brighten up and beautify your home or office, plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions.', 
      frequency: 'bi-weekly', duration: '6 months', deliveryDate: '11-05-2018', 
      recipientName: 'Har Har', recipientAddress: '324 Rock Rd.', recipientAptSuite: '', recipientCity: 'Portland', recipientState: 'OR', 
      recipientZipcode: '97203', recipientPhone: '555-555-6660'
    },
    {
      orderNum: 'ord0006', productCode: 'p2', productPrice: '$75', productImage: '../img/_DSC2980.png', 
      productDesc: 'Beautiful, fresh, custom flower products for your home or office, delivered on a weekly or monthly basis',  
      frequency: 'bi-weekly', duration: '6 months', deliveryDate: '11-12-2018', 
      recipientName: 'Har Har', recipientAddress: '324 Rock Rd.', recipientAptSuite: '', recipientCity: 'Portland', recipientState: 'OR', 
      recipientZipcode: '97203', recipientPhone: '555-555-6660'}
  ]},
  {userId: 'u0005', userName: 'bof007', userFirstName: 'zap', userLastName: 'zif', userEmail: 'foo123@fakeemail.com', userPhone: '555-555-1246', 
    orders: [{
      orderNum: 'ord0007', productCode: 'p1', productPrice: '$35', productImage: '../img/_DSC3345.png', 
      productDesc: 'An easy way to brighten up and beautify your home or office, plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions.', 
      frequency: 'bi-weekly', duration: '3 months', deliveryDate: '11-11-2018', 
      recipientName: 'Maf Firth', recipientAddress: '5674 Hammock Ave.', recipientAptSuite: 'Suite 300', recipientCity: 'Portland', recipientState: 'OR', 
      recipientZipcode: '97223', recipientPhone: '555-555-6560'}
    ]},
  {userId: 'u0006', userName: 'xag999', userFirstName: 'xag', userLastName: 'joz', userEmail: 'foo123@fakeemail.com', userPhone: '555-555-3745', 
    orders: [
      {orderNum: 'ord0008', productCode: 'p3', productPrice: '$150', productImage: '../img/_DSC3098.png', 
      productDesc: 'See your lobby transformed by each successive flower product. As the season changes, so does the theme.', 
      frequency: 'monthly', duration: 'on-going', deliveryDate: '11-02-2018', 
      recipientName: 'Laj Narf', recipientAddress: '6454 U Rd.', recipientAptSuite: 'Apt A', recipientCity: 'Portland', recipientState: 'OR', 
      recipientZipcode: '97201', recipientPhone: '555-555-7773'}
    ]}
  ];

  // ReactDOM.render(
  //   <FilterableSubscriptionList subscriptions={Subscriptions} />,
  //   document.getElementById('container')
  // );
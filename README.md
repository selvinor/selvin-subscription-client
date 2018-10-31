# BLOOMS SUBSCRIPTION SERVICE

This app enables a user to send flowers to to a recipient at a residence or business according to a schedule.

Users are presented with a choice of three different sizes of floral products representing small, medium and large. 

Next, the user provides the recipient's delivery information - name, address, phone, a gift message and a Company name, if applicable. Contact information for the sender includes name, phone number and email address.

Once the contact information has been entered, the app presents users with a choice of monthly, biweekly, or weekly delivery frequency. Next, they choose the number of months the subscription should run. Choices are three months, six months, 12 months, or they may choose to have deliveries continue indefinitely on an ongoing basis. Lastly, the user picks a start date for the first delivery from a calendar.

Coming Soon:
 1) User accounts with the ability to edit one's own subscriptions.
 2) Ability to designate a different recipient for each delivery in a subscription set.
 3) Field validation to ensure data integrity.
 4) Additional product selections.
 5) Administrative backend to manage user accounts
 6) Integration with Square payment processing API
 7) Ability for user to Pause or Resume service
 8) Ability for user to Cancel service at will
 9) Ability to send reminders to the customer when deliveries are impending.


API INFORMATION
info:
  title: Blooms Subscription Service
  description: Have flowers delivered on a regular schedule
  version: 1.0.0
host: https://blooms-pdx.herokuapp.com/
schemes:
  - https
basePath: /api/subscriptions
produces:
  - application/json
paths:
  /:
    post:
      summary: Create Subscriptions
      description: |
        The  endpoint posts information about the subscription
        including product, schedule, sender, recipient, and delivery location.

      responses:
        '200':
          description: A new subscription
          schema:
            productCode: {type: String, default: ''}
            productName:{type: String, default: ''},
            productSize: {type: String, default: ''},
            status: {type: String, default: 'active'},
            frequency:{type: String, default: ''},
            duration: {type: String, default: ''},
            startDate: {type: Date, default: null},
            color: {type: Boolean, default: true},
            senderEmail: {type: String, default: ''},
            senderFirstName: {type: String, default: ''},
            senderLastName: {type: String, default: ''},
            senderPhone: {type: String, default: ''},
            recipientFirstName : {type: String, default: ''},
            recipientLastName :  {type: String, default: ''},
            recipientCompany :  {type: String, default: ''},
            recipientStreetAddress :  {type: String, default: ''},
            recipientAptSuite :  {type: String, default: ''},
            recipientCity :  {type: String, default: ''},
            recipientState :  {type: String, default: ''},
            recipientZipcode :  {type: String, default: ''},
            recipientPhone :  {type: String, default: ''},
            recipientMessage :  {type: String, default: ''}

            
            TECH 

            HTML5
            CSS3
            JavaScript
            React
            Redux
            Node.JS
            Express.js
            MongoDB
            Heroku
          
            
            SCREENSHOTS
![Landing](/screenshots/screen0.PNG)
![Choose Product](/screenshots/screen1.PNG)
![Product Details](/screenshots/screen2.PNG)
![Add Recipient Info](/screenshots/screen3.PNG)
![Add Sender Info](/screenshots/screen4.PNG)
![Set Schedule](/screenshots/screen5.PNG)
![Checkout](/screenshots/screen6.PNG)
![Confirmation](/screenshots/screen7.PNG)
Format: ![Blooms Subscription Service](https://blooms-pdx.herokuapp.com/)

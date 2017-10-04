import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Socket } from './Socket';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.stripe = Stripe('pk_test_50M0ZvrdCP5uiJUU0yUCa6o8');
        this.elements = this.stripe.elements();
        this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '15px',
          
                '::placeholder': {
                  color: '#CFD7E0',
                },
              },
            }
        });
        this.token;
        this.userdata = {
            'email': '',
            'teamname': '',
            'hunt_id': ''
        }
        
        this.changePage = this.changePage.bind(this);
        this.setOutcome = this.setOutcome.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stripeTokenHandler = this.stripeTokenHandler.bind(this);
    }
    
    componentDidMount() {
        // Add an instance of the card Element into the `card-element` <div>
        this.card.mount('#card-element');
    }
    
    handleSubmit(event) {
        event.preventDefault();
        // Handle form submission
        var form = document.getElementById('payment-form');
        var outcomeElement = document.getElementById('stripe-outcome');
        // var errorElement = document.getElementById('stripe-error');
        
        this.stripe.createToken(this.card).then(function(result) {
            if (result.error) {
                // Inform the user if there was an error
                outcomeElement.textContent = result.error.message;
                outcomeElement.style.color = "#E4584C";
            } 
            else {
                outcomeElement.textContent = "Success! Token generated: " + result.token.id;
                outcomeElement.style.color = "#666EE8";
                
                // Send the token to your server
                this.stripeTokenHandler(result.token);
            }
        });
    }
    handleChange(event) {
        event.preventDefault();
        this.setOutcome(event);
    }
    setOutcome(result) {
        var outcomeElement = document.getElementById('stripe-outcome');
        if (result.error) {
          outcomeElement.textContent = result.error.message;
        }
    }
    stripeTokenHandler(token){
        Socket.emit('checkout', {'token':this.token, 'userData': this.userData});
    }
    changePage(page){
        //changes the display of the pages when button is pressed
        document.getElementById('register').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
    render() {
        return (
            <div>
                <div id = 'header'>
                    <header>Register</header>
                </div>
                
                <form id = 'stripe-form' onSubmit={this.handleSubmit}>
                    <div className="group">
                      <label>
                        <span>Email</span>
                        <input className="field" placeholder="sample@email.com" type="email" />
                      </label>
                    </div>
                    <div className="group">
                      <label>
                        <span>Name</span>
                        <input name="cardholder-name" className="field" placeholder="Jane Doe" />
                      </label>
                      <label>
                        <span>Card</span>
                        <div id="card-element" className="field" onChange={this.handleChange}></div>
                      </label>
                    </div>
                    <button type="submit">Register and Pay</button>
                    <div id="stripe-outcome"></div>
                    <div className="clear"></div>
                </form>
                
                <Button onClick={() => this.changePage('home')}>Home</Button>
            </div>
         
        );
    }
}
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
        this.userdata = {
            team_name: '',
            email: '',
            hunts_id: '',
            image: ''
        };
        this.hunts = [];
        
        this.changePage = this.changePage.bind(this);
        this.setOutcome = this.setOutcome.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleHuntChange = this.handleHuntChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        // Add an instance of the card Element into the `card-element` <div>
        this.card.mount('#card-element');
        var ongoingHunts = [];
        Socket.on('updateRegister', (data) => {
            for(var key in data) { //convert object to array, prep for mapping
                var hunt = [data[key].id,data[key].name,data[key].h_type];
                ongoingHunts.push(hunt);
            }
            this.hunts = ongoingHunts;
            this.setState(); //DONT ASK ME WHY THIS WORKS BUT IT WORKS, DO NOT DELETE
        });
        
        Socket.on('acceptance', (data) => {
            var outcomeElement = document.getElementById('stripe-outcome');
            outcomeElement.textContent = "Your access code: " + data['access_code'];
            outcomeElement.style.color = "#00FF00";
        });
        
        Socket.on('rejection', (data) => {
            var outcomeElement = document.getElementById('stripe-outcome');
            outcomeElement.textContent = "Error: " + data['message'];
            outcomeElement.style.color = "#E4584C";
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        // Handle form submission
        var form = document.getElementById('payment-form');
        var outcomeElement = document.getElementById('stripe-outcome');
        // var errorElement = document.getElementById('stripe-error');
        
        var ud = this.userdata;
        console.log(ud);
        
        //add checker to make sure no duplicate names 
        //add email validity checker
        
        this.token = this.stripe.createToken(this.card).then(function(result) {
            if (result.error) {
                // Inform the user if there was an error
                outcomeElement.textContent = result.error.message;
                outcomeElement.style.color = "#E4584C";
                return 0;
            } 
            else {
                outcomeElement.textContent = "Success! Token generated: " + result.token.id;
                outcomeElement.style.color = "#666EE8";
                Socket.emit('checkout', {'token':result.token.id, 'userdata':ud});
            }
        });
    }
    
    handleNameChange(event) {
        event.preventDefault();
        this.userdata.team_name = event.target.value;
    }
    handleEmailChange(event) {
        event.preventDefault();
        this.userdata.email = event.target.value;
    }
    handleHuntChange(event) {
        event.preventDefault();
        this.userdata.hunts_id = event.target.value;
    }
    handleCardChange(event) {
        event.preventDefault();
        this.setOutcome(event);
    }
    setOutcome(result) {
        var outcomeElement = document.getElementById('stripe-outcome');
        if (result.error) {
          outcomeElement.textContent = result.error.message;
        }
    }
    changePage(page){
        //changes the display of the pages when button is pressed
        document.getElementById('register').style.display = "none";
        Socket.emit(page);
        document.getElementById(page).style.display = "block";
    }
    render() {
        let hunts = this.hunts.map((n, index) => 
            <option value={n[0]}>{n[1]}-{n[2]}</option>
        );
        return (
            <div>
                <div id = 'header'>
                    <header>Register</header>
                </div>
                <form id = 'stripe-form' onSubmit={this.handleSubmit}>
                    <div className="group">
                      <label>
                        <span>Team</span>
                        <input className="field" placeholder="MyTeamName" onChange={this.handleNameChange} />
                      </label>
                      <label>
                        <span>Email</span>
                        <input className="field" placeholder="sample@email.com" type="email" onChange={this.handleEmailChange}/>
                      </label>
                      <label>
                        <span>Card</span>
                        <div id="card-element" className="field" onChange={this.handleCardChange}></div>
                      </label>
                    </div>
                    <div className="group full">
                        <label>Ongoing Scavenger Hunts</label>
                        <select name="hunts" form='stripe-form' onChange={this.handleHuntChange}>
                            <option value=''>--</option>
                            {hunts}
                        </select>
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
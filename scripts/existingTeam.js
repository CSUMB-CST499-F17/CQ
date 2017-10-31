import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

import { LogoSmall } from './logo-small';

export class ExistingTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'teamName':'',
            'accessCode':'',
            'user':''
        };
        this.pageName = 'existingTeam';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.email = "";
    }
    
    //checks if emais in valid email format before comparing to the emails in database
    validateEmail(email) 
    {
        var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        return re.test(email);
    }

    errorMessage(validate){
        if(validate == false && this.email == "")
        {
            document.getElementById("errorMessage").innerHTML = "Please Enter valid Email and Access Code";
            document.getElementById("errorMessage").style.visibility = 'visible';
            document.getElementById("errorMessage").style.color="red";
        }
        if(validate == false && this.email != ""){
                document.getElementById("errorMessage").innerHTML = "Invalid Email or Access Code";
                document.getElementById("errorMessage").style.visibility = 'visible';
                document.getElementById("errorMessage").style.color="red";
                document.getElementById("access").value = "";
        }
        
    }
    
    handle(callback){
           try{
                switch(callback['user']) {
                    case "no":
                        this.errorMessage(false);
                        console.log("no");
                        break;
                    case "teamLead":
                        this.props.loggedIn = 'teamLead';
                        this.props.name = callback['name'];
                        console.log("LoggedIn = " + this.props.loggedIn);
                        console.log("Name = " + this.props.name);
                        console.log("teamLead");
                        break;
                    case "team":
                        this.props.loggedIn = 'team';
                        this.props.name = callback['name'];
                        console.log("team");
                        break;
                    case "admin":
                        console.log("admin");
                        if(callback['status' == true]){ //if admin is a superAdmin
                            this.props.loggedIn = 'superAdmin';
                        }
                        else{
                            this.props.loggedIn = 'admin';
                        }
                        this.props.name = callback['name'];
                        break;
                    } 
           }
           catch(err) {
                alert(err);
            } 
            
    
    }

    validateCredentials(){
        this.email = document.getElementById("email").value;
        var access = document.getElementById("access").value;
        console.log(this.validateEmail(this.email));
        var validate = this.validateEmail(this.email);
        if (validate == true)
        {
            document.getElementById("errorMessage").style.visibility = 'hidden';
            Socket.emit('validateCredentials',{'email':this.email,'access':access}, Socket.callback=this.handle);
        }
        else{
            this.errorMessage(validate);
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id='header'>
                    <header>EXISTING TEAMS</header>
                </div>
                <div id='intro'>
                    <img id = "pageImage" src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Full_Spectrum_Team_Waving.jpg/1024px-Full_Spectrum_Team_Waving.jpg' width='100%'></img><br/>
                    <Form id = "ET-form" >
                        <FormGroup>
                            <InputGroup>
                                    <FormControl type="email" id = "email" className="ET-field" placeholder="Enter email" />
                                    <FormControl type="password" id = "access" className="ET-field" placeholder="Enter access code" />
                                    <div id = "errorMessage" style={{visibility:'hidden'}}> Error Message Placeholder</div>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </div>
                <div id='buttons'>
                    <ButtonToolbar>
                        <Button id= "ET-submit" onClick = {this.validateCredentials}>Enter!</Button>
                        <Button onClick={() => this.props.changePage(this.pageName,'home')}>Cancel</Button>
                    </ButtonToolbar>
                </div>
            </div>

        );
    }
}


//  <form onSubmit = {this.handleSubmit}>
                    //     <InputGroup>
                    //         <ButtonToolbar>
                    //             <Button onClick={() => this.changePage('home')}>Home</Button>
                    //         </ButtonToolbar>
                    //     </InputGroup>
                    // </form>
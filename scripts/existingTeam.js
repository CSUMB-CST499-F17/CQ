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
            'accessCode':''
        };

        this.changePage = this.changePage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        function validateEmail(email) 
        {
            var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
            return re.test(email);
        }
        var email = document.getElementById("emailbox").value;
        console.log(validateEmail(email));
        if (validateEmail(email) === true)
        {
            Socket.emit('login', this.state);
        }
        else
        {
            alert("Invalid email, message not sent!");
            document.getElementById("emailbox").value = "";
        }
        
    }
    
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('existingTeam').style.display = "none";
        Socket.emit(page);
        document.getElementById(page).style.display = "block";
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
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Full_Spectrum_Team_Waving.jpg/1024px-Full_Spectrum_Team_Waving.jpg' width='100%'></img><br/>
                    <Form id = "ET-form" >
                        <FormGroup>
                            <InputGroup>
                                    <FormControl type="text" className="ET-field" placeholder="Enter email" />
                                    <FormControl type="text" className="ET-field" placeholder="Enter access code" />
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </div>
                <div id='buttons'>
                    <Form>
                        <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <Button id= "ET-submit" onClick = {this.handleSubmit}>Enter!</Button>
                                    <Button onClick={() => this.changePage('home')}>Cancel</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                     </Form>
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
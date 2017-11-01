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
        this.pageName = 'existingTeam';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.team = "";
        this.handle = this.handle.bind(this);
    }
    
    errorMessage(validate){
        
        
        
    }
    
    handle(callback){
        var res = callback.split('%');
          try{
                this.props.setProps(res[0], res[1]); //loggedIn, name
                document.getElementById("team_name").value = "";
                document.getElementById("access").value = "";
                switch(res[0]) {
                    case "teamLead":
                    case "team":
                        this.props.changePage('play');
                        
                        break;
                    case "superAdmin":
                    case "admin":
                        this.props.changePage('adminHome');

                        break;
                    case "no":
                        document.getElementById("errorMessage").innerHTML = "Invalid Team Name or Access Code";
                        document.getElementById("errorMessage").style.visibility = 'visible';
                        document.getElementById("errorMessage").style.color="red";
                        document.getElementById("access").value = "";
                        break;
                    default:
                            break;
                    } 
          }
          catch(err) {
                alert(err);
            } 
            
    
    }

    validateCredentials(){
        this.team = document.getElementById("team_name").value;
        var access = document.getElementById("access").value;
        if(this.team == "")
        {
            document.getElementById("errorMessage").innerHTML = "Please Enter valid Team Name and Access Code";
            document.getElementById("errorMessage").style.visibility = 'visible';
            document.getElementById("errorMessage").style.color="red";
        }
        else
        {
            document.getElementById("errorMessage").style.visibility = 'hidden';
            Socket.emit('validateCredentials',{'team_name':this.team,'access':access}, Socket.callback=this.handle);
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
                                    <FormControl type="text" id = "team_name" className="ET-field" placeholder="Enter Team Name" />
                                    <FormControl type="password" id = "access" className="ET-field" placeholder="Enter access code" />
                                    <div id = "errorMessage" style={{visibility:'hidden'}}> Error Message Placeholder</div>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </div>
                <div id='buttons'>
                    <ButtonToolbar>
                        <Button id= "ET-submit" onClick = {this.validateCredentials}>Enter!</Button>
                        <Button onClick={() => this.props.changePage('home')}>Cancel</Button>
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
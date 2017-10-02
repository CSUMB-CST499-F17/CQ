import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export class ExistingTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'teamName':'',
            'accessCode':'',
            'currentPage':'adminHome'
        };

        this.changePage = this.changePage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        Socket.emit('login', this.state);
    }
    
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('existingTeam').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
    render() {
        return (
            <div>
                <div id='header'>
                    <header>EXISTING TEAMS</header>
                </div>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Full_Spectrum_Team_Waving.jpg/1024px-Full_Spectrum_Team_Waving.jpg' width='40%'></img>
                </div>
                <div id='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <FormGroup bsSize="medium">
                            <InputGroup>
                                <ButtonToolbar>
                                    <FormControl type="text" placeholder="Enter email" />
                                    <FormControl type="text" placeholder="Enter access code" />
                                    <Button id= "chatSubmit">Enter!</Button>
                                    <Button onClick={() => this.changePage('home')}>Home</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                     </form>
                    
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
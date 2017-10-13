/*
Needs:
To be connected to Database
Hint options
*/

import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
// import { Socket } from './Socket';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

// import { Socket } from './Socket';

export class Play extends React.Component {
    constructor(props) {
        super(props);

        this.changePage = this.changePage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('play').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
    
    render() {
        
        return (
            
            
            <div>
                <div id = 'header'>
                    <header>Game Name</header>
                </div>
                <div id='intro'>
                    <Form>
                            <div id='buttons'>
                                <FormGroup>
                                    <ControlLabel>Current Objective Intro.</ControlLabel>
                                        
                                        <FormControl.Static>
                                            This is Where Database will produce the Scavenger Hunt Question. 
                                        </FormControl.Static>
                                        
                                        <FormControl componentClass="textarea" placeholder="Answer" />
                                        
                                        <Button type="submit">
                                            Submit
                                        </Button>
                                        
                                        <Button onClick={() => this.changePage('home')}>
                                            Home
                                        </Button>
                                        
                                    </FormGroup>
                            </div>
                    </Form>
                </div>
            </div>
         
        );
    }
}


// <InputGroup>
//     <ButtonToolbar>
//         <input id='play-item' type="text" placeholder="Enter Answer" /><br/>
//         <Button>Submit</Button>
//     </ButtonToolbar>
// </InputGroup>
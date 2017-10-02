import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
// import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

import { NavBar } from './nav-bar';

export class AdminCreate extends React.Component {
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
        document.getElementById('adminCreate').style.display = "none";
        document.getElementById(page).style.display = "block";
    }

    render() {
        return (
            <div>
                <div id = 'nav-bar'>
                    <NavBar/>
                </div>
                <div id = 'header'>
                    <header>Create Admin</header>
                </div>
                <div id='intro'>
                    <div id='create'>
                        <form id='create-form'>
                            <FormGroup>
                                <InputGroup>
                                    <input id='create-item' type="text" placeholder="Email" /><br/>
                                    <input id='create-item' type="text" placeholder="Team Name" /><br/>
                                    <input id='create-item' type="text" placeholder="Access Code" /><br/>
                                    <input id='create-item' type="text" placeholder="Image URL" />
                                    <ButtonToolbar>
                                        <Button id='add-admin'>Add Admin</Button>
                                    </ButtonToolbar>
                                </InputGroup>
                            </FormGroup>
                        </form>
                    </div>
                </div>
                <div id='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <Button onClick={() => this.changePage('adminLeaderboard')}>Temp Button to Admin Leaderboard</Button>
                                    <Button onClick={() => this.changePage('adminHome')}>Temp Button to Admin Homepage</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
            </div>
         
        );
    }
}
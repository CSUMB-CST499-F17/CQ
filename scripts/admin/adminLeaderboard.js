import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from '../Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

// import { Socket } from './Socket';

import { NavBar } from './nav-bar';

export class AdminLeaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    
    render() {
        return (
            <div>
                <div id = 'nav-bar'>
                    <NavBar/>
                </div>
                <div id = 'header'>
                    <header>Admin Leaderboard Page</header>
                </div>
                <div id='search'>
                    <form id='adminLeaderboard-form'>
                        <FormGroup>
                            <InputGroup>
                                <input id='adminLeaderboard-item' type="text" placeholder="Search Hunts" />
                                <ButtonToolbar>
                                    <Button id='adminLeaderboard-item'>Search</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
                <img src='https://upload.wikimedia.org/wikipedia/commons/8/87/Maplestory_Leaderboard_2015-10.PNG' width='30%'></img>
                <div id='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
            </div>

        );
    }
}

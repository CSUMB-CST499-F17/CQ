import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
// import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export class Home extends React.Component {
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
        document.getElementById('home').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
    render() {

        return (
            <div id='center'>
                <div id='header'>
                    <header>Coastal Quest</header>
                </div>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG/1200px-Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG' width='50%'></img>
                </div>
                <div id='buttons'>
                    <ButtonToolbar>
                        <Button onClick={() => this.changePage('explore')}>Let's Explore!</Button>
                        <Button onClick={() => this.changePage('existingTeam')}>Log into Existing Team</Button>
                        <Button onClick={() => this.changePage('adminHome')}>Temp Button to Admin Homepage</Button>
                        <Button onClick={() => this.changePage('play')}>Temp Button to Play Page</Button>
                    </ButtonToolbar>
                </div>
            </div>

        );
    }
}

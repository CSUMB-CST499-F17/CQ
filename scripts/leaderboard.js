import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
// import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

// import { Socket } from './Socket';

export class Leaderboard extends React.Component {
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
        document.getElementById('leaderboard').style.display = "none";
        document.getElementById(page).style.display = "block";
    }

    render() {
        return (
            <div>
                <div id = 'header'>
                    <header>Leaderboard</header>
                </div>
                <div id='search'>
                    <form id='leaderboard-form'>
                        <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <input id='leaderboard-item' type="text" placeholder="Search Hunts" />
                                    <Button id='leaderboard-item'>Search</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
                <img src='https://upload.wikimedia.org/wikipedia/commons/8/87/Maplestory_Leaderboard_2015-10.PNG' width='30%'></img>
                <div id='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <Button onClick={() => this.changePage('home')}>Home</Button>
                    </form>
                </div>
            </div>

        );
    }
}

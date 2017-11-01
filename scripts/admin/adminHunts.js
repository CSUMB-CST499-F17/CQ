import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from '../Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export class AdminHunts extends React.Component {
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
                <div id = 'header'>
                    <header>Hunts</header>
                </div>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/8/87/Maplestory_Leaderboard_2015-10.PNG' width='30%'></img>
                </div>
                <div id='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <Button onClick={() => this.props.changePage('adminEditHunt')}>Edit</Button>
                                    <Button onClick={() => this.props.changePage('adminCreateHunt')}>Create</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
            </div>
         
        );
    }
}
/*
Needs:
To be connected to Database
Hint options
*/

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

export class Play extends React.Component {
    render() {
        return (
            <div>
                <div id = 'header'>
                    <header>Game Name</header>
                </div>
                <div id='intro'>
                    <form>
                        <FormGroup>
                            <div>
                                <p>Current Objective Intro.
                                    This is Where Database will produce the Scavenger Hunt Question
                                </p>
                            </div>
                            <InputGroup>
                                <ButtonToolbar>
                                    <input id='play-item' type="text" placeholder="Enter Answer" /><br/>
                                    <Button>Submit</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
            </div>
         
        );
    }
}
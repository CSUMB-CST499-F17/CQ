import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from '../Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';


export class AdminHome extends React.Component {
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
                    <header>Welcome, Admin!</header>
                </div>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Warning_notice_-_EVIL_ADMIN.svg/2000px-Warning_notice_-_EVIL_ADMIN.svg.png' width='30%'></img>
                </div>
            </div>
         
        );
    }
}
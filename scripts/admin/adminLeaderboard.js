import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from '../Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

// import { Socket } from './Socket';

import { NavBar } from './nav-bar';

export class AdminLeaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'userlist': []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

    }

    changePage(page){
        Socket.emit(page);
    }

    componentDidMount(){
        Socket.on('users', (data) => {
            this.setState({
                'userlist': data['userlist']
            });
        });
    }

    render() {
        let userlist = '';
        if (this.state.userlist != null) {
            userlist = this.state.userlist.map((n, index) =>
                <li key={index}>
                    {n.name}
                    :
                    {n.picture}
                </li>
             );
        }
        return (
            <div>
                <div id = 'nav-bar'>
                    <NavBar/>
                </div>
                <div id = 'header'>
                    <header>Admin Leaderboard Page</header>
                </div>
                <div id='search'>
                    <div id='leaderboard-form'>
                          <input  id = "leaderboard-search1" className="form-control " placeholder="Search Hunts" size="5" />
                          <button id = "leaderboard-search" className="btn">Search</button>
                    </div>
                </div>
                <div id='leaderboards'>
                    <ul>{userlist}</ul>
                </div>
            </div>

        );
    }
}

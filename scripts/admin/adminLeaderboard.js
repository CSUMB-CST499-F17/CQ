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

export class AdminLeaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'userlist': []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

    }
    componentDidMount(){
        Socket.on('users', (data) => {
            this.setState({
                'userlist': data['userlist']
            });
        });
    }

    render() {
        let userlist='';
        if (this.state.userlist != null) {
            userlist = this.state.userlist.map(
                (n, index) =>
                <tr key={index}><td>{index+1}</td> <td>{n.team_name}</td><td>{n.score}</td><td>{n.end_time}</td></tr>
             );
        }
        
        
        return (
            <div>
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
                            <table id="leaderboard-table">
                                <tbody>
                                    <tr>
                                        <td>Rank</td><td>Team</td><td>Score</td><td>Time</td>
                                    </tr>
                                </tbody>
                            </table> 
                            <div id="userList">
                            <table id="leaderboard-table2">
                                <tbody>
                                    {userlist} 
                                </tbody>
                            </table>
                            </div>
                        </div>
            </div>

        );
    }
}

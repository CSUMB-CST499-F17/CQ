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
            'userlist': [],
            'userlistPlusTime': []
        };
        this.pageName = 'adminLeaderboard';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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
        for(var i = 0; i < this.state.userlist.length; i++) {
            var start = new Date(this.state.userlist[i].start_time);
            var end = new Date(this.state.userlist[i].end_time);
            var team_name = this.state.userlist[i].team_name;
            var score = this.state.userlist[i].score;
            
            var time = (end-start) /1000;  // second/minutes/hours
        
            // calculate (and subtract) whole days
            var days = Math.floor(time / 86400);
            time -= days * 86400;
            // calculate (and subtract) whole hours
            var hours = Math.floor(time / 3600) % 24;
            time -= hours * 3600;
            // calculate (and subtract) whole minutes
            var minutes = Math.floor(time / 60) % 60;
            time -= minutes * 60;
            // what's left is seconds
            var seconds = time % 60;
            
            this.state.userlistPlusTime[i] = [team_name, score, days, hours, minutes, seconds];
            
            
        }

        
        if (this.state.userlistPlusTime != null) {
            userlist = this.state.userlistPlusTime.map(
                (n, index) =>
                <tr key={index}><td>{index+1}</td> <td>{n[0]}</td><td>{n[1]}</td>
                <td>{n[2] != 0 ? <div>{n[2]} d<br/></div> : <div/>}
                    {n[3] != 0 ? <div>{n[3]} h<br/></div> : <div/>}
                    {n[4] != 0 ? <div>{n[4]} m<br/></div> : <div/>}
                    {n[5] != 0 ? <div>{n[5]} s<br/></div> : <div/>}
                </td></tr>
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

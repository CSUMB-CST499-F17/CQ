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
        var dif;
        var data = this.state.userlist;
        var dif;
        
        for(var i = 0; i < data.length; i++) {
            console.log(data[i].start_time);
            console.log(data[i].end_time);
            console.log('admin')
            var start = new Date(data[i].start_time);
            var end = new Date(data[i].end_time);
            data[i].end_time = (end-start) /1000;  // second/minutes/hours
            // data[i].end_time = data[i].end_time.toFixed(2);
            var delta = data[i].end_time;
            // calculate (and subtract) whole days
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;
            // calculate (and subtract) whole hours
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            // calculate (and subtract) whole minutes
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            // what's left is seconds
            var seconds = delta % 60;
            data[i].end_time = [days,hours,minutes,seconds];
        }
            

        
        if (this.state.userlist != null) {
            userlist = this.state.userlist.map(
                (n, index) =>
                <tr key={index}><td>{index+1}</td> <td>{n.team_name}</td><td>{n.score}</td><td>{n.end_time[0]} d<br></br>{n.end_time[1]} h<br></br>{n.end_time[2]} m<br></br>{n.end_time[3]} s</td></tr>
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

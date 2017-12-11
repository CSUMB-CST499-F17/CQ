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
        this.changePage = this.changePage.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

    }
    changePage(page){
        this.props.setProps('select',-1);
        this.props.changePage(page);
    }
    componentDidMount(){
        Socket.on('users', (data) => {
            this.setState({
                'userlist': data['userlist']
            });
        });
    }

    render() {
        var approvedUsers = [];
        let userlist='';
        
        for(var i = 0; i < this.state.userlist.length; i++) {
            var user = this.state.userlist[i];
            var time = user.time.substring().split(':');
            var team_name = user.team_name;
            var score = user.score;
            // whole days
            var days = time[0];
            // whole hours
            var hours = time[1];
            //  whole minutes
            var minutes = time[2];
            //  seconds
            var seconds = time[3];
            
            this.state.userlistPlusTime[i] = [team_name, score, days, hours, minutes, seconds];
            
            if(this.props.state.select == this.state.userlist[i].hunts_id) { //no filter, all winners
                approvedUsers.push([team_name, score, days, hours, minutes, seconds]);
            }
        }
        if (approvedUsers.length > 0){
            userlist = approvedUsers.map(
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

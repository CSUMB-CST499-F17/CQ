import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { LogoSmall } from './logo-small';

export class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'userlist': []
        };
        this.pageName = 'leaderboard';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
        //retrieves users from database who have completed the scavenger hunt
        Socket.on('users', (data) => {
            this.setState({
                'userlist': data['userlist']
            });
        });
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    changePage(page){
        this.props.setProps('select',-1);
        this.props.changePage(page);
    }
    render() {
        var approvedUsers = [];
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
            
            console.log("selected: " + this.props.state.select + ", mine: " + this.state.userlist[i].hunts_id + " render me?");
            console.log(this.props.state.select == this.state.userlist[i].hunts_id);
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
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id = 'header'>
                    <header>Leaderboard</header>
                </div>
                    <div id='intro'>
                        <div id='leaderboards'>
                            <table id="leaderboard-table">
                                <tbody>
                                    <tr>
                                        <td>Rank</td><td>Team</td><td>Score</td><td>Time    </td>
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
                <div className='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <Button onClick={() => this.changePage('explore')}>Back</Button>
                        <Button onClick={() => this.changePage('home')}>Home</Button>
                    </form>
                </div>
            </div>

        );
    }
}

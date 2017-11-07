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
    render() {
        let userlist='';
        var dif;
        var data = this.state.userlist;
        
        for(var i = 0; i < data.length; i++) {
            console.log(data[i].start_time);
            console.log(data[i].end_time);
            
            var a = new Date(data[i].start_time);
            var b = new Date(data[i].end_time);
            var difference = (b - a) / 1000;
            console.log(difference);
            dif = Date.parse(data[i].start_time) - Date.parse(data[i].end_time);
        }
        console.log(dif);
        
        
        
        
        
        
        
        if (this.state.userlist != null) {
            userlist = this.state.userlist.map(
                (n, index) =>
                <tr key={index}><td>{index+1}</td> <td>{n.team_name}</td><td>{n.score}</td><td>{n.dif}</td></tr>
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
                                        <td>Rank</td><td>Team</td><td>Score</td><td>Start Time</td>
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
                        <Button onClick={() => this.props.changePage('home')}>Home</Button>
                    </form>
                </div>
            </div>

        );
    }
}

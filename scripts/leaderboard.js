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

        this.changePage = this.changePage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        Socket.on('users', (data) => {
            this.setState({
                'userlist': data['userlist']
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('leaderboard').style.display = "none";
        Socket.emit(page);
        document.getElementById(page).style.display = "block";
    }



    render() {
        let userlist='';
        if (this.state.userlist != null) {
            userlist = this.state.userlist.map(
                (n, index) =>
                <tr key={index}><td></td><td>{n.name}</td><td>{n.picture}</td><td></td></tr>
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
                        <div id='leaderboard-form'>
                            <input  id = "leaderboard-search1" className="form-control " placeholder="Search Hunts" size="5" />
                            <button id = "leaderboard-search" className="btn">Search</button>
                        </div>
                        <div id='leaderboards'>
                            <table id="leaderboard-table">
                                <tr>
                                    <td>Rank</td><td>Team</td><td>Score</td><td>Time</td>
                                </tr>
                            </table> 
                            <div id="userList">
                            <table id="leaderboard-table2">
                                
                                {userlist} 
                                
                            </table>
                            </div>
                        </div>
                    </div>
                <div id='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <Button onClick={() => this.changePage('home')}>Home</Button>
                    </form>
                </div>
            </div>

        );
    }
}

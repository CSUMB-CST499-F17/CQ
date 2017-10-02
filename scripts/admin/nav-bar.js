import * as React from 'react';
import { Socket } from '../Socket';

export class NavBar extends React.Component {
    constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('adminHome').style.display = "none";
        document.getElementById('adminLeaderboard').style.display = "none";
        document.getElementById('adminHunts').style.display = "none";
        document.getElementById('admins').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
    
    render() {
        return (
            <div>
                <div id="topnav">
                    <a onClick={() => this.changePage('adminHome')}>Home</a>
                    <a onClick={() => this.changePage('adminLeaderboard')}>Leaderboard</a>
                    <a onClick={() => this.changePage('adminHunts')}>Hunts</a>
                    <a onClick={() => this.changePage('admins')}>Settings</a>
                    <a >Logout</a>
                </div> 
            </div>
         
        );
    }
}
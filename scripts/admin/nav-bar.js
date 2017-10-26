import * as React from 'react';
import { Socket } from '../Socket';
import { LogoSmall } from '../logo-small';


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
        //hides all pages then displays appropriate page to prevent multiple 
                //pages from showing up
        document.getElementById('adminHome').style.display = "none";
        document.getElementById('adminLeaderboard').style.display = "none";
        document.getElementById('adminHunts').style.display = "none";
        document.getElementById('admins').style.display = "none";
        document.getElementById('adminCreate').style.display = "none";
        document.getElementById('adminCreateHunt').style.display = "none";
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
                    <a onClick={() => this.changePage('home')}>Logout</a>
                    <div id = 'logo-small-nav'>
                    <LogoSmall/>
                </div>
                </div> 
            </div>
         
        );
    }
}
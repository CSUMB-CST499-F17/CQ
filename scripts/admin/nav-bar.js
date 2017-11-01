import * as React from 'react';
import { Socket } from '../Socket';
import { LogoSmall } from '../logo-small';


export class NavBar extends React.Component {
    constructor(props) {
    super(props);

    this.currentPage = this.props.lastPage;
    alert(this.currentPage);
    this.changePage = this.changePage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    componentDidMount(){
        
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
        Socket.on('adminPage', (data) => {
            this.setState({
                currentPage: data
            });
        });
        return (
            <div>
                <div id="topnav">
                    <a onClick={() => this.props.changePage('adminHome')}>Home</a>
                    <a onClick={() => this.props.changePage('adminLeaderboard')}>Leaderboard</a>
                    <a onClick={() => this.props.changePage('adminHunts')}>Hunts</a>
                    <a onClick={() => this.props.changePage('admins')}>Settings</a>
                    <a onClick={() => this.props.changePage('home')}>Logout</a>
                    <div id = 'logo-small-nav'>
                    <LogoSmall />
                </div>
                </div> 
            </div>
         
        );
    }
}
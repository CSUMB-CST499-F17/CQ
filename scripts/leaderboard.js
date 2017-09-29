import * as React from 'react';

// import { Socket } from './Socket';

export class Leaderboard extends React.Component {
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
        document.getElementById('leaderboard').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
        
    render() {
        return (
            <div>
                <header>REGISTER</header>
                <div id='intro'>
                    <form id='leaderboard-form'>
                        <input id='leaderboard-item' type="text" placeholder="Search Hunts" />
                        <button id='leaderboard-item'>Search</button>
                    </form>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/8/87/Maplestory_Leaderboard_2015-10.PNG' width='30%'></img>
                </div>
                <form onSubmit = {this.handleSubmit}>
                    <button onClick={() => this.changePage('home')}>Home</button>
                </form>
            </div>
         
        );
    }
}
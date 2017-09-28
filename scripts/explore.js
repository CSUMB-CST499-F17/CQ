import * as React from 'react';

// import { Socket } from './Socket';

export class Explore extends React.Component {
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
        document.getElementById('explore').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
        
    render() {
        return (
            <div>
                <header>EXPLORE THIS</header>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/8/8c/FZ_%28Explore%21%29_%288584496885%29.jpg' width='50%'></img>
                </div>
                <form onSubmit = {this.handleSubmit}>
                    <button onClick={() => this.changePage()}>Leaderboard</button>
                    <button onClick={() => this.changePage('register')}>Participate</button>
                </form>
                <form onSubmit = {this.handleSubmit}>
                    <button onClick={() => this.changePage('home')}>Home</button>
                </form>
            </div>
         
        );
    }
}
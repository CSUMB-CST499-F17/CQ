import * as React from 'react';

// import { Socket } from './Socket';

export class Home extends React.Component {
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
        document.getElementById('content').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
    render() {
        return (
            <div>
                <header>Coastal Quest</header>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG/1200px-Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG' width='50%'></img>
                </div>
                <form onSubmit = {this.handleSubmit}>
                    <button onClick={() => this.changePage('explore')}>Let's Explore!</button>
                    <button onClick={() => this.changePage('existingTeam')}>Log into Existing Team</button>
                    <button onClick={() => this.changePage('adminHome')}>Temp Button to Admin Homepage</button>
                </form>
            </div>
         
        );
    }
}
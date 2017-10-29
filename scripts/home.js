import * as React from 'react';
import { Socket } from './Socket';


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
        document.getElementById('home').style.display = "none";
        Socket.emit(page);
        document.getElementById(page).style.display = "block";
    }
    render() {

        return (
            <div>
                <div id='header'>
                    <img id="logo-big" src="../static/image/logo-big.png"/>
                </div>
                <div id='intro'>
                    <img id = "pageImage" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG/1200px-Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG' width='40%'></img>
                </div>
                <div id='buttons'>
                    <div className ="tool">
                        <button className="btn" onClick={() => this.changePage('explore')}>Let's Explore!</button>
                        <button className="btn" onClick={() => this.changePage('existingTeam')}>Log into Existing Team</button>
                        <button className="btn" onClick={() => this.changePage('adminHome')}>Temp Button to Admin Homepage</button>
                        <button className="btn" onClick={() => this.changePage('play')}>Temp Button to Play Page</button>
                    </div>
                </div>
            </div>

        );
    }
}

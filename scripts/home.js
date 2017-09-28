import * as React from 'react';

// import { Socket } from './Socket';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     key: ''
        // };
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.explore = this.explore.bind(this);
        this.existingTeam = this.existingTeam.bind(this);
    }
    
    // handleChange(event) {
    //     event.preventDefault();
    //     this.setState({key: event.target.value});
    // }
    
    handleSubmit(event) {
        event.preventDefault();
        // Socket.emit('explore');
        // document.getElementById('content').style.display = "none";
        // document.getElementById('explore').style.display = "block";
    }
    explore(event) {
        event.preventDefault();
        // Socket.emit('explore');
        document.getElementById('content').style.display = "none";
        document.getElementById('explore').style.display = "block";
    }
    existingTeam(event) {
        event.preventDefault();
        // Socket.emit('explore');
        document.getElementById('content').style.display = "none";
        document.getElementById('existingTeam').style.display = "block";
    }
    render() {
        return (
            <div>
                <header>Coastal Quest</header>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG/1200px-Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG' width='50%'></img>
                </div>
                <form >
                    <button onClick={this.explore}>Let's Explore!</button>
                    <button onClick={this.existingTeam}>Log into Existing Team</button>
                </form>
            </div>
         
        );
    }
}
import * as React from 'react';

export class ExistingTeam extends React.Component {
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
        document.getElementById('existingTeam').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
    render() {
        return (
            <div>
                <header>EXISTING TEAMS</header>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Full_Spectrum_Team_Waving.jpg/1024px-Full_Spectrum_Team_Waving.jpg' width='50%'></img>
                </div>
                <form>
                    <input type="text" placeholder="Enter email" />
                    <input type="text" placeholder="Enter access code" />
                    <button id= "chatSubmit">Enter!</button>
                 </form>
                 <form onSubmit = {this.handleSubmit}>
                    <button onClick={() => this.changePage('home')}>Home</button>
                </form>
            </div>
         
        );
    }
}
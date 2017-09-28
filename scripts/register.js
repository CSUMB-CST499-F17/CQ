import * as React from 'react';

// import { Socket } from './Socket';

export class Register extends React.Component {
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
        document.getElementById('register').style.display = "none";
        document.getElementById(page).style.display = "block";
    }
        
    render() {
        return (
            <div>
                <header>REGISTER</header>
                <div id='intro'>
                    <form id='register'>
                        <input id='register-item' type="text" placeholder="Enter email" /><br/>
                        <input id='register-item' type="text" placeholder="Enter access code" /><br/>
                        <select id='register-item'>
                            <option>Hunt One</option>
                            <option>Hunt Two</option>
                            <option>Hunt Three</option>
                        </select><br/>
                        <button id='register-item'>Enter!</button>
                    </form>
                </div>
                <form onSubmit = {this.handleSubmit}>
                    <button onClick={() => this.changePage('home')}>Home</button>
                </form>
            </div>
         
        );
    }
}
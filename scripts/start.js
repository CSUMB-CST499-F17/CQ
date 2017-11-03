import * as React from 'react';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';

import { LogoSmall } from './logo-small';

export class Start extends React.Component {
    constructor(props) {
        super(props);
        this.user = [];
        this.hunt = [];
        this.start_text = "";
        this.handleSubmit = this.handleSubmit.bind(this);
        this.start = this.start.bind(this);
        
        //retireves the hunt question information
        Socket.on('user', (data) => {
            this.user = data[0];
        });
    }

    componentDidMount(){
        //retireves the hunt question information
        Socket.on('playStart', (data) => {
            this.hunt = data[0];
            document.getElementById('h_name').innerHTML = this.hunt['name'];
            document.getElementById('h_image').src = "../static/image/gallery/" + this.hunt['image'];
            document.getElementById('h_start_text').innerHTML = this.hunt['start_text'];
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    
    start(){
        try{
            Socket.emit('progessUpdate', {'user': this.user, 'progress':1, 'score':this.hunt.length * 25, 'attempts': 5});   
            Socket.emit('updateTime', {'user': this.user, 'start_time': 'now', 'end_time':""});
        }
        catch(err){
            console.log(err);
        }
        this.props.changePage('play');
    }
    
    render() {

        return (
            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id = 'header'>
                    <header>Start</header>
                </div>
                <div id='intro'>
                <h1 id = "h_name"></h1>
                <h4 id='h_start_text'></h4>
                <img id = "h_image" src=""/>
                <p style={{display:this.props.hide}}>Once you are ready to begin, Start Scavenger Hunt!</p>
                    <div id='buttons'>
                        <button className="btn" onClick={this.start} style={{display:this.props.hide}}>Start Scavenger Hunt!</button>
                        <button className="btn" onClick={() => this.props.changePage('home')}>Home</button>
                    </div>      
                </div>
            </div>

        );
    }
}

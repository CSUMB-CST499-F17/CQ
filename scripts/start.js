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
        Socket.on('hunt', (data) => {
            this.hunt = data[0];
            this.start_text = data[0]['start_text']
            document.getElementById('start_text').textContent = this.start.text;
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
                <div id='start_text'></div>
                    <div id='buttons'>
                        <Button onClick={this.start}>Start Scavenger Hunt!</Button>
                        <Button onClick={() => this.props.changePage('home')}>Home</Button>
                    </div>      
                </div>
            </div>

        );
    }
}

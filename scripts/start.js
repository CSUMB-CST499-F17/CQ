import * as React from 'react';
import { Socket } from './Socket';

export class Start extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handle = this.handle.bind(this);
        this.start = this.start.bind(this);

    }
    
    handleSubmit(event) {
        event.preventDefault();
    }
    
    start(){
        Socket.emit('updateTime', {'user': this.props.state.user, 'start_time': "now", 'end_time':""});
        Socket.emit('update', {'user': this.props.state.user, 'progress':1, 'score':this.props.state.questions.length * 25, 'attempts': 5}, Socket.callback=this.handle);   
    }
    
    handle(callback){
        var data = JSON.parse(callback);
        this.props.setPlay(data['user']);
        this.props.changePlay('start', 'playGame');
    }
    
    render() {
        let hname = this.props.state.hunt.name;
        let hstext = this.props.state.hunt.start_text;
        let himage = "../static/image/gallery/" + this.props.state.hunt.image;
        return (
            <div>
                <div id = 'header'>
                    <header>Start</header>
                </div>
                <div id='intro'>
                    <h1 id = "h_name">{hname}</h1>
                    <h4 id='h_start_text'>{hstext}</h4>
                    <img id = "h_image" src={himage}/>
                    <p style={{display:this.props.hide}}>Press <b>Start Scavenger Hunt!</b> when you are ready to begin!</p>
                </div>
                <div className='buttons'>
                    <button className="btn" onClick={() => this.start()} style={{display:this.props.hide}}>Start Scavenger Hunt!</button>
                    <button className="btn" onClick={() => this.props.changePage('home')}>Home</button>
                </div>  
            </div>

        );
    }
}

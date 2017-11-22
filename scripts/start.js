import * as React from 'react';
import { Socket } from './Socket';

export class Start extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handle = this.handle.bind(this);
        this.start = this.start.bind(this);
        this.show = this.show.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
    }
    
    start(){
        if(this.props.state.questions.length > 0){
            Socket.emit('updateTime', {'user': this.props.state.user, 'start_time': "now", 'end_time':""});
            Socket.emit('update', {'user': this.props.state.user, 'progress':1, 'score':this.props.state.questions.length * 25, 'attempts': 5, 'hints':0}, Socket.callback=this.handle);   
        }
        else{
            this.props.changePlay('start', 'complete');
        }
    }
    
    handle(callback){
        console.log(callback);
        var data = JSON.parse(callback);
        this.props.setPlay(data['user']);
        this.props.changePlay('start', 'playGame');
    }
    
    show(){
        if(document.getElementById('modal').style.display == 'block'){
            document.getElementById('modal').style.display = 'none';
        }
        else{
            document.getElementById('modal').style.display = 'block';
        }
    }
    
    render() {
        let hname = this.props.state.hunt.name;
        let hstext = this.props.state.hunt.start_text;
        let himage = this.props.state.hunt.image;
    
        return (
            <div>
                <div id = 'modal' className='modal-content' style={{display:'none'}}>
                  <div  className="tutorial text"><header>How To Play</header>
                    <div id="modal-text">
                        <div className="tutorial-message" >It’s time to begin your quest!</div>
                        <div className="tutorial-message" >Points are earned based on:
                        <ul>total time to complete the scavenger hunt and correct answers on the questions</ul>
                        Fastest time and the least amount of wrong answers is how you win.</div>
                        <div className="tutorial-message" >Each question is worth up to <b>25 points</b>.</div>
                        <div className="tutorial-message" >For each incorrect answer, <b>5 points</b> will be deducted until you reach 0 points for that question.</div>
                        <div className="tutorial-message" >There may be <b>hints</b> available, but <b>5 points</b> will be deducted when used.</div>
                        <div className="tutorial-message" >You must answer the question to move on to the next.
                        You have the option to <b>skip</b> questions, but no points will be awarded to any question skipped.</div>
                        <div className="tutorial-message" >Most importantly, have fun!
                        Enjoy the beautiful and scenic Monterey Bay!  Talk with the locals!  Learn something new about this historic area!  
                        </div><br/>
                        <button className = "btn" onClick={() => this.show()}>Close</button>
                    </div>
                  </div>
                </div>
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
                    <button className = "btn" onClick={() => this.show()}>How To Play</button>
                    <button className="btn" onClick={() => this.start()} style={{display:this.props.hide}}>Start Scavenger Hunt!</button>
                    <button className="btn" onClick={() => this.props.changePage('home')}>Home</button>
                </div>  
            </div>

        );
    }
}

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
        console.log("In show");
        document.getElementById('modal').style.display = 'block';
    }
    
    render() {
        let hname = this.props.state.hunt.name;
        let hstext = this.props.state.hunt.start_text;
        let himage = this.props.state.hunt.image;
        
        // var myBigGreenDialog = {
        //     backgroundColor: 'rgba(190, 190, 190, .95)',
        //     fontSize: '28px',
        //     color: '#ffffff',
        //     // width: '75%',
        //     // height: '600px',
        //     marginTop: '-20%',
        //     // marginLeft: '-37%',
        //     borderRadius: '25px',
        // };
    
        return (
            <div>
                <div id = 'modal' className='modal-content' style={{display:'none'}}>
                  <div  className="tutorial text"><header>How To Play</header><br/>
                    <div>It’s time to begin your quest!</div>
                    <div>You will earn points based on total time to complete the scavenger hunt and correct answers on the questions and challenges.
                    Fastest time and the least amount of wrong answers is how you win.</div>
                    <div>Each question or challenge is worth 25 points. If you answer correctly on the first try, you earn 25 points.</div>
                    <div>If you answer incorrectly, you may try again for 20 points.</div>
                    <div>There may be clues or hints available, but 5 points will be deducted when used.</div>
                    <div>In summary, each question is worth 25 points. 
                    Each wrong answer and/or hint will cost 5 points.  You must answer the question to move on to the next. 
                    You have the option to skip questions, but no points will be awarded to any question skipped.</div>
                    <div>Most importantly, have fun! 
                    Enjoy the beautiful and scenic Monterey Bay!  Talk with the locals!  Learn something new about this historic area!  
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

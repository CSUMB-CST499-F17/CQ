
import * as React from 'react';
import { Socket } from './Socket';
import { FormControl } from 'react-bootstrap';

export class PlayGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'hunt':[],
            'questions':[{}],
            'user':[],
            'currentQ':0
        };
    }
    
    

    

    componentWillUpdate(nextProps, nextState){
        console.log("Hello");
        this.setState({
            'hunt': nextProps.hunt,
            'questions':nextProps.questions,
            'user':nextProps.user,
            'currentQ':nextProps.user['progress'] - 1
        });
    }


    
    render() {
        if(this.state.questions.length > 0){
            for(var i = 0; i < this.state.questions.length; i++) {
                var obj = this.state.questions[i];
                if(i == this.state.playerQuestionOn){
                    var num = i + 1;
                    document.getElementById('play-question').innerHTML = "#"  + num + " - "  + obj.question;
                    this.state.correctAnswer = obj.answer;
                    document.getElementById('hint1').innerHTML = "Hint One: " + obj.hint1;
                    document.getElementById('hint2').innerHTML = "Hint Two: " + obj.hint2;
                    this.state.hint1 = obj.hint1;
                    this.state.hint2 = obj.hint2;
                }
            }
        }
        
        return (
            <div>
                <div id = 'header'>
                    <header id="game">Game Name</header>
                </div>
                <div id = 'intro'>
                    <div id='play-container'>
                        <div id="play-form">
                            <div id="play-question"></div>
                            <div id='hints'>
                                <div id='hint1' style={{display:'none'}}>Hint PlaceHolder</div>
                                <div id='hint2' style={{display:'none'}}>Hint PlaceHolder</div>
                            </div>
                        </div> 
                        <div id = 'input'> 
                                <label id="points" style={{display:this.props.hide, color:'#f2e537'}}>Points Avaiable For this Question: </label>
                                <FormControl id = "answer" style={{display:this.props.hide}} componentClass="textarea" value={this.state.value} onChange={this.handleChange}  placeholder="Answer" />
                                <div id='result'style={{visibility:'hidden'}}>Results Placeholder<br/>array</div>
                        </div>
                    </div>
                    <div className='buttons'>
                            <button className="btn" id="next" style={{display:'none'}} onClick={this.nextQuestion} >Next Question</button>
                            <button className="btn" id="complete-button" style={{display:'none'}} onClick={this.completed}>Finish</button> 
                            <button className="btn" id="answer-submit" style={{display:this.props.hide}} onClick={this.checkAnswer} >Submit</button>
                            <button className="btn" id="hint-submit" style={{display:this.props.hide}} onClick={this.showHint}>Hint</button>
                            <button className="btn" id="skip" style={{display:'none'}} onClick={this.skip} >Skip Question</button>
                            
                    </div>
                    <div className='buttons'>
                        <button className="btn" onClick={() => this.props.logOutSetProps()}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}
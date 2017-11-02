/*
Needs:
To be connected to Database
Hint options
*/

import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { LogoSmall } from './logo-small';

export class Play extends React.Component {
    constructor(props) {
        super(props);
        this.pageName = 'play';
        this.state = {
            'questionsData' : [],
            'attempts':[],
            'hintCount':0,
            'playerQuestionOn' :0,
            'question': '',
            'correctAnswer': '',
            'hint1': '',
            'hint2': '',
            'questionNum' : 0,
            'userAnswer' : '',
            'user':[]

        };
        this.score = 0;
        this.point = 20;
        this.attempts = 5;
        this.data = [];
        this.dataSize = 0;
        
        this.emit = this.emit.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.completed = this.completed.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.skip = this.skip.bind(this);
        this.showHint = this.showHint.bind(this);
        
        
        //retireves the user information
        Socket.on('user', (data) => {
            this.setState({
                'user': data[0],
                'playerQuestionOn': data[0]['progress'] - 1
            });
            this.score = data[0]['score'];
            this.attempts = data[0]['attempts'];
            this.point = this.attempts * 5;
            document.getElementById('points').innerHTML = "Points Avaiable For this Question: " + this.point;
            if(this.state.hint1 == ""){
                document.getElementById('hint-submit').style.display = "none";
            }
        });
    }
    
    emit(){
        try{
            Socket.emit('progessUpdate', {'user': this.state.user, 'progress':this.state.playerQuestionOn + 1, 'score':this.score, 'attempts': this.attempts});    
        }
        catch(err){
            console.log(err);
        }
    }
    
    checkAnswer(){
        var result = document.getElementById('result');
        if(this.state.userAnswer == this.state.correctAnswer){
            result.style.visibility = 'visible';
            result.textContent = 'Correct';
            result.style.color="#9bf442";
            if(this.state.playerQuestionOn + 2 == this.dataSize){
                document.getElementById('next').textContent = "Last Question";
            }
            if(this.state.playerQuestionOn + 1 == this.dataSize){
                document.getElementById('complete-button').style.display = "block";
            }
            if(this.state.playerQuestionOn < this.dataSize - 1){
                document.getElementById('next').style.display = "block";
            }
            document.getElementById('answer-submit').style.display = "none";
            document.getElementById('hint-submit').style.display = "none";
            document.getElementById('result').style.display = "block";
        }
        else{
            if(document.getElementById('answer').value != ""){
                if(this.attempts > 0){
                    this.score -= 5;
                    this.attempts --;
                    this.emit();
                }
                document.getElementById('skip').style.display = "block";
                var newArray = this.state.attempts.slice();    
                newArray.push(" " + document.getElementById('answer').value);   
                this.setState({attempts:newArray})
                result.style.visibility = 'visible';
                result.innerHTML = 'Incorrect <br/> Attempts: ' + newArray;
                result.style.color="red";
                document.getElementById('answer').value = "";
                document.getElementById('result').style.display = "block";
            }
        }

    }
    
    completed(){
        this.emit();
        Socket.emit('updateTime', {'user': this.state.user, 'start_time': "", 'end_time':'now'});
        this.props.changePage('complete');
    }
    
    componentDidMount() {
        //retireves the hunt question information
        Socket.on('hunt', (data) => {
            this.setState({
                'questionsData': data
            });
        });
    }
    
    handleChange(event){
        this.setState({
            userAnswer : event.target.value
        });
    }
    
    nextQuestion(){
        this.attempts = 5;
        document.getElementById('answer-submit').style.display = "block";
        document.getElementById('hint-submit').style.display = "block";
        document.getElementById('hint1').style.display = "none";
        document.getElementById('hint2').style.display = "none";
        document.getElementById('next').style.display = "none";
        document.getElementById('result').style.display = "none";
        document.getElementById('answer').value = "";
        
        this.state.playerQuestionOn++;
        this.emit();
        for(var i = 0; i < this.data.length; i++) {
            var obj = this.data[i];
            if(i == this.state.playerQuestionOn){
                document.getElementById('play-question').innerHTML = obj.question;
                this.state.correctAnswer = obj.answer;
                document.getElementById('hint1').innerHTML = "Hint One: " + obj.hint1;
                document.getElementById('hint2').innerHTML = "Hint Two: " + obj.hint2;
                this.state.hint1 = obj.hint1;
                this.state.hint2 = obj.hint2;
            }
        }
    }
    //reveals the hint on hint button ciick
    showHint(){
        if(this.attempts > 0){
            this.score -= 5;
            this.attempts--;
            this.emit();
        }
        document.getElementById('points').innerHTML = "Points Avaiable For this Question: " + this.point;
        this.state.hintCount += 1;
        document.getElementById('hint1').style.display = "block";
        //condition when the button is clicked once
        if(this.state.hintCount == 1 && this.state.hint2 == ""){
            //checks to see if there is a second hint, if not, the button disappears
            document.getElementById('hint-submit').style.display = "none";
        }
        //condition if the button is clicked twice and there is a second hint
        if(this.state.hintCount == 2 && this.state.hint2 != ""){
            document.getElementById('hint2').style.display = "block";
            document.getElementById('hint-submit').style.display = "none";
        }
    }
    
    skip(){
        this.score = this.score - this.point;
        this.nextQuestion();
    }
    

    render() {
        
        this.data = this.state.questionsData;
        this.dataSize = this.data.length;
        for(var i = 0; i < this.data.length; i++) {
            var obj = this.data[i];
            if(i == this.state.playerQuestionOn){
                document.getElementById('play-question').innerHTML = obj.question;
                this.state.correctAnswer = obj.answer;
                document.getElementById('hint1').innerHTML = "Hint One: " + obj.hint1;
                document.getElementById('hint2').innerHTML = "Hint Two: " + obj.hint2;
                this.state.hint1 = obj.hint1;
                this.state.hint2 = obj.hint2;
            }
    }

        return (

            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id = 'header'>
                    <header>Game Name</header>
                </div>
                <div id='play-container'>
                    <div id="play-form">
                        <div id="play-question">
                        </div>
                        <div id='hint1' style={{display:'none'}}>Hint PlaceHolder</div>
                        <div id='hint2' style={{display:'none'}}>Hint PlaceHolder</div>
                    </div> 
                    <div id = 'input'> 
                            <label for="answer" id="points" style={{display:this.props.hide}}>Points Avaiable For this Question: </label>
                            <FormControl id = "answer" style={{display:this.props.hide}} componentClass="textarea" value={this.state.value} onChange={this.handleChange}  placeholder="Answer" />
                            <div id='result'style={{visibility:'hidden'}}>Results Placeholder<br/>array</div>
                    </div>
                    <div className='buttons'>
                        <ButtonToolbar>
                            <Button id="next" style={{display:'none'}} onClick={this.nextQuestion} >Next Question</Button>
                            <Button id="complete-button" style={{display:'none'}} onClick={this.completed}>Finish</Button>   
                            <Button id="answer-submit" style={{display:this.props.hide}} onClick={this.checkAnswer} >Submit</Button>
                            <Button id="skip" style={{display:'none'}} onClick={this.skip} >Skip Question</Button>
                            <Button id="hint-submit" style={{display:this.props.hide}} onClick={this.showHint}>Hint</Button>
                            <Button onClick={() => this.props.changePage('home')}>Home</Button>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>

        );
    }
}

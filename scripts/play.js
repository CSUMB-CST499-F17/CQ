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
            'displayer' :'',
            'hintCount':0,
            'attempts':[],
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
        this.attempts = 5;
        this.data = [];
        this.dataSize = 0;
        this.handleChange = this.handleChange.bind(this);
        this.showHint = this.showHint.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
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
            document.getElementById('answer-submit').style.display = "none";
            document.getElementById('hint-submit').style.display = "none";
            document.getElementById('next').style.display = "block";
            document.getElementById('result').style.display = "block";
        }
        else{
            if(document.getElementById('answer').value != ""){
                if(this.attempts > 0){
                    this.score -= 5;
                    this.attempts --;
                    Socket.emit('progessUpdate', {'user': this.state.user, 'progress':this.state.playerQuestionOn, 'score':this.score, 'attempts': this.attempts});    
                }
                console.log(this.score);
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
    handleChange(event){
        this.setState({
            userAnswer : event.target.value
        });
    }
    //reveals the hint on hint button ciick
    showHint(event){
        console.log(this.score);
        if(this.attempts > 0){
            this.score -= 5;
            this.attempts --;
            Socket.emit('progessUpdate', {'user': this.state.user, 'progress':this.state.playerQuestionOn, 'score':this.score, 'attempts': this.attempts});    
        }
        console.log(this.score);
        this.state.hintCount += 1;
        document.getElementById('hint1').style.display = "block";
        // console.log(this.state.x)
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

    componentDidMount() {
        //retireves the hunt question information
        Socket.on('hunt', (data) => {
            this.setState({
                'questionsData': data
            });
        });
        //retireves the user information
        Socket.on('user', (data) => {
            this.setState({
                'user': data[0],
                'playerQuestionOn': data[0]['progress'] - 1
            });
            this.score = data[0]['score'];
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
        Socket.emit('progessUpdate', {'user': this.state.user, 'progress':this.state.playerQuestionOn, 'score':this.score});

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
                    <Form  >
                        <FormGroup id="play-form">
                                <FormControl.Static>
                                    <div id="play-question">
                                    </div>
                                    <div id='hint1' style={{display:'none'}}>Hint PlaceHolder</div>
                                    <div id='hint2' style={{display:'none'}}>Hint PlaceHolder</div>
                                </FormControl.Static>
                                <FormControl id = "answer" style={{display:this.props.hide}} componentClass="textarea" value={this.state.value} onChange={this.handleChange}  placeholder="Answer" />
                                <div id='result'style={{visibility:'hidden'}}>Results Placeholder<br/>array</div>
                        </FormGroup> 
                    </Form>
                    <div id='buttons'>
                        <ButtonToolbar>
                            <Button id="next" style={{display:'none'}} onClick={this.nextQuestion} >Next Question</Button>
                            <Button id="answer-submit" style={{display:this.props.hide}} onClick={this.checkAnswer} >Submit</Button>
                            <Button id="hint-submit" style={{display:this.props.hide}} onClick={this.showHint}>Hint</Button>
                            <Button onClick={() => this.props.changePage('home')}  >Home</Button>
                        </ButtonToolbar>
                    </div>

                </div>
            </div>

        );
    }
}

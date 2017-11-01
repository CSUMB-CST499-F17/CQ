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
            'userAnswer' : '',
            'displayer' :'',
            'hintCount':0,
            'attempts':[],
            'playerQuestionOn' :0,
            'question': '',
            'correctAnswer': '',
            'hint1': '',
            'hint2': '',
            'questionNum' : '',
            'userAnswer' : '',

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showHint = this.showHint.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();
        var result = document.getElementById('result');
        if(this.state.userAnswer == this.state.correctAnswer){
            result.style.visibility = 'visible';
            result.textContent = 'Correct';
            result.style.color="#9bf442";
            this.setState({attempts:[]})
            document.getElementById('answer-submit').style.display = "none";
            document.getElementById('hint-submit').style.display = "none";
            document.getElementById('next').style.display = "block";
            document.getElementById('result').style.display = "block";
        }
        else{
            if(document.getElementById('answer').value != "")
            {
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
        var data = this.state.questionsData;
        for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            if(i == this.state.playerQuestionOn){
                this.state.hint1 = obj.hint1;
                this.state.hint2 = obj.hint2;
            }
        }
        this.state.hintCount += 1
        var hint = document.getElementById('hint');
        document.getElementById('hint').style.display = "block";
        // console.log(this.state.x)
        //condition when the button is clicked once
        if(this.state.hintCount == 1 ){
            hint.innerHTML = "Hint One: " + this.state.hint1;
            //checks to see if there is a second hint, if not, the button disappears
            if((this.state.hint2 == "")){
                document.getElementById('hint-submit').style.display = "none";
            }
        }
        //condition if the button is clicked twice and there is a second hint
        if(this.state.hintCount == 2 && this.state.hint2 != ""){
            hint.innerHTML = hint.innerHTML +' <br/>' + "Hint Two: "+ this.state.hint2;
            document.getElementById('hint-submit').style.display = "none";
        }
    }

    componentDidMount() {
        //retireves the hunt question information
        Socket.on('hunt', (data) => {
            this.setState({
                'questionsData': data['questionsData']
            });
        });
    }
    
    nextQuestion(event){
        this.state.playerQuestionOn++;
        
        var data = this.state.questionsData;
        for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            if(i == this.state.playerQuestionOn){
                this.state.question = obj.question;
                this.state.correctAnswer = obj.answer;
                this.state.hint1 = obj.hint1;
                this.state.hint2 = obj.hint2;
            }
        }
        
        document.getElementById('answer-submit').style.display = "block";
        document.getElementById('hint-submit').style.display = "block";
        document.getElementById('hint').style.display = "none";
        document.getElementById('next').style.display = "none";
        document.getElementById('result').style.display = "none";
        document.getElementById('answer').value = "";
        
        
    }


    render() {
        
        var data = this.state.questionsData;
        for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            if(i == this.state.playerQuestionOn){
                this.state.question = obj.question;
                this.state.correctAnswer = obj.answer;
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
                                        <p>{this.state.question}</p>
                                    </div>
                                    <div id = 'hints'>
                                    <div id='hint'></div>
                                    </div>
                                </FormControl.Static>
                                <FormControl id = "answer"   componentClass="textarea" value={this.state.value} onChange={this.handleChange}  placeholder="Answer" />
                                <div id='result'style={{visibility:'hidden'}}>Results Placeholder<br/>array</div>
                        </FormGroup> 
                    </Form>
                    <div id='buttons'>

                        <ButtonToolbar>
                            <Button id="next" style={{display:'none'}} onClick={this.nextQuestion} >Next Question</Button>
                            <Button id="answer-submit"  onClick={this.handleSubmit} >Submit</Button>
                            <Button id="hint-submit"  onClick={this.showHint}>Hint</Button>
                            <Button onClick={() => this.props.changePage(this.pageName,'home')}  >Home</Button>
                        </ButtonToolbar>
                    </div>

                </div>
            </div>

        );
    }
}


// <InputGroup>
//     <ButtonToolbar>
//         <input id='play-item' type="text" placeholder="Enter Answer" /><br/>
//         <Button>Submit</Button>
//     </ButtonToolbar>
// </InputGroup>

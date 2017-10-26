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
        this.state = {
            'prompt': '',
            'questions': '',
            'correctAnswer': '',
            'hint1': '',
            'hint2': '',
            'questionNum' : '',
            'userAnswer' : '',
            'displayer' :'',
            'x':0

        };
        this.changePage = this.changePage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showHint = this.showHint.bind(this);

    }


    handleSubmit(event){
        event.preventDefault();

        var result = document.getElementById('result');
        result.style.visibility = 'visible';
        if(this.state.userAnswer == this.state.correctAnswer){
            result.textContent = 'Correct';
            result.style.color="#9bf442";
            document.getElementById('answer-submit').style.display = "none";
            document.getElementById('hint-submit').style.display = "none";
            document.getElementById('next').style.display = "block";
        }else{
            result.textContent = 'Incorrect'
            result.style.color="red";

        }

    }
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('play').style.display = "none";
        Socket.emit(page);
        document.getElementById(page).style.display = "block";
    }


    handleChange(event){
        this.setState({
            userAnswer : event.target.value
        });
    }

    showHint(event){
        this.state.x += 1
        var hint = document.getElementById('hint');
        console.log(this.state.x)
        if(this.state.x == 1 )
        {
            hint.innerHTML = "Hint One: " + this.state.hint1;
        }
        if(this.state.x == 2 && this.state.hint2 != "")
        {
            hint.innerHTML = hint.innerHTML +' <br/>' + "Hint Two: "+ this.state.hint2;
        }
        if(this.state.x > 2 || (this.state.x == 2 &&  this.state.hint2 == "")){
            alert("No more hints available")
        }
    }

    componentDidMount() {
        Socket.on('hunt', (data) => {
            this.setState({
                'prompt': data['questions'],
                'questions': data['question'],
                'correctAnswer': data['correctAnswer'],
                'hint1': data['hint1'],
                'hint2': data['hint2'],
                'questionNum' : data['questionNum']
            });
        });
        console.log(this.state.hint2);
    }


    render() {
        let prompt = this.state.prompt;
        let hints = this.state.hints;
        let questionNum = this.state.questionNum;



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
                            <ControlLabel>Current Objective Intro.</ControlLabel>
                                <FormControl.Static>
                                    <div id="play-question">
                                        <p>{prompt}</p>
                                    </div>
                                    <div id = 'hints'>
                                    <div id='hint'></div>
                                    </div>
                                </FormControl.Static>
                                <FormControl id = "answer" componentClass="textarea" value={this.state.value} onChange={this.handleChange}  placeholder="Answer" />
                                <div id='result'style={{visibility:'hidden'}}>Incorrect</div>
                        </FormGroup> 
                    </Form>
                    <div id='buttons'>
                        <ButtonToolbar>
                            <Button id="next" style={{display:'none'}} >Next Question</Button>
                            <Button id="answer-submit" onClick={this.handleSubmit} >Submit</Button>
                            <Button id="hint-submit" onClick={this.showHint}>Hint</Button>
                            <Button onClick={() => this.changePage('home')}>Home</Button>
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

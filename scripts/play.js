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

        if(this.state.userAnswer == this.state.correctAnswer){
            result.textContent = 'Correct';
        }else{
            result.textContent = 'Incorrect'
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

        if(this.state.x == 1 ){
            hint.textContent = this.state.hint1;
        }else if( this.state.x == 2){

            hint.textContent = this.state.hint2;
            if (this.state.hint2 == ""){
                hint.textContent = this.state.hint1;
            }
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
                <div id='intro'>
                    <Form  >
                            <div id='buttons'>
                                <FormGroup>
                                    <ControlLabel>Current Objective Intro.</ControlLabel>

                                        <FormControl.Static>
                                            <div>
                                                <p>{prompt}</p>
                                            </div>
                                            <div id='hint'></div>
                                            <div id='result'></div>
                                        </FormControl.Static>

                                        <FormControl componentClass="textarea" value={this.state.value} onChange={this.handleChange}  placeholder="Answer" />

                                        <Button id= "answerSubmit" onClick={this.handleSubmit}  >
                                            Submit
                                        </Button>

                                        <Button id= "hint display" onClick={this.showHint}  >
                                            Hint
                                        </Button>



                                    </FormGroup>
                            </div>
                    </Form>

                    <Button onClick={() => this.changePage('home')}>
                            Home
                    </Button>

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

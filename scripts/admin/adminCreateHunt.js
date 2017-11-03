import * as React from 'react';
import { Socket } from '../Socket';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';

import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


export class AdminCreateHunt extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            'count':0,
            'limit':35,
            'name':'',
            'sDate':'',
            'eDate':'',
            'url':'',
            'type':'',
            'desc':'',
            
            'question':[],
            'answer':[],
            'answerDesc':[],
            'hint1':[],
            'hint2':[],
            'image':[]
        };
        
        this.addQuestion = this.addQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.state.name = document.getElementById('name').value;
        this.state.sDate = document.getElementById('sDate').value;
        this.state.eDate = document.getElementById('eDate').value;
        this.state.url = document.getElementById('url').value;
        this.state.type = document.getElementById('type').value;
        this.state.desc = document.getElementById('desc').value;
        
        var i;
        for(i = 0; i < this.state.count; i++){
            this.state.question[i]= document.getElementById('Q' + i+ 'desc').value; 
            this.state.answer[i]= document.getElementById('Q' + i+ 'ans').value;
            this.state.answerDesc[i]= document.getElementById('Q' + i+ 'anstext').value;
            this.state.hint1[i]= document.getElementById('Q' + i+ 'hint1').value;
            this.state.hint2[i]= document.getElementById('Q' + i+ 'hint2').value;
            this.state.image[i] = document.getElementById('Q' + i+ 'image').value;
        }
    	
    	Socket.emit('createHunt',{
            'name':this.state.name,
            'sDate':this.state.sDate,
            'eDate':this.state.eDate,
            'url':this.state.url,
            'type':this.state.type,
            'desc':this.state.desc,
            
            'question':this.state.question,
            'answer':this.state.answer,
            'answerDesc':this.state.answerDesc,
            'hint1':this.state.hint1,
            'hint2':this.state.hint2,
            'image':this.state.image
    	});
    	this.changePage('adminHome')
    }
    
    addQuestion(){
        // Get the quiz form element
        var question = document.getElementById('question');
    
        // Good to do error checking, make sure we managed to get something
        if (question)
        {
            if (this.state.count < this.state.limit)
            {
                //creating elements
                var newQuestion = document.createElement('textarea');
                newQuestion.id = 'Q' + this.state.count + 'desc';
                newQuestion.className = 'form-control';
                newQuestion.placeholder="Question";
                newQuestion.rows="1";
                var newAnswer = document.createElement('input');
                newAnswer.type = 'text';
                newAnswer.id = 'Q' + this.state.count + 'ans';
                newAnswer.className = 'form-control';
                newAnswer.placeholder="Answer";
                var newAnswerDesc = document.createElement('textarea');
                newAnswerDesc.id = 'Q' + this.state.count + 'anstext';
                newAnswerDesc.className = 'form-control';
                newAnswerDesc.placeholder="Answer Description";
                newAnswerDesc.rows="1";
                var newHint = document.createElement('textarea');
                newHint.id = 'Q' + this.state.count  + 'hint1';
                newHint.className = 'form-control';
                newHint.placeholder="Hint One";
                newHint.rows="1";
                var newHint2 = document.createElement('textarea');
                newHint2.id = 'Q' + this.state.count  + 'hint2';
                newHint2.className = 'form-control';
                newHint2.placeholder="Hint Two";
                newHint2.rows="1";
                var newImage = document.createElement('input');
                newImage.type='text'
                newImage.id = 'Q' + this.state.count  + 'image';
                newImage.className = 'form-control';
                newImage.placeholder="Image URL";
                
                // Create a new <p> element
                var newP = document.createElement('div');
                newP.className = 'question-group';
                var label = document.createElement('div');
                label.textContent = 'Question ' + (this.state.count + 1);
                label.id = 'question-label';
                newP.appendChild(label);
                newP.appendChild(newQuestion);
                newP.innerHTML = newP.innerHTML + '<br/>';
                newP.appendChild(newAnswer);
                newP.innerHTML = newP.innerHTML + '<br/>';
                newP.appendChild(newAnswerDesc);
                newP.innerHTML = newP.innerHTML + '<br/>';
                newP.appendChild(newHint);
                newP.appendChild(newHint2);
                newP.innerHTML = newP.innerHTML + '<br/>';
                newP.appendChild(newImage);


                // Good practice to do error checking
                if (newP)   
                {
                    // Add the new elements to the form
                    question.appendChild(newP);
                    // Increment the count
                    this.state.count++;
                    
                }
    
            }
            else   
            {
                alert('Question limit reached');
            }
        }
    }

    render() {
        return (
            <div >
                <div id = 'header'>
                    <header>Create Hunt</header>
                </div>
                <div id='introhunts'>
                    <div id="create-form-container">
                        <Form id = 'create-form'>
                                <FormGroup>
                                    <InputGroup>
                                        <div id='create-form1'>
                                            <input type='text' id='name' className='form-control create-item' type="text" placeholder="Game Name" /><br/>
                                            <input type='text' id='url' className='form-control create-item' type="text" placeholder="Image URL" /><br/>
                                            <input type='text' id='type' className='form-control create-item' type="text" placeholder="Hunt Type" />
                                            <input type='text' id='desc' className='form-control create-item' type="text" placeholder="Description" /><br/>
                                            <DayPickerInput className='form-control create-item' placeholder='Start Date'/>
                                            <DayPickerInput className='form-control create-item' placeholder='End Date'/>
                                        </div>
                                        <div id='create-form2'>
                                            <Button id='create-item' onClick={() => this.addQuestion()}>Add question</Button>
                                            <div id="question" action="" method="POST"></div>
                                        </div>
                                    </InputGroup>
                                </FormGroup>
                        </Form>
                    </div>
                </div>
                <div className='buttons'>
                    <ButtonToolbar>
                        <Button onClick={this.handleSubmit}>Save</Button>
                    </ButtonToolbar>
                </div>
            </div>
         
        );
    }
}
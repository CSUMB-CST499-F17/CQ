import * as React from 'react';
import { Socket } from '../Socket';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';

export class AdminCreateHunt extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            'count':1,
            'limit':25,
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

        this.changePage = this.changePage.bind(this);
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
    	window.console.log(this.state.name);
    	
    }
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('adminCreateHunt').style.display = "none";
        document.getElementById(page).style.display = "block";
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
                var newQuestion = document.createElement('input');
                newQuestion.type = 'text';
                newQuestion.id = 'Q' + this.state.count + 'desc';
                newQuestion.className = 'question-item';
                newQuestion.placeholder="Question";
                var newAnswer = document.createElement('input');
                newAnswer.type = 'text';
                newAnswer.id = 'Q' + this.state.count + 'ans';
                newAnswer.className = 'question-item';
                newAnswer.placeholder="Answer";
                var newAnswerDesc = document.createElement('input');
                newAnswerDesc.type = 'text';
                newAnswerDesc.id = 'Q' + this.state.count + 'anstext';
                newAnswerDesc.className = 'question-item';
                newAnswerDesc.placeholder="Answer Description";
                var newHint = document.createElement('input');
                newHint.type = 'text';
                newHint.id = 'Q' + this.state.count  + 'hint1';
                newHint.className = 'question-item';
                newHint.placeholder="Hint One";
                var newHint2 = document.createElement('input');
                newHint2.type = 'text';
                newHint2.id = 'Q' + this.state.count  + 'hint2';
                newHint2.className = 'question-item';
                newHint2.placeholder="Hint One";
                var newImage = document.createElement('input');
                newImage.type = 'text';
                newImage.id = 'Q' + this.state.count  + 'image';
                newImage.className = 'question-item';
                newImage.placeholder="Image URL";
                
                // Create a new <p> element
                var newP = document.createElement('div');
                newP.className = 'question-group';
                newP.innerHTML = 'Question ' + (this.state.count + 1) + '<br/>';
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
            <div>
                <div id = 'header'>
                    <header>Create Hunt</header>
                </div>
                <div id='intro'>
                    <Form id = 'create-form'>
                            <FormGroup>
                                <InputGroup>
                                    <div id='create-form1'>
                                        <input id='name' className='create-item' type="text" placeholder="Game Name" /><br/>
                                        <input id='sDate' className='create-item' type="text" placeholder="Start Date" />
                                        <input id='eDate' className='create-item' type="text" placeholder="End Date" /><br/>
                                        <input id='url' className='create-item' type="text" placeholder="Image URL" /><br/>
                                        <input id='type' className='create-item' type="text" placeholder="Hunt Type" />
                                        <input id='desc' className='create-item' type="text" placeholder="Description" /><br/>
                                    </div>
                                    <div id='create-form2'>
                                        <Button id='create-item' onClick={() => this.addQuestion()}>Add question</Button>
                                        
                                        <div id="question" action="" method="POST">
                                        <div>Question 1</div>
                                        <input type='text' id = 'Q0desc' placeholder='Question'/><br/>
                                        <input type='text' id = 'Q0ans' placeholder='Answer'/><br/>
                                        <input type="text" id = 'Q0anstext' placeholder="Answer Description" /><br/>
                                        <input type='text' id = 'Q0hint1' placeholder='Hint1'/>
                                        <input type='text' id = 'Q0hint2' placeholder='Hint2'/><br/>
                                        <input type="text" id = 'Q0image'   placeholder="Question Image" /><br/>
                                        
                                        
                                        </div>
                                    </div>
                                    <div id='buttons'>
                                        <ButtonToolbar>
                                            <Button id='create-item' onClick={this.handleSubmit}>Save</Button>
                                        </ButtonToolbar>
                                    </div>
                                </InputGroup>
                            </FormGroup>
                        
                    </Form>
                </div>
            </div>
         
        );
    }
}
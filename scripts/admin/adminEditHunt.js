import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
// import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export class AdminEditHunt extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            'count':0,
            'limit':25
        };
        
        this.addQuestion = this.addQuestion.bind(this);
        this.printQuestion = this.printQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    addQuestion(){
        // Get the quiz form element
        var question = document.getElementById('questionEdit');
    
        // Good to do error checking, make sure we managed to get something
        if (question)
        {
            if (this.state.count < this.state.limit)
            {
                // Edit a new <p> element
                var newP = document.createElement('div');
                newP.innerHTML = 'Question ' + (this.state.count + 1);
    
                // Edit the new text box
                var newInput = document.createElement('input');
                newInput.type = 'text';
                newInput.id = 'Q' + this.state.count + 'desc';
                newInput.placeholder="Question"
                var newInput2 = document.createElement('input');
                newInput2.type = 'text';
                newInput2.id = 'Q' + this.state.count  + 'hint1';
                newInput2.placeholder="Hint One"
                var newInput3 = document.createElement('input');
                newInput3.type = 'text';
                newInput3.id = 'Q' + this.state.count  + 'hint2';
                newInput3.placeholder="Hint One"
    
                // Good practice to do error checking
                if (newInput && newP)   
                {
                    // Add the new elements to the form
                    question.appendChild(newP);
                    question.appendChild(newInput);
                    question.appendChild(newInput2);
                    question.appendChild(newInput3);
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
    printQuestion(){
    	var i;
    	for(i = 0; i < this.state.count; i++){
    		window.alert(
    		    document.getElementById("Q" + i + "desc").value + " , " +
    		    document.getElementById("Q" + i + "hint1").value + " , " +
    		    document.getElementById("Q" + i + "hint2").value
    		    );
    	}
        
    }

    render() {
        return (
            <div>
                <div id = 'header'>
                    <header>Edit Hunt (Looks like Create Hunt Page for know until database is in place)</header>
                </div>
                <div id='intro'>
                    <div id='edit'>
                        <form id='edit-form'>
                            <FormGroup>
                                <InputGroup>
                                    <input id='edit-item' type="text" placeholder="Game Name" />
                                    <input id='edit-item' type="text" placeholder="Start Date" />
                                    <input id='edit-item' type="text" placeholder="End Date" />
                                    <input id='edit-item' type="text" placeholder="Image URL" />
                                    <input id='edit-item' type="text" placeholder="Description" />
                                    <input id='edit-item' type="text" placeholder="Hunt Type" />
                                    <div id="questionEdit" action="" method="POST">
                                        <input type="button" value="Add question" onClick={() => this.addQuestion()}/>
                                        <div></div>
                                    </div>
                                    <input type="button" value="Temp Print question(Checks to make sure values are being passed)" onClick={() => this.printQuestion()}/>
                                    <ButtonToolbar>
                                        <Button id='edit-item'>Save</Button>
                                        <Button onClick={() => this.props.changePage('adminHunts')}>Cancel</Button>
                                    </ButtonToolbar>
                                </InputGroup>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
         
        );
    }
}
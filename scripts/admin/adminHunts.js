import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from '../Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export class AdminHunts extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            'getHunts': [],
            'getQuestions': []
        };
        this.pageName = 'adminHunts';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.showQuestions = this.showQuestions.bind(this);
        this.updateHunts = this.updateHunts.bind(this);
        this.deleteHunt = this.deleteHunt.bind(this);
        
        this.updateQuestion = this.updateQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        
        
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    
    componentDidMount(){
        Socket.on('getHunts', (data) => {
            this.setState({
                'getHunts': data['getHunts']
            });
        });
        
    }
    showQuestions(index){
        
        Socket.emit('questionsCall', {'index':index+1});
        
        
        Socket.on('getQuestions', (data) => {
            this.setState({
                'getQuestions': data['getQuestions']
            });
        });
        
        
    }
    
    updateHunts(index){
        console.log(index);
        // put alert
        
        Socket.emit('updateHunts', {index});
    }
    
    deleteHunt(index){
        console.log(index);
        // put alert
        Socket.emit('deleteHunt', {index});
    }
    
    updateQuestion(index,questionToUpdate,answer,image,hint_A,hint_B,answer_text,hunts_id){
    
        var question = prompt('question',questionToUpdate);
        var answer = prompt('answer',answer);
        var image = prompt('image',image);
        var hint_A = prompt('hint_A',hint_A);
        var hint_B = prompt('hint_B',hint_B);
        var answer_text = prompt('answer_text',answer_text);

        if (question != null && question != "" && answer != null && answer != "" && hint_A != null && hint_A != "") {
            alert(question,answer,image,hint_A,hint_B,answer_text,hunts_id);
            Socket.emit('updateQuestion', {index,questionToUpdate,question,answer,image,hint_A,hint_B,answer_text,hunts_id});
        }
        else{
            alert('not updated no blank entries for question, answer, or hint_A');
        }
       
      
        
    }
    deleteQuestion(question){
        
        console.log(question);
        Socket.emit('deleteQuestion', {question});
    }

    
    render() {
        var hunts = '';
        var questions = '';
        
        if (this.state.getHunts != null) {
            hunts = this.state.getHunts.map(
                (n, index) =>
                <tr key={0}>
                <td>Name</td>
                <td>Hunt type</td>
                <td>Description</td>
                <td>Image</td>
                <td>Start time</td>
                <td>End time </td>
                <td>Start text</td>
                <td>Show Questions</td>
                <td>Update Hunts </td>
                <td>Delete Questions Before Hunts </td>
                </tr>
             );
            
            hunts.push(this.state.getHunts.map(
                (n, index) =>
                <tr key={index}>
                <td>{n.name}</td>
                <td>{n.h_type}</td>
                <td>{n.desc}</td>
                <td>{n.image}</td>
                <td>{n.start_time}</td>
                <td>{n.end_time}</td>
                <td>{n.start_text}</td>
                <td><Button onClick={() => this.showQuestions( index)}>Questions</Button></td>
                <td><Button onClick={() => this.props.changePage('adminEditHunt')}>Update</Button></td>
                <td><Button onClick={() => this.deleteHunt(index, n.name)}>Delete</Button></td>
                </tr>
             ));
        }
        // console.log(this.state.getQuestions );
        
        if (this.state.getQuestions != null) {
            questions = this.state.getQuestions.map(
                (n, index) =>
                <tr key={0}>
                <td>Question</td>
                <td>Answer</td>
                <td>Image</td>
                <td>Hint 1</td>
                <td>Hint 2</td>
                <td>Answer Text</td>
                <td>Hunts Id</td>
                <td>Update Questions</td>
                <td>Delete Questions</td>
                </tr>
             );
            
            questions.push(this.state.getQuestions.map(
                (n, index) =>
                <tr key={index}>
                <td>{n.question}</td>
                <td>{n.answer}</td>
                <td>{n.image}</td>
                <td>{n.hint_A}</td>
                <td>{n.hint_B}</td>
                <td>{n.answer_text}</td>
                <td>{n.hunts_id}</td>
                <td><Button onClick={() => this.updateQuestion(index,
                                                               n.question,
                                                               n.answer,
                                                               n.image,
                                                               n.hint_A,
                                                               n.hint_B,
                                                               n.answer_text,
                                                               n.hunts_id,
                                                               )}>Update</Button></td>
                <td><Button onClick={() => this.deleteQuestion(n.question)}>Delete</Button></td>
                </tr>
             ));
        }
        
        return (
            <div>
                <div id = 'header'>
                    <header>Hunts</header>
                </div>
                <div id='intro'>
                    
                </div>
                <div id="userList">
                    <table id="admin-table2">
                        <tbody>
                            {hunts}
                        </tbody>

                    </table>
                    
                </div>
                
                <div className='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <Button onClick={() => this.props.changePage('adminCreateHunt')}>Create Hunt</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
                
                <div id="userList">
                    <table id="admin-table2">
                        <tbody>
                            {questions}
                        </tbody>
                    </table>
                </div>
            </div>
         
        );
    }
}
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
        var name =this.state.getHunts[index].name;
        if(confirm("Would you like to make the following changes to the " + name + " hunt ?\n\n" + 
        "Name: " + document.getElementById("Hname").value +
        "\nType: " + document.getElementById("Htype").value + 
        "\nImage: " + document.getElementById("Himage").value + 
        "\nDescription: " + document.getElementById("Hdesc").value+
        "\nStart Time: " + document.getElementById("Hstart_time").value + 
        "\nEnd Time: " + document.getElementById("Hend_time").value + 
        "\nStart Text: " + document.getElementById("Hstart_text").value
        )){
            console.log("Yes");
            var data = {
            'id': this.state.getHunts[index].id,
            'name': document.getElementById("Hname").value,
            'type': document.getElementById("Htype").value,
            'image': document.getElementById("Himage").value, 
            'desc': document.getElementById("Hdesc").value,
            'start_time': document.getElementById("Hstart_time").value,
            'end_time': document.getElementById("Hend_time").value,
            'start_text': document.getElementById("Hstart_text").value
            };
            console.log(data);
            Socket.emit('updateHunt', data);
        }
        else{
            document.getElementById("Hname").value = this.state.getHunts[index].name;
            document.getElementById("Htype").value = this.state.getHunts[index].h_type;
            document.getElementById("Himage").value = this.state.getHunts[index].image;
            document.getElementById("Hdesc").value = this.state.getHunts[index].desc;
            document.getElementById("Hstart_time").value = this.state.getHunts[index].start_time;
            document.getElementById("Hend_time").value = this.state.getHunts[index].end_time;
            document.getElementById("Hstart_text").value = this.state.getHunts[index].start_text;
        }
    }
    
    deleteHunt(hunts_id){
        // console.log(index);
        // put alert
        
        hunts_id++;
        if(confirm("Will delete all Participants and Questions in hunt " + (hunts_id+1) +"!\n\n" ))
        {
            Socket.emit('deleteHunt', {hunts_id});
        }
    }
    
    updateQuestion(index){
       var questionToUpdate = this.state.getQuestions[index].question;
       if(confirm("Would you like to make the following changes to question " + (index+1) +"?\n\n" + 
        "Question: " + document.getElementById("qQuestion").value +
        "\nAnswer: " + document.getElementById("qAnswer").value + 
        "\nImage: " + document.getElementById("qImage").value + 
        "\nHint A: " + document.getElementById("qHint_A").value + 
        "\nHint B: " + document.getElementById("qHint_B").value + 
        "\nAnswer_text: " + document.getElementById("qAnswer_text").value + 
        "\nHunt Id: " + document.getElementById("qHunts_id").value
        )){
            console.log("Yes");
            var data = {
            'questionTU': this.state.getQuestions[index].question,
            'question': document.getElementById("qQuestion").value,
            'answer': document.getElementById("qAnswer").value,
            'image': document.getElementById("qImage").value, 
            'hint_A': document.getElementById("qHint_A").value,
            'hint_B': document.getElementById("qHint_B").value,
            'answer_text': document.getElementById("qAnswer_text").value,
            'hunts_id': document.getElementById("qHunts_id").value
            };
            console.log(data);
            Socket.emit('updateQuestion', data);
        }
        else{
            document.getElementById("qQuestion").value = this.state.getQuestions[index].question;
            document.getElementById("qAnswer").value = this.state.getQuestions[index].answer;
            document.getElementById("qImage").value = this.state.getQuestions[index].image;
            document.getElementById("qHint_A").value = this.state.getQuestions[index].hint_A;
            document.getElementById("qHint_B").value = this.state.getQuestions[index].hint_B;
            document.getElementById("qAnswer_text").value = this.state.getQuestions[index].answer_text;
            document.getElementById("qHunts_id").value = this.state.getQuestions[index].hunts_id;
            
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
                <td><b>Name</b></td>
                <td><b>Hunt Type</b></td>
                <td><b>Description</b></td>
                <td><b>Image</b></td>
                <td><b>Start time</b></td>
                <td><b>End time</b> </td>
                <td><b>Start text</b></td>
                <td><b>Show Questions</b></td>
                <td><b>Update Hunts</b> </td>
                <td><b>Delete Questions Before Hunts</b> </td>
                </tr>
             );
            
            hunts.push(this.state.getHunts.map(
                (n, index) =>
                <tr key={index}>
                <td><textarea id="Hname" cols='10'>{n.name}</textarea></td>
                <td><textarea id="Htype" cols='5' rows='1'>{n.h_type}</textarea></td>
                <td><textarea id="Hdesc" cols='15'>{n.desc}</textarea></td>
                <td><textarea id="Himage" cols='15'>{n.image}</textarea></td>
                <td><textarea id="Hstart_time" cols='17' rows='1'>{n.start_time}</textarea></td>
                <td><textarea id="Hend_time" cols='17' rows='1'>{n.end_time}</textarea></td>
                <td><textarea id="Hstart_text" cols='15'>{n.start_text}</textarea></td>
                <td><Button onClick={() => this.showQuestions(index)}>Questions</Button></td>
                <td><Button onClick={() => this.updateHunts(index)}>Update</Button></td>
                <td><Button onClick={() => this.deleteHunt(index)}>Delete</Button></td>
                </tr>
             ));
        }
        // console.log(this.state.getQuestions );
        
        if (this.state.getQuestions != null) {
            questions = this.state.getQuestions.map(
                (n, index) =>
                <tr key={0}>
                <td><b>Question</b></td>
                <td><b>Answer</b></td>
                <td><b>Image</b></td>
                <td><b>Hint 1</b></td>
                <td><b>Hint 2</b></td>
                <td><b>Answer Text</b></td>
                <td><b>Hunts Id</b></td>
                <td><b>Update Questions</b></td>
                <td><b>Delete Questions</b></td>
                </tr>
             );
            
            questions.push(this.state.getQuestions.map(
                (n, index) =>
                <tr key={n.id}>
                <td><textarea id="qQuestion" cols='15'>{n.question}</textarea></td>
                <td><textarea id="qAnswer" cols='15'>{n.answer}</textarea></td>
                <td><textarea id="qImage" cols='3'>{n.image}</textarea></td>
                <td><textarea id="qHint_A" cols='10'>{n.hint_A}</textarea></td>
                <td><textarea id="qHint_B" cols='10'>{n.hint_B}</textarea></td>
                <td><textarea id="qAnswer_text" cols='8'>{n.answer_text}</textarea></td>
                <td><input id = "qHunts_id" type="text" value = {n.hunts_id} size="1"/></td>
                <td><Button onClick={() => this.updateQuestion(index)}>Update</Button></td>
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
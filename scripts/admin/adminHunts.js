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
            'getHunts': []
        };
        this.pageName = 'adminHunts';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.showQuestions = this.showQuestions.bind(this);
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
    showQuestions(name){
        console.log(name);
    }
    
    render() {
        var hunts = '';

        // console.log(this.state.getAdmin);
        if (this.state.getHunts != null) {
            hunts = this.state.getHunts.map(
                (n, index) =>
                <tr key={0}>
                <td>Name</td><td>Hunt type</td><td>Description</td><td>Image</td><td>Start time</td><td>End time </td><td>Start text</td><td>Delete questions before hunts </td>
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
                <td><Button onClick={() => this.showQuestions( n.name)}>Questions</Button></td>
                <td><Button onClick={() => this.deleteAdmin(index, n.name)}>Delete</Button></td>
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
                                    <Button onClick={() => this.props.changePage('adminEditHunt')}>Edit</Button>
                                    <Button onClick={() => this.props.changePage('adminCreateHunt')}>Create</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
            </div>
         
        );
    }
}
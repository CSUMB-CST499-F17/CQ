import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { LogoSmall } from './logo-small';

export class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'userlist': []
        };

        this.changePage = this.changePage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        Socket.on('users', (data) => {
            this.setState({
                'userlist': data['userlist']
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('leaderboard').style.display = "none";
        Socket.emit(page);
        document.getElementById(page).style.display = "block";
    }
    
    

    render() {
        let userlist = '';
        if (this.state.userlist != null) { 
            userlist = this.state.userlist.map((n, index) => 
                <li key={index}>
                    {n.name} : {n.picture}
                </li>
             );
        }
        
        return (
            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id = 'header'>
                    <header>Leaderboard</header>
                </div>
                <div id='intro'>
                    <div id='leaderboard-form'>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                        <FormControl id="leaderboard-item1" className='leaderboard-item' placeholder="Search Hunts" />
                                        <Button id="leaderboard-item2" className='leaderboard-item'>Search</Button>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </div>
                    <div>
                        <div id='leaderboards'>
                            <ul>{userlist}</ul>
                        </div>
                        
                    </div>
                </div>
                <div id='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <Button onClick={() => this.changePage('home')}>Home</Button>
                    </form>
                </div>
            </div>

        );
    }
}

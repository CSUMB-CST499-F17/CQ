import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from '../Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';


export class Admins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'getAdmin': []
        };
        this.pageName = 'admins';
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        
    }
    componentDidMount(){
        Socket.on('getAdmin', (data) => {
            this.setState({
                'getAdmin': data['getAdmin']
            });
        });
    }
    render() {
        var admins = '';
        console.log(this.state.getAdmin);
        if (this.state.getAdmin != null) {
            admins = this.state.getAdmin.map(
                (n, index) =><tr key={index}><td>{n.email}</td><td>{n.username}</td><td>{n.password}</td></tr>
             );
        }
        
        return (
            <div>
                <div id = 'header'>
                    <header>Administrators</header>
                </div>
                <div id='intro'>
                    List of Admins and option to edit admins goes here<br/>
                </div>
                <div>
                {admins}
                </div>
                <div className='buttons'>
                    <form onSubmit = {this.handleSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <ButtonToolbar>
                                    <Button onClick={() => this.props.changePage('adminCreate')}>Create New Admin</Button>
                                </ButtonToolbar>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
            </div>

        );
    }
}

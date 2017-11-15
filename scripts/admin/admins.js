import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from '../Socket';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';


export class Admins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'getAdmin': []
        };
        this.pageName = 'admins';
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
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
    deleteAdmin(index, username){
        console.log("pressed");
        var txt;
        if(this.state.getAdmin[index].is_super == true && confirm("Super Admin can't be deleted?") == true){
            txt = "can't delete super admin!";
        }
        if(this.state.getAdmin[index].is_super == false && confirm("Are you sure you would like to delete admin?") == true){
            txt = "deleted admin!";
            Socket.emit('deleteAdminFace', {username});
        }
        else {
            txt = "not deleted!";
        }
        document.getElementById("deleted").innerHTML = txt;
    }



    render() {
        var admins = '';

        // console.log(this.state.getAdmin);
        if (this.state.getAdmin != null) {
            admins = this.state.getAdmin.map(
                (n, index) =>
                <tr key={index}>
                <td>{n.email}</td>
                <td>{n.username}</td>
                <td><Button onClick={() => this.deleteAdmin(index, n.username)}>Delete</Button></td>
                </tr>
             );
        }

        return (
            <div>
                <div id = 'header'>
                    <header>Administrators</header>
                </div>
                <div id='intro'>
                    <p id="deleted"></p><br/>
                </div>
                <div id="userList">
                        <table id="admin-table">
                                    <tbody>
                                        <tr>
                                            <td>Email</td><td>Username</td><td> </td>
                                        </tr>
                                    </tbody>
                                </table>
                        <table id="admin-table2">
                        <tbody>
                            {admins}
                        </tbody>

                    </table>

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

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
        this.updateAdmin = this.updateAdmin.bind(this);
        this.loadAdmins = this.loadAdmins.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

    }
    componentDidMount(){
        // Socket.on('getAdmin', (data) => {
        //     this.setState({
        //         'getAdmin': data['getAdmin']
        //     });
        // });
        Socket.on('callbackUpdateAdmin', (data) => {
            
            Socket.emit('loadAllAdmins', this.props.state.id, Socket.callback = this.loadAdmins);
        });
    }
    deleteAdmin(index, username){
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
    loadAdmins(callback){
        var data = JSON.parse(callback);
        this.setState({
            'getAdmin': data['adminList']
        }); 
    }
    
    updateAdmin(index, usernameToFind, email,is_super){
        var txt;
        var email = prompt('email', email);
        var username = prompt('username', usernameToFind);
        var is_super = prompt('super(T/F)',is_super);
        if(this.state.getAdmin[index].is_super == true && confirm("Super Admin can't be deleted?") == true){
            txt = "can't update super admin you don't have super admin privileges!";
        }
        if(this.state.getAdmin[index].is_super == false && confirm("Are you sure you would like to update your admin profile?") == true){
            Socket.emit('updateAdmin', {index,usernameToFind,username,email,is_super});
        }
        else {
            txt = "not updated!";
        }
    }
    
    render() {
        var admins = '';
        
        if (this.state.getAdmin != null) {
            admins = this.state.getAdmin.map(
                (n, index) =>
                <tr key={index}>
                <td>{n.email}</td>
                <td>{n.username}</td>
                <td>{n.is_super.toString()}</td>
                <td><Button onClick={() => this.updateAdmin(index, n.username,n.email, n.is_super)}>Update</Button></td>
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
                    <table id="admin-table2">
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td>Username</td>
                                <td>Super</td>
                                <td>Update</td>
                                <td>Delete</td>
                            </tr>
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

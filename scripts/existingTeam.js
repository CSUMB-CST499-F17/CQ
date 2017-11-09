import * as React from 'react';
import { Socket } from './Socket';


export class ExistingTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'access':"",
            'team':""
        };
        this.pageName = 'existingTeam';
        this.progress = 0;
        this.user = [];
        
        this.handle = this.handle.bind(this); //handles data recieved from validateCreentials
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.loadGame = this.loadGame.bind(this); //if team name is team or teamLead, this determines what data gets sent to start.js or play.js
        this.validateCredentials = this.validateCredentials.bind(this); //checks team name and password with database in app.py
        
    }
        handle(callback){
        var data = JSON.parse(callback);
        try{
            this.props.setProps('id', data['id']);
            this.props.setProps('name', data['name']);
            this.props.setProps('loggedIn', data['loggedIn']);
            document.getElementById("team_name").value = "";
            document.getElementById("access").value = "";
            document.getElementById("errorMessage").value = "";
            
            switch(data['loggedIn']) {
                case "teamLead":
                case "team":
                    this.props.changePage('play');
                    break;
                case "superAdmin":
                case "admin":
                    this.props.changePage('adminHome');
                    break;
                case "no":
                    document.getElementById("errorMessage").innerHTML = "⚠ Invalid Team Name or Access Code ⚠";
                    document.getElementById("errorMessage").style.visibility = 'visible';
                    document.getElementById("errorMessage").style.color="#f2e537";
                    document.getElementById("access").value = "";
                    break;
                case "finished": 
                    document.getElementById("errorMessage").innerHTML = "⚠ Scavenger Hunt Completed By This Team ⚠  <br/> ⚠ Please Create New Team or Explore Other Hunts! ⚠" ;
                    document.getElementById("errorMessage").style.visibility = 'visible';
                    document.getElementById("errorMessage").style.color="#f2e537";
                    document.getElementById("access").value = "";
                default:
                        break;
            } 
        }
        catch(err) {
            console.log(err);
        } 
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    validateCredentials(){
        this.setState({
            team: document.getElementById("team_name").value,
            access: document.getElementById("access").value
        });
        if(document.getElementById("team_name").value == "")
        {
            document.getElementById("errorMessage").innerHTML = "⚠ Please Enter valid Team Name and Access Code ⚠";
            document.getElementById("errorMessage").style.visibility = 'visible';
            document.getElementById("errorMessage").style.color="#f2e537";
        }
        else
        {
            document.getElementById("errorMessage").style.visibility = 'hidden';
            Socket.emit('validateCredentials',{'team_name':document.getElementById("team_name").value,'access':document.getElementById("access").value}, Socket.callback=this.handle);
        }
    }
    
    render() {
        return (
            <div>
                <div id='login'>
                    <input type="text" id = "team_name" placeholder="Team Name" />
                    <input type="password" id = "access" placeholder="Access Code" />
                    <div id = "errorMessage" style={{visibility:'hidden'}}> Error Message Placeholder</div>
                    <div className='buttons'>
                        <button className="btn" onClick={this.validateCredentials}>Enter!</button>
                        <button className="btn" onClick={this.props.cancel}>Cancel</button>
                    </div>
                </div>
            </div>

        );
    }
}
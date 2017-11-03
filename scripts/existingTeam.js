import * as React from 'react';
import { Socket } from './Socket';


export class ExistingTeam extends React.Component {
    constructor(props) {
        super(props);
        this.team = "";
        this.progress = 0;
        this.pageName = 'existingTeam';
        
        this.handle = this.handle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
        
        //retireves the user information
        Socket.on('user', (data) => {
                this.progress = data[0]['progress'];
        });
        
    }
    handle(callback){
        var res = callback.split('%');
            try{
                this.props.setProps(res[0], res[1]); //loggedIn, name
                document.getElementById("team_name").value = "";
                document.getElementById("access").value = "";
                switch(res[0]) {
                    case "teamLead":
                    case "team":
                        if(this.progress == 0){
                            this.props.changePage('start');
                        }
                        else{
                            this.props.changePage('play');
                        }
                        
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
                        document.getElementById("errorMessage").innerHTML = "⚠ Scavenger Hunt Completed By This Team ⚠" +  <br/> +  " ⚠ Please Create New Team and Explore Other Hunts!⚠"
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
        this.team = document.getElementById("team_name").value;
        var access = document.getElementById("access").value;
        if(this.team == "")
        {
            document.getElementById("errorMessage").innerHTML = "⚠ Please Enter valid Team Name and Access Code ⚠";
            document.getElementById("errorMessage").style.visibility = 'visible';
            document.getElementById("errorMessage").style.color="#f2e537";
        }
        else
        {
            document.getElementById("errorMessage").style.visibility = 'hidden';
            Socket.emit('validateCredentials',{'team_name':this.team,'access':access}, Socket.callback=this.handle);
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
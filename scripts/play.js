import * as React from 'react';
import { Socket } from './Socket';
import { FormControl } from 'react-bootstrap';
import { LogoSmall } from './logo-small';

import { Complete } from './complete';
import { Start } from './start';
import { PlayGame } from './playGame';

export class Play extends React.Component {
    constructor(props) {
        super(props);
        //default values for state variables
        this.state = { 
            hunt: {'id':0, 'name': "", 'image':"", 'start_text':""},
            questions: [{'question':"", 'answer':"",'hint1':"",'hint2':"",'hunts_id':0}],
            user: {'id':0, 'email': "", 'team_name':"", 'hunts_id':0, 'progress':1, 'score':0, 'attempts':5, 'start_time': null, 'end_time':null}
        
        };
        
        this.hide = 'none'; //variable that determines which page (start, playGame, complete) is displayed
        this.changePlay = this.changePlay.bind(this); //changes the value of pages visibility
        this.loadHunts = this.loadHunts.bind(this); //retrieves hunt and question data from database via Socket to app.py
        this.loadUser = this.loadUser.bind(this); //retrieves user data from database via Socket to app.py
        this.setPlay = this.setPlay.bind(this); //sets this.state.user 
        this.setUser = this.setUser.bind(this); //sets this.state.user with a callback function
        this.updatePlay = this.updatePlay.bind(this); //sets visibility of page based on user progress
    }

    componentDidMount(){
        Socket.on('updatePlay', (data) => { 
            Socket.emit('loadUser', this.props.state.id, Socket.callback=this.loadUser);
        });
    }
    //changes the value of pages visibility
    changePlay(current, next){
        Socket.emit(next, this.state);
        document.getElementById(next).style.display = 'block';
        document.getElementById(current).style.display = 'none';
    }
    //retrieves hunt and question data from database via Socket to app.py
    loadHunts(data){
        data = JSON.parse(data);
        this.setState({
            hunt: data['hunt'][0],
            questions: data['questions']
        });
        this.updatePlay();
    }
    //retrieves user data from database via Socket to app.py
    loadUser(data){
        data = JSON.parse(data);
        this.setState({
            user: data[0]
        });
        Socket.emit('loadHunts', this.state.user.hunts_id, Socket.callback=this.loadHunts);
    }
    //sets this.state.user 
    setPlay(value){
        this.setState({
            user: value
        }); 
    }
    //sets this.state.user with a callback function
    setUser(value,fx){
        this.setState({
            user: value
        },fx); 
    }
    //sets visibility of page based on user progress
    updatePlay(){
        if(this.state.user.progress == 0){
            document.getElementById('complete').style.display = 'none';
            document.getElementById('playGame').style.display = 'none';
            document.getElementById('start').style.display = 'block';
        }
        else if(this.state.user.progress > 0){
            document.getElementById('start').style.display = 'none';
            document.getElementById('complete').style.display = 'none';
            document.getElementById('playGame').style.display = 'block';
        }
        else if(this.state.user.progress == -1){
            document.getElementById('playGame').style.display = 'none';
            this.changePlay('start', 'complete');
        }
    }
    
    render() {
        return (
            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id = 'start' style={{display:this.hide}}>
                    <Start changePage={this.props.changePage} hide={this.props.state.hide} changePlay={this.changePlay} setPlay={this.setPlay} setUser={this.setUser} state={this.state}/>
                </div>
                <div id = 'playGame' style={{display:this.hide}}>
                    <PlayGame changePage={this.props.changePage} hide={this.props.state.hide} changePlay={this.changePlay} setPlay={this.setPlay} setUser={this.setUser} state={this.state} logOutSetProps={this.props.logOutSetProps}/>
                </div>
                <div id = 'complete' style={{display:this.hide}}>
                    <Complete changePage={this.props.changePage} hide={this.props.state.hide} setPlay={this.setPlay} setUser={this.setUser} state={this.state} setProps={this.props.setProps} logOutSetProps={this.props.logOutSetProps}/>
                </div>
            </div>
        );
    }
}
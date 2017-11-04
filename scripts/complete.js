import * as React from 'react';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';

import { LogoSmall } from './logo-small';

export class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'user': [],
            'score':-1,
            'time':""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //retireves the hunt question information
        Socket.on('user', (data) => {
            this.setState({
                'user': data[0]['team_name'], 
                'score':data[0]['score'] + data[0]['time'],
                'time':data[0]['elapsed']
            });
            try{
                Socket.emit('progessUpdate', {'user': this.state.user, 'progress':-1, 'score':this.state.score, 'attempts': 5});    
            }
            catch(err){
                console.log(err);
            }
            if(this.state.score > -1){
                document.getElementById('title').innerHTML = "<b>Final Results for " + data[0]['hunt_name'] + "</b>";
                document.getElementById('time').innerHTML = "<b>Time taken to complete Hunt:</b><br/> " + this.state.time;
                document.getElementById('team').innerHTML = "<b>Team Name:</b><br/> " + this.state.user;
                document.getElementById('score').innerHTML = "<b>Final Score:</b><br/> " + this.state.score;
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {

        return (
            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id = 'header'>
                    <header>Finished</header>
                </div>
                    <div id='intro'>
                        <h1 id= "title" ></h1>
                        <div id = 'results'>
                            <h2 id = 'team'></h2>
                            <h2 id = 'time'></h2>
                            <h2 id = 'score'></h2>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="btn" onClick={() => this.props.changePage('leaderboard')}>Leaderboard</button>
                        <button className="btn" onClick={() => this.props.logOutSetProps()}>Logout</button>
                    </div>  
            </div>

        );
    }
}

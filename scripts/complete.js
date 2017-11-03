import * as React from 'react';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';

import { LogoSmall } from './logo-small';

export class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'user': [],
            'score':-1
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //retireves the hunt question information
        Socket.on('user', (data) => {
            this.setState({
                'user': data[0]['team_name'], 
                'score':data[0]['score'] + data[0]['time']
            });
            try{
            Socket.emit('progessUpdate', {'user': this.state.user, 'progress':-1, 'score':this.state.score, 'attempts': 5});    
            }
            catch(err){
                console.log(err);
            }
            console.log(this.state.score);
            if(this.state.score > -1){
                document.getElementById('team').innerHTML = this.state.user;
                document.getElementById('score').innerHTML = this.state.score;
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
                        <div id = 'results'>
                            <div id = 'team'></div>
                            <div id = 'score'></div>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="btn" onClick={() => this.props.changePage('leaderboard')}>Leaderboard</button>
                        <button className="btn" onClick={() => this.props.changePage('home')}>Home</button>
                    </div>  
            </div>

        );
    }
}

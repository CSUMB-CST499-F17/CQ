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
        console.log(this.state.score);
        Socket.on('user', (data) => {
            this.setState({
                'user': data['user'], 
                'score':data['score']
            });
            console.log(this.state.score);
            if(this.state.score > -1){
                document.getElementById('team_name').innerHTML = this.state.user['team_name'];
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
                            <div id = 'team_name'></div>
                            <div id = 'score'></div>
                        </div>
                        <div id='buttons'>
                            <Button onClick={() => this.props.changePage('leaderboard')}>Leaderboard</Button>
                            <Button onClick={() => this.props.changePage('home')}>Home</Button>
                        </div>      
                    </div>
            </div>

        );
    }
}

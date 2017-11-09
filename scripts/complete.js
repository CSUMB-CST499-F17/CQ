import * as React from 'react';
import { Socket } from './Socket';

import { LogoSmall } from './logo-small';

export class Complete extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        
        let title = this.props.state.hunt.name;
        let time = this.props.state.user.elapsed;
        console.log(time);
        let team = this.props.state.user.team_name;
        let score = this.props.state.user.score;
        
        return (
            <div>
                <div id = 'header'>
                    <header>Finished</header>
                </div>
                    <div id='intro'>
                        <h1 id= "title" ><b>Final Results for {title}</b></h1>
                        <div id = 'results'>
                            <h2 id = 'team'><span><b>Team Name: </b><br/> {team}</span></h2>
                            <h2 id = 'time'><span><b>Time Taken To Complete Hunt: </b><br/>{time}</span></h2>
                            <h2 id = 'score'><span><b>Final Score:</b><br/>{score}</span></h2>
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

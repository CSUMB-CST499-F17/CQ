import * as React from 'react';
import { Socket } from './Socket';

import { LogoSmall } from './logo-small';

export class Complete extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        let title = this.props.state.hunt.name;
        let time = this.props.state.user.elapsed;
        let team = this.props.state.user.team_name;
        let score = this.props.state.user.score;
        let results = <div id = 'results'></div>;
        if(this.props.state.questions.length == 0){
            results = <div id = 'results'><h2 id = 'err'><span><b>There are no questions in this hunt.</b></span></h2></div>;
        }
        else{
            results = <div id = 'results'>
                                <h2 id = 'team'><span><b>Team Name: </b><br/> {team}</span></h2>
                                <h2 id = 'time'><span><b>Time Taken To Complete Hunt: </b><br/>{time}</span></h2>
                                <h2 id = 'score'><span><b>Final Score:</b><br/>{score}</span></h2>
                            </div>;
        }
        return (
            <div>
                <div id = 'header'>
                    <header>Finished</header>
                </div>
                    <div id='intro'>
                        <h1 id= "title" ><b>Final Results for {title}</b></h1>
                        {results}
                    </div>
                    <div className='buttons'>
                        <button className="btn" onClick={() => this.props.changePage('leaderboard')}>Leaderboard</button>
                        <button className="btn" onClick={() => this.props.logOutSetProps()}>Logout</button>
                    </div>  
            </div>

        );
    }
}

import * as React from 'react';

//This class renders the final page of the game
export class Complete extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.lb = this.lb.bind(this); //sends users to the leaderboard
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    lb(){
        this.props.setProps('select',this.props.state.user.hunts_id);
        this.props.changePage('leaderboard');
    }
    render() {
        let title = this.props.state.hunt.name;
        let team = this.props.state.user.team_name;
        let score = this.props.state.user.score;
        let results = <div id = 'results'></div>;
        
        
        if(this.props.state.questions.length == 0){
            results = <div id = 'results'><h2 id = 'err'><span><b>There are no questions in this hunt.</b></span></h2></div>;
        }
        else{
            var start = new Date(this.props.state.user.start_time);
            var end = new Date(this.props.state.user.end_time);
            var time = (end-start) /1000;  // second/minutes/hours
            // calculate (and subtract) whole days
            var days = Math.floor(time / 86400);
            time -= days * 86400;
            // calculate (and subtract) whole hours
            var hours = Math.floor(time / 3600) % 24;
            time -= hours * 3600;
            // calculate (and subtract) whole minutes
            var minutes = Math.floor(time / 60) % 60;
            time -= minutes * 60;
            // what's left is seconds
            var seconds = time % 60;
            results = <div id = 'results'>
                                <h2 id = 'team'><span><b>Team Name: </b><br/> {team}</span></h2>
                                <h2 id = 'time'><span><b>Time Taken To Complete Hunt: </b><br/>
                                {days != 0 ? <span>{days} day(s), <br/></span> : <div/>}
                                {hours != 0 ? <span>{hours} hour(s), <br/></span> : <div/>}
                                {minutes != 0 ? <span>{minutes} minute(s), <br/></span> : <div/>}
                                {seconds != 0 ? <span>{seconds} second(s)<br/></span> : <div/>}
                                </span></h2>
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
                        <button className="btn" onClick={() => this.lb()}>Leaderboard</button>
                        <button className="btn" onClick={() => this.props.logOutSetProps()}>Logout</button>
                    </div>  
            </div>

        );
    }
}

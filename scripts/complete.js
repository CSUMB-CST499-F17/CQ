import * as React from 'react';
import { Socket } from './Socket';


//This class renders the final page of the game
export class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 'x'
        };

        this.lb = this.lb.bind(this); //sends users to the leaderboard
        this.setTime = this.setTime.bind(this);
    }
    
    componentDidMount(){
        Socket.on('updateComplete', (data) => { 
            Socket.emit('getTime', this.props.state.user.id, Socket.callback=this.setTime);
        });
    }
    
    setTime(data){
        console.log(this.state.time);
        if(this.state.time == 'x'){
            this.setState({
                time: data
            });
        }
        console.log(this.state.time);
    }
    
    //sends users to the leaderboard
    lb(){
        this.props.setProps('select',this.props.state.user.hunts_id);
        this.props.changePage('leaderboard');
    }
    
    render() {
        let title = this.props.state.hunt.name;
        let team = this.props.state.user.team_name;
        let score = this.props.state.user.score;
        let results = <div id = 'results'></div>;
        
        //error message if hunt is empty
        if(this.props.state.questions.length == 0){
            results = <div id = 'results'><h2 id = 'err'><span><b>There are no questions in this hunt.</b></span></h2></div>;
        }
        else{
            //calculates total time taken
            var time = this.state.time.substring().split(':');
            
            // whole days
            var days = time[0];
            // whole hours
            var hours = time[1];
            //  whole minutes
            var minutes = time[2];
            //  seconds
            var seconds = time[3];
            results =  <div id = 'results'>
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

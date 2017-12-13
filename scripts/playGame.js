import * as React from 'react';
import { Socket } from './Socket';
import { FormControl } from 'react-bootstrap';

export class PlayGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'attempts':[], //array of incorrect attempts
        };
        this.hide = 'none'; //hides hint button by default
        this.checkAnswer = this.checkAnswer.bind(this); //checks user input to answer data //displays buttons and text accordingly
        this.completed = this.completed.bind(this); //updates user at the end of the game
        this.done0 = this.done0.bind(this); //calls emit0
        this.done1 = this.done1.bind(this); //calls emit1
        this.emit0 = this.emit0.bind(this); //updates user on current progress
        this.emit1 = this.emit1.bind(this); //updates user on current progress + 1
        this.end = this.end.bind(this); //changes page to complete page
        this.handleComplete = this.handleComplete.bind(this); //handles completed function data and updates user prop
        this.nextQuestion = this.nextQuestion.bind(this); //handles next Question button
        this.showHint = this.showHint.bind(this); //reveals hint one at a time, reducing total points avaible by 5
        this.skip = this.skip.bind(this); //skips current question, reducing total score by total points alloted by current question
        this.skipComplete = this.skipComplete.bind(this); //handles skip on last question
    }
    
    //checks user input to answer data //displays buttons and text accordingly
    checkAnswer(){
        console.log(this.props.state.user.progress);
        console.log(this.props.state.questions.length);
        var result = document.getElementById('result'); //retreives user input
        //checks if user input matches answer
        if(document.getElementById('answer').value.toLowerCase() == this.props.state.questions[this.props.state.user.progress - 1]['answer'].toLowerCase()){
            result.style.display = 'block'; //shows result
            result.textContent = 'Correct'; //displays correct message
            result.style.color="#9bf442"; //changes message to color green
            
            //checks if next question is last question //changes Next Question button content to Last Question
            if(this.props.state.user.progress == this.props.state.questions.length - 1){
                document.getElementById('next').textContent = "Last Question"; //shows buttons
                document.getElementById('next').style.display = "block"; //shows next button
            }
            //checks if current question is last question //changes Last Question button content to Complete
            if(this.props.state.user.progress == this.props.state.questions.length){
                document.getElementById('complete-button').style.display = "block"; //shows complete button
            }
            //checks if next question is less than the total amount of questions - 1
            if(this.props.state.user.progress < this.props.state.questions.length - 2){
                document.getElementById('next').style.display = "block"; //shows next button
            }
            document.getElementById('answer-submit').style.display = "none"; //hides answer input
            document.getElementById('skip').style.display = "none"; //hides skip button
            
            //resets attempts to empty array
            this.setState({
                'attempts': []
            }, this.emit1);
        }
        else{ //user input does not match answer
            //checks that input is not empty
            if(document.getElementById('answer').value != ""){
                //adds incorrect answer to attempts array
                var newArray = this.state.attempts.slice();    
                newArray.push(" " + document.getElementById('answer').value);   
                this.setState({
                    'attempts':newArray
                });
                result.style.display = 'block'; //displays incorrect message as well as attemots array
                result.innerHTML = 'Incorrect <br/> Attempts: ' + newArray;
                result.style.color="red"; //changes color of result message to red
                
                document.getElementById('answer').value = ""; //resets answer input to blank string
                document.getElementById('skip').style.display = "block"; //shows skip button
                //checks if user has more than zero attempts left
                if(this.props.state.user.attempts > 0 && this.props.state.user.score > 0){
                    var userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'hints':this.props.state.user.hints,'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - 5), 'attempts':(this.props.state.user.attempts - 1), 'progress':this.props.state.user.progress};
                    this.props.setUser(userData, this.done0); //updates user
                }
            }
        }
    }
    //updates user at the end of the game
    completed(){
        try{
            Socket.emit('updateTime', {'user': this.props.state.user, 'start_time': "", 'end_time':'now'});
            Socket.emit('update', {'user': this.props.state.user, 'progress':-1, 'score':this.props.state.user.score, 'attempts': 5, 'hints':0}, Socket.callback=this.handleComplete);    
        }
        catch(err){
            console.log(err);
        }
    }
    //calls emit0
    done0(){
        this.emit0();
    }
    //calls emit1
    done1(){
        this.emit1();
    }
    //updates user on current progress
    emit0(){
        try{
            Socket.emit('update', {'user': this.props.state.user, 'progress':this.props.state.user.progress, 'score':this.props.state.user.score, 'attempts': this.props.state.user.attempts, 'hints': this.props.state.user.hints});
        }
        catch(err){
            console.log(err);
        }
    }
    //updates user on current progress + 1
    emit1(){
        try{
            Socket.emit('update', {'user': this.props.state.user, 'progress':(this.props.state.user.progress + 1), 'score':this.props.state.user.score, 'attempts': 5, 'hints':0});
        }
        catch(err){
            console.log(err);
        }
    }
    //changes page to complete page
    end(){
        this.props.changePlay('playGame', 'complete');
    }
    //handles completed function data and updates user prop
    handleComplete(callback){
        var data = JSON.parse(callback);
        this.props.setUser(data['user'], this.end);
    }
    //handles next Question button
    nextQuestion(){
        //on progression to next question:
        document.getElementById('hint1').style.display = "none"; //hints hidden
        document.getElementById('hint2').style.display = "none";
        document.getElementById('next').style.display = "none"; //next question button hidden
        document.getElementById('result').style.display = "none"; //result from previous question hidden
        document.getElementById('skip').style.display = "none"; //skip button hidden
        document.getElementById('answer').value = ""; //value of answer input set to blank string
        document.getElementById('answer-submit').style.display = "block"; //displays answer input bar
        
        //update user props
        var userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':this.props.state.user.score, 'attempts':5,'hints':0, 'progress':(this.props.state.user.progress + 1)};
        this.props.setUser(userData,this.done0);
    }
    //reveals hint one at a time, reducing total points avaible by 5
    showHint(){
        var userData ={};
        //checks that hint1 is not blank and is not currently displayed
        if(this.props.state.questions[this.props.state.user.progress - 1]['hint1'] != "" && document.getElementById('hint1').style.display == "none"){
            //checks to see if there is a first hint, if not, the button disappears
            document.getElementById('hint1').style.display = "block";
            //checks that both score and attempt amount is greater than 0
            if(this.props.state.user.attempts > 0 && this.props.state.user.score > 0){
                //updates user props with -1 attempt and -5 score
                userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - 5), 'attempts':(this.props.state.user.attempts - 1), 'hints':(this.props.state.user.hints + 1), 'progress':this.props.state.user.progress};
                this.props.setUser(userData, this.done0); //updates props for current question
            }
            //condition when the button is clicked once
            //hides button once clicked if hint2 is blank string
            if(this.props.state.questions[this.props.state.user.progress - 1]['hint2'] == ""){
                //checks to see if there is a second hint, if not, the button disappears
                document.getElementById('hint-submit').style.display = "none";
            }
        }
        //condition if the button is clicked twice and there is a second hint
        else if(this.props.state.questions[this.props.state.user.progress - 1]['hint2'] != "" && document.getElementById('hint2').style.display == "none"){
            document.getElementById('hint2').style.display = "block"; //displays second hint
            document.getElementById('hint-submit').style.display = "none"; //hides hint button
            //checks that both score and attempt amount is greater than 0
            if(this.props.state.user.attempts > 0 && this.props.state.user.score > 0){
                //updates user props with -1 attempt and -5 score
                userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - 5), 'attempts':(this.props.state.user.attempts - 1), 'hints':(this.props.state.user.hints + 1), 'progress':this.props.state.user.progress};
                this.props.setUser(userData, this.done0);
            }
            
        }
    }
    //handles skip on last question
    skipComplete(){
        this.completed();
    }
    //skips current question, reducing total score by total points alloted by current question
    skip(){
        var userData;
        //checks if user is on last question
        if(this.props.state.user.progress == (this.props.state.questions.length)){
            document.getElementById('skip').style.display = "none"; //hides skip button
            document.getElementById('answer-submit').style.display = "none"; //hides answer input bar
            document.getElementById('complete-button').style.display = "block"; //hides complete button
            //updates user props score
            userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - (this.props.state.user.attempts * 5)), 'attempts':5, 'hints':0, 'progress':this.props.state.user.progress};
            this.props.setUser(userData,this.skipComplete);
        }
        else{ //user is not on the last question
            document.getElementById('hint1').style.display = "none"; //hides hints
            document.getElementById('hint2').style.display = "none";
            document.getElementById('next').style.display = "none"; //hides next button
            document.getElementById('result').style.display = "none"; //hides current question result
            document.getElementById('skip').style.display = "none"; //hides skip button
            document.getElementById('answer').value = ""; //sets value of answer input bar to blank string
            document.getElementById('answer-submit').style.display = "block"; //displays answer input bar
            //sets value of this.state.attempts to empty array
            var emptyArray = [];
            this.setState({
                'attempts':emptyArray
            });
            //updates user prop score and progress
            userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'hints':0, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - (this.props.state.user.attempts * 5)), 'attempts':5, 'progress':(this.props.state.user.progress + 1)};
            this.props.setUser(userData,this.done0);
        }
    }
    
    render() {
        this.hide = 'none';
        //default values
        let index = 0;
        let name = '';
        let question = '';
        let hint1 = '';
        let hint2 = '';
        let points = 0;
        let num = '';
        //updates game if user has played during a previous login
        try{
            index = this.props.state.user.progress - 1;
            name = this.props.state.hunt.name;
            question = this.props.state.questions[index]['question'];
            num = (index + 1) + "/" + this.props.state.questions.length;
            hint1 = this.props.state.questions[index]['hint1'];
            hint2 = this.props.state.questions[index]['hint2'];
            points = this.props.state.user.attempts * 5;
            
            //checks if user has already used a hint on a previous login
            if(this.props.state.questions[index]['hint1'] != "" && this.props.state.user.hints == 0){
                this.hide = 'block'; //shows used hint
                console.log(true);
            }
            else{ //checks if user has already used a hint on a previous login and that user has a second hint to use, displaying hint and hint button
                if(this.props.state.questions[index]['hint1'] != "" && this.props.state.user.hints == 1){
                    document.getElementById('hint1').style.display = "block";
                    if(this.props.state.questions[index]['hint2'] != ""){
                        this.hide = 'block';
                    }
                }
                else{ //checks if user has used max amount of hints and displays all hints for current question
                    if(this.props.state.questions[index]['hint2'] != "" && this.props.state.user.hints == 2){
                        document.getElementById('hint1').style.display = "block";
                        document.getElementById('hint2').style.display = "block";
                    }
                    this.hide = 'none';
                }
            }
        }catch(err){}
        
        return (
            <div>
                <div id = 'header'>
                    <header id="game">{name}</header>
                </div>
                <div id = 'intro'>
                    <div id='play-container'>
                        <div id="background">
                                {num}
                        </div>
                        <div id="play-form">
                            <div id="play-question">{question}</div>
                            <div id='hints' style={{display:this.props.hide}}>
                                <div id='hint1' style={{display:'none'}}>Hint One: {hint1}</div>
                                <div id='hint2' style={{display:'none'}}>Hint Two: {hint2}</div>
                            </div>
                        </div> 
                        <div id="playGameInput"> 
                                <label id="points" style={{display:this.props.hide, color:'#f2e537'}}>Points Avaiable For this Question: {points}</label>
                                <FormControl id = "answer" style={{display:this.props.hide}} componentClass="textarea" onChange={this.handleChange}  placeholder="Answer" />
                                <div id='result'style={{display:'none'}}>Results Placeholder<br/>array</div>
                        </div>
                    </div>
                    <div className='buttons'>
                            <button className="btn" id="next" style={{display:'none'}} onClick={this.nextQuestion} >Next Question</button>
                            <button className="btn" id="complete-button" style={{display:'none'}} onClick={() => this.completed()}>Finish</button> 
                            <button className="btn" id="answer-submit" style={{display:this.props.hide}} onClick={this.checkAnswer} >Submit</button>
                            <button className="btn" id="hint-submit" style={{display:this.hide}} onClick={this.showHint}>Hint</button>
                            <button className="btn" id="skip" style={{display:'none'}} onClick={this.skip} >Skip Question</button>
                            
                    </div>
                    <div className='buttons'>
                        <button className="btn" onClick={() => this.props.logOutSetProps()}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

import * as React from 'react';
import { Socket } from './Socket';
import { FormControl } from 'react-bootstrap';

export class PlayGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'attempts':[],
        };
        this.hide = 'none';
        this.checkAnswer = this.checkAnswer.bind(this);
        this.completed = this.completed.bind(this);
        this.emit0 = this.emit0.bind(this);
        this.emit1 = this.emit1.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.skip = this.skip.bind(this);
        this.showHint = this.showHint.bind(this);
        this.done0 = this.done0.bind(this);
        this.done1 = this.done1.bind(this);
        this.skipComplete = this.skipComplete.bind(this);
        this.end = this.end.bind(this);
    }
    
    checkAnswer(){
        var result = document.getElementById('result');
        if(document.getElementById('answer').value.toLowerCase() == this.props.state.questions[this.props.state.user.progress - 1]['answer'].toLowerCase()){
            result.style.visibility = 'visible';
            result.textContent = 'Correct';
            result.style.color="#9bf442";
            if(this.props.state.user.progress == this.props.state.questions.length){
                document.getElementById('next').textContent = "Last Question";
            }
            if(this.props.state.user.progress == this.props.state.questions.length - 1 || (this.props.state.user.progress == this.props.state.questions.length && this.props.state.questions.length == 1)){
                document.getElementById('complete-button').style.display = "block";
                document.getElementById('skip').style.display = "none";
            }
            if(this.props.state.user.progress < this.props.state.questions.length - 1){
                document.getElementById('next').style.display = "block";
            }
            document.getElementById('answer-submit').style.display = "none";
            document.getElementById('hint-submit').style.display = "none";
            document.getElementById('result').style.display = "block";
            var emptyArray = [];
            this.setState({
                'attempts':emptyArray
            }, this.emit1);
        }
        else{
            if(document.getElementById('answer').value != ""){
                var newArray = this.state.attempts.slice();    
                newArray.push(" " + document.getElementById('answer').value);   
                this.setState({
                    'attempts':newArray
                });
                result.style.visibility = 'visible';
                result.innerHTML = 'Incorrect <br/> Attempts: ' + newArray;
                result.style.color="red";
                document.getElementById('answer').value = "";
                document.getElementById('skip').style.display = "block";
                document.getElementById('result').style.display = "block";
                if(this.props.state.user.attempts > 0 && this.props.state.user.score > 0){
                    var userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - 5), 'attempts':(this.props.state.user.attempts - 1), 'progress':this.props.state.user.progress};
                    this.props.setUser(userData, this.done0);
                }
            }
        }
    }

    completed(){
        try{
            Socket.emit('updateTime', {'user': this.props.state.user, 'start_time': "", 'end_time':'now'});
            Socket.emit('update', {'user': this.props.state.user, 'progress':-1, 'score':this.props.state.user.score, 'attempts': 5, 'hints':0}, Socket.callback=this.handleComplete);    
        }
        catch(err){
            console.log(err);
        }
    }
    
    emit0(){
        try{
            Socket.emit('update', {'user': this.props.state.user, 'progress':this.props.state.user.progress, 'score':this.props.state.user.score, 'attempts': this.props.state.user.attempts, 'hints': this.props.state.user.hints});
        }
        catch(err){
            console.log(err);
        }
    }
    
    emit1(){
        try{
            Socket.emit('update', {'user': this.props.state.user, 'progress':(this.props.state.user.progress + 1), 'score':this.props.state.user.score, 'attempts': 5, 'hints':0});
        }
        catch(err){
            console.log(err);
        }
    }
    
    handleComplete(callback){
        var data = JSON.parse(callback);
        this.props.setUser(data['user'], this.end);
    }
    
    end(){
        this.props.changePlay('playGame', 'complete');
    }
    
    nextQuestion(){
        document.getElementById('hint1').style.display = "none";
        document.getElementById('hint2').style.display = "none";
        document.getElementById('next').style.display = "none";
        document.getElementById('result').style.display = "none";
        document.getElementById('skip').style.display = "none";
        document.getElementById('answer').value = "";
        document.getElementById('answer-submit').style.display = "block";
        if(this.props.state.questions[(this.props.state.user.progress + 1)]['hint1'] == ""){
            //checks to see if there is a second hint, if not, the button disappears
            document.getElementById('hint-submit').style.display = "block";
        }
        var userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':this.props.state.user.score, 'attempts':5,'hints':0, 'progress':(this.props.state.user.progress + 1)};
        this.props.setUser(userData,this.done0);
    }
    
    //reveals the hint on hint button ciick
    showHint(){
        var userData ={};
        if(this.props.state.questions[this.props.state.user.progress]['hint1'] != ""){
            //checks to see if there is a first hint, if not, the button disappears
            document.getElementById('hint1').style.display = "block";
            if(this.props.state.user.attempts > 0 && this.props.state.user.score > 0){
                userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - 5), 'attempts':(this.props.state.user.attempts - 1), 'hints':(this.props.state.user.hints+1), 'progress':this.props.state.user.progress};
                this.props.setUser(userData, this.done0);
            }
        }
        //condition when the button is clicked once
        if(this.props.state.questions[this.props.state.user.progress]['hint2'] == ""){
            //checks to see if there is a second hint, if not, the button disappears
            document.getElementById('hint-submit').style.display = "none";
        }
        //condition if the button is clicked twice and there is a second hint
        if(this.props.state.questions[this.props.state.user.progress]['hint2'] != ""){
            document.getElementById('hint2').style.display = "block";
            document.getElementById('hint-submit').style.display = "none";
            if(this.props.state.user.attempts > 0 && this.props.state.user.score > 0){
                userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - 5), 'attempts':(this.props.state.user.attempts - 1), 'hints':(this.props.state.user.hints+1), 'progress':this.props.state.user.progress};
                this.props.setUser(userData, this.done0);
            }
            
        }
    }
    done0(){
        this.emit0();
    }
    done1(){
        this.emit1();
    }
    skipComplete(){
        this.completed();
    }
    
    skip(){
        var userData;
        if(this.props.state.user.progress == (this.props.state.questions.length - 1)){
            document.getElementById('skip').style.display = "none";
            document.getElementById('answer-submit').style.display = "none";
            document.getElementById('complete-button').style.display = "block";
            userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - (this.props.state.user.attempts * 5)), 'attempts':5, 'hints':0, 'progress':this.props.state.user.progress};

            this.props.setUser(userData,this.skipComplete);
            this.skipComplete;
        }
        else{
            document.getElementById('hint1').style.display = "none";
            document.getElementById('hint2').style.display = "none";
            document.getElementById('next').style.display = "none";
            document.getElementById('result').style.display = "none";
            document.getElementById('skip').style.display = "none";
            document.getElementById('answer').value = "";
            document.getElementById('answer-submit').style.display = "block";
            if(this.props.state.questions[(this.props.state.user.progress + 1)]['hint1'] == ""){
                //checks to see if there is a second hint, if not, the button disappears
                document.getElementById('hint-submit').style.display = "none";
            }
            else{
                document.getElementById('hint-submit').style.display = "block";
            }
            document.getElementById('hint-submit').style.display = "block";
            userData = {'id':this.props.state.user.id, 'email':this.props.state.user.email, 'team_name':this.props.state.user.team_name, 'hunts_id':this.props.state.user.hunts_id, 'score':(this.props.state.user.score - (this.props.state.user.attempts * 5)), 'attempts':5, 'hints':0, 'progress':(this.props.state.user.progress + 1)};
            this.props.setUser(userData,this.done1);
            var emptyArray = [];
            this.setState({
                'attempts':emptyArray
            }, this.emit1);
        }
    }
    
    
    render() {
        let index = 0;
        let name = '';
        let question = '';
        let hint1 = '';
        let hint2 = '';
        let points = 0;
        try{
            index = this.props.state.user.progress - 1;
            name = this.props.state.hunt.name;
            question = "#" + (index+1) + " - " + this.props.state.questions[index]['question'];
            hint1 = this.props.state.questions[index]['hint1'];
            hint2 = this.props.state.questions[index]['hint2'];
            points = this.props.state.user.attempts * 5;
            if(this.props.state.question[index + 1]['hint1'] != ""){
                this.hide = 'block';
            }
        }catch(err){}
        
        return (
            <div>
                <div id = 'header'>
                    <header id="game">{name}</header>
                </div>
                <div id = 'intro'>
                    <div id='play-container'>
                        <div id="play-form">
                            <div id="play-question">{question}</div>
                            <div id='hints'>
                                <div id='hint1' style={{display:'none'}}>Hint One: {hint1}</div>
                                <div id='hint2' style={{display:'none'}}>Hint Two: {hint2}</div>
                            </div>
                        </div> 
                        <div id = 'input'> 
                                <label id="points" style={{display:this.props.hide, color:'#f2e537'}}>Points Avaiable For this Question: {points}</label>
                                <FormControl id = "answer" style={{display:this.props.hide}} componentClass="textarea" onChange={this.handleChange}  placeholder="Answer" />
                                <div id='result'style={{visibility:'hidden'}}>Results Placeholder<br/>array</div>
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
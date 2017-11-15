import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { ExistingTeam } from './existingTeam';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.pageName = 'home';
        this.index = 0;
        this.login = this.login.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.explore = this.explore.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    login(){
        if (document.getElementById("existingTeam").style.display == "none"){
            document.getElementById("existingTeam").style.display = "block";
            document.getElementById("nav").style.display = "none";
        }
        else{
            document.getElementById("existingTeam").style.display = "none";
            document.getElementById("nav").style.display = "block";
        }
    }
    explore(){
        this.props.setProps('select', -1);
        this.props.changePage('explore');
    }
    render() {
        return (
            <div>
                <div id='front-header'>
                    <img id="logo-big" src="../static/image/logo-big.png"/>
                </div>
                <div id='intro'>
                   <div id="slideshow">
                        <div className='helper'></div><img id="ss-image" src="../static/image/gallery/boats.jpg"/>
                    </div>
                
                    <div className='buttons'>
                        <div className ="tool">
                            <div id="nav">
                                <button className="btn" onClick={this.explore}>Let's Explore!</button>
                                <button className="btn" onClick={this.login}>Log into Existing Team</button>
                            </div>
                            <div id = 'existingTeam' style={{display:'none'}}>
                            	<ExistingTeam changePage={this.props.changePage} updateData={this.props.updateData} cancel={this.login} setProps={this.props.setProps} loggedIn={this.props.loggedIn} hunt={this.props.hunt} questions={this.props.questions} user={this.props.user}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        );
    }
}

//<button className="btn" onClick={() => this.props.changePage('play')}>Temp Button to Play Page</button>
//<button className="btn" onClick={() => this.props.changePage('adminHome')}>Temp Button to Admin Homepage</button>
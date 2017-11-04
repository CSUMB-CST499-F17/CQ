import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';
import { ExistingTeam } from './existingTeam';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.pageName = 'home';
        this.index = 0;
        this.timer;
        this.images = ['boats','bust','canneryrow','crossedarms','lighthousewide','montereycanningcompany','sistercitypark','swanboat','whale'];
        // IMAGES THAT SHOW UP SIDEWAYS: 'diversmemorial','lady','lighthousenarrow','shareabench','twowhales', 'yesterdaysdream'
        this.login = this.login.bind(this);
        this.showSlides = this.showSlides.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    componentDidMount(){
        Socket.on('updateHome', (data) => {
            var savedPage = window.localStorage.getItem( 'lastPage' );
            try{
                if(savedPage.includes("home")){
                    Socket.emit('slideshow', '', Socket.callback=this.showSlides);
                    document.getElementById("home").style.display = "block";
                }
                else{
                    this.props.changePage(savedPage);
                }
            }
            catch(e){ //first connect, no last page
                window.localStorage.setItem( 'lastPage', 'home' );
                Socket.emit('slideshow', '', Socket.callback=this.showSlides);
                document.getElementById("home").style.display = "block";
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    showSlides() {
        var image = document.getElementById("ss-image");
        if (this.index < this.images.length){
            image.src="../static/image/gallery/"+this.images[this.index]+".jpg";
            this.index+=1;
        }
        else{
            this.index=0;
        }
        // var index = Math.floor(Math.random() * this.images.length);
        // image.src="../static/image/gallery/"+this.images[index]+".jpg"; 
        if(this.props.state.lastPage == 'home'){
            setTimeout(this.showSlides, 7000); // Change image every 7 seconds
        }
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
                                <button className="btn" onClick={() => this.props.changePage('explore')}>Let's Explore!</button>
                                <button className="btn" onClick={this.login}>Log into Existing Team</button>
                            </div>
                            <div id = 'existingTeam' style={{display:'none'}}>
                            	<ExistingTeam changePage={this.props.changePage} cancel={this.login} setProps={this.props.setProps} loggedIn={this.props.state.loggedIn} name={this.props.state.name}/>
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
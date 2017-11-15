import * as React from 'react';

//pages
import { Socket } from './Socket';
import { Home } from './home';
import { Explore } from './explore';
import { Leaderboard } from './leaderboard';
import { Register } from './register';
import { Play } from './play';
import { AdminHome } from './admin/adminHome';
import { AdminLeaderboard } from './admin/adminLeaderboard';
import { AdminHunts } from './admin/adminHunts';
import { AdminCreateHunt } from './admin/adminCreateHunt';
import { AdminEditHunt } from './admin/adminEditHunt';
import { Admins } from './admin/admins';
import { AdminCreate } from './admin/adminCreate';


import { NavBar } from './admin/nav-bar';


export class Content extends React.Component{
    constructor(props) {
        super(props);
        this.state = { //essentially session vars
            id: -1,
            name: 'guest', //team name or admin user name
            loggedIn: 'no', //no,admin,superAdmin,team,teamLead
            lastPage: 'home', //last page loaded, set this dynamically
            hide:'none', //determines whether or not buttons and inputs are visible
            hunt:{},
            questions:[],
            user:{}
        };
        this.images = ['boats','bust','canneryrow','crossedarms','lighthousewide','montereycanningcompany','sistercitypark','swanboat','whale'];
        // IMAGES THAT SHOW UP SIDEWAYS: 'diversmemorial','lady','lighthousenarrow','shareabench','twowhales', 'yesterdaysdream'
        this.handle = this.handle.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setProps = this.setProps.bind(this);
        this.logOutSetProps = this.logOutSetProps.bind(this);
        this.ready = this.ready.bind(this);
        this.start = this.start.bind(this);
        this.showSlides = this.showSlides.bind(this);
    }
    componentDidMount(){
        try{ //get state from localstorage
            var obj = JSON.parse(window.localStorage.state);
            this.setState(obj, this.ready);
        }catch(e){
            Socket.emit('home', this.state, Socket.callback=this.start);
        }
    }
    ready(){
        Socket.emit('home', this.state, Socket.callback=this.start);
    }
    start(lastPage){
        try{
            if(lastPage.includes("home")){
                this.showSlides();
                document.getElementById("home").style.display = "block";
            }
            else{
                this.changePage(lastPage);
            }
        }
        catch(e){ //first connect, no last page?
            console.log(e);
        }
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
        if(this.state.lastPage == 'home'){
            setTimeout(this.showSlides, 7000); // Change image every 7 seconds
        }
    }
    setProps(prop, value){
        var obj  = {};
        obj[prop] = value;
        this.setState(obj);
        // UNHIDE BEFORE BETA
        if(this.state.loggedIn == 'teamLead' || this.state.loggedIn == 'superAdmin'){
            this.setState({
                hide:'block'
            });
        }
        else{
            this.setState({
                hide:'none'
            });
        }
    }
    logOutSetProps(){
        this.setState({
            id: -1,
            loggedIn: 'no',
            name: 'guest',
            hide:'none'  //UNHIDE BEFORE BETA
        });
        this.changePage('home');
    }
    handle(callback){
        //handle returns from any page sockets
    }
    changePage(location){
        try{
            Socket.emit(location, this.state);
            if(location.indexOf('admin') != -1){ //it is admin page
                document.getElementById(this.state.lastPage).style.display = "none";
                document.getElementById(location).style.display = "block";
                document.getElementById('nav-bar').style.display = "block";
            }
            else if(location.indexOf('admin') == -1){ //not admin
                document.getElementById(this.state.lastPage).style.display = "none";
                document.getElementById(location).style.display = "block";
                document.getElementById('nav-bar').style.display = "none";
            }
            this.state.lastPage = location;
            window.localStorage.setItem('state',JSON.stringify(this.state));
        }catch(e){
            console.log(e);
        }
    }
    
    render(){
            return (
                <div>
                    <div id = 'home' style={{display:'none'}}>
                        <Home changePage={this.changePage} state={this.state} setProps={this.setProps} />
                    </div>
                    <div id = 'explore' style={{display:'none'}}>
                        <Explore changePage={this.changePage} key="explore"/>
                    </div>
                    <div id = 'leaderboard' style={{display:'none'}}>
                        <Leaderboard changePage={this.changePage}/>
                    </div>
                    <div id = 'register' style={{display:'none'}}>
                        <Register changePage={this.changePage}/>
                    </div>
                     <div id = 'play' style={{display:'none'}}>
                        <Play changePage={this.changePage} hide={this.state.hide} state={this.state} setProps={this.setProps} logOutSetProps={this.logOutSetProps} updateData={this.updateData}/>
                    </div>
                    <div id = 'nav-bar' style={{display:'none'}}>
                        <NavBar changePage={this.changePage} hide={this.state.hide} logOutSetProps={this.logOutSetProps}/>
                    </div>
                    <div id = 'adminHome' style={{display:'none'}}>
                        <AdminHome changePage={this.changePage} state={this.state}/>
                    </div>
                    <div id = 'adminLeaderboard' style={{display:'none'}}>
                        <AdminLeaderboard changePage={this.changePage}/>
                    </div>
                    <div id = 'adminHunts' style={{display:'none'}}>
                        <AdminHunts changePage={this.changePage}/>
                    </div>
                    <div id = 'adminCreateHunt' style={{display:'none'}}>
                        <AdminCreateHunt changePage={this.changePage}/>
                    </div>
                    <div id = 'adminEditHunt' style={{display:'none'}}>
                        <AdminEditHunt changePage={this.changePage}/>
                    </div>
                    <div id = 'admins' style={{display:'none'}}>
                        <Admins changePage={this.changePage}/>
                    </div>
                    <div id = 'adminCreate' style={{display:'none'}}>
                        <AdminCreate changePage={this.changePage}/>
                    </div>
                    
                </div>
               
            );
    }
    
}
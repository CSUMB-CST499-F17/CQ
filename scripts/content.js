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
        // this.start = this.start.bind(this);
        this.handle = this.handle.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setProps = this.setProps.bind(this);
        this.logOutSetProps = this.logOutSetProps.bind(this);
        
    }
    componentDidMount(){
        Socket.emit('home', this.state);
        // Socket.emit('home', this.state, Socket.callback=this.start);
        
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
        //if location is admin or team page and loggedin == no, go to home, set state guest
        try{
            Socket.emit(location, this.state);
            if(location.indexOf('admin') != -1){ //it is admin page
                document.getElementById(this.state.lastPage).style.display = "none";
                document.getElementById(location).style.display = "block";
                document.getElementById('nav-bar').style.display = "block";
            }
            else if(location.indexOf('admin') == -1){
                document.getElementById(this.state.lastPage).style.display = "none";
                document.getElementById(location).style.display = "block";
                document.getElementById('nav-bar').style.display = "none";
            }
            this.state.lastPage = location;
            for (var n in this.state){
                window.localStorage.setItem( n, this.state[n] );
            }
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
                        <Play changePage={this.changePage} state={this.state} setProps={this.setProps} logOutSetProps={this.logOutSetProps} updateData={this.updateData}/>
                    </div>
                    <div id = 'nav-bar' style={{display:'none'}}>
                        <NavBar changePage={this.changePage} hide={this.state.hide} logOutSetProps={this.logOutSetProps}/>
                    </div>
                    <div id = 'adminHome' style={{display:'none'}}>
                        <AdminHome changePage={this.changePage}/>
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
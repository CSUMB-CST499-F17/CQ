import * as React from 'react';

//pages
import { Socket } from './Socket';
import { Home } from './home';
import { Explore } from './explore';
import { Leaderboard } from './leaderboard';
import { ExistingTeam } from './existingTeam';
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
            name: 'guest', //team name or admin user name
            loggedIn: 'no', //no,admin,superAdmin,team,teamLead
            lastPage: 'home', //last page loaded, set this dynamically
            hide:'none', //determines whether or not buttons and inputs are visible
        };
        // this.start = this.start.bind(this);
        this.temp = '';
        this.handle = this.handle.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setProps = this.setProps.bind(this);
    }
    componentDidMount(){
        Socket.emit('home', this.state);
        // Socket.emit('home', this.state, Socket.callback=this.start);
        
    }
    setProps(loggedIn, name){
        this.setState({
            loggedIn: loggedIn,
            name: name
        });
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
    handle(callback){
        console.log('returned!');
    }
    //changes the display of the pages when button is pressed
    // changePage(from,to){
    //     this.state.temp = this.state.lastPage;
    //     this.state.lastPage = to;
    //     for (var n in this.state){
    //         window.localStorage.setItem( n, this.state[n] );
    //     }
    //     Socket.emit(to, this.state, Socket.callback=this.handle);
    //     if(to.indexOf('admin') !== -1){
    //         document.getElementById(this.state.temp).style.display = "none";
    //         document.getElementById(to).style.display = "block";
    //         document.getElementById('nav-bar').style.display = "block";
    //         // Socket.emit('adminPage', this.state.temp);

    //     }
    //     if(to.indexOf('admin') == -1){
    //         document.getElementById(this.state.temp).style.display = "none";
    //         document.getElementById(to).style.display = "block";
    //         document.getElementById('nav-bar').style.display = "none";
    //     }
    // }
    
    
    changePage(to){
        this.state.temp = this.state.lastPage;
        this.state.lastPage = to;
        for (var n in this.state){
            window.localStorage.setItem( n, this.state[n] );
        }
        Socket.emit(to, this.state, Socket.callback=this.handle);
        if(to.indexOf('admin') !== -1){
            document.getElementById(this.state.temp).style.display = "none";
            document.getElementById(to).style.display = "block";
            document.getElementById('nav-bar').style.display = "block";
            // Socket.emit('adminPage', this.state.temp);

        }
        if(to.indexOf('admin') == -1){
            document.getElementById(this.state.temp).style.display = "none";
            document.getElementById(to).style.display = "block";
            document.getElementById('nav-bar').style.display = "none";
        }
    }
    
    
    
    
    render(){
        return (
            <div>
                <div id = 'home' style={{display:'block'}}>
                    <Home changePage={this.changePage} lastPage={this.state.lastPage}/>
                </div>
                <div id = 'explore' style={{display:'none'}}>
                    <Explore changePage={this.changePage}/>
                </div>
                <div id = 'leaderboard' style={{display:'none'}}>
                    <Leaderboard changePage={this.changePage}/>
                </div>
                <div id = 'existingTeam' style={{display:'none'}}>
                    <ExistingTeam changePage={this.changePage} setProps={this.setProps} loggedIn={this.state.loggedIn} name={this.state.name}/>
                </div>
                <div id = 'register' style={{display:'none'}}>
                    <Register changePage={this.changePage}/>
                </div>
                <div id = 'play' style={{display:'none'}}>
                    <Play changePage={this.changePage} loggedIn={this.state.loggedIn} hide={this.state.hide}/>
                </div>
                <div id = 'nav-bar' style={{display:'none'}}>
                    <NavBar changePage={this.changePage} lastPage={this.state.lastPage}/>
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
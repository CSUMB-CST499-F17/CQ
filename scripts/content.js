import * as React from 'react';

//pages
import { Home } from './home';
import { Explore } from './explore';
import { ExistingTeam } from './existingTeam';
import { Register } from './register';
import { AdminHome } from './admin/adminHome';

export class Content extends React.Component{

    render(){
        return (
            <div>
                <div id = 'home'>
                    <Home/>
                </div>
                <div id = 'explore' style={{display:'none'}}>
                    <Explore/>
                </div>
                <div id = 'existingTeam' style={{display:'none'}}>
                    <ExistingTeam/>
                </div>
                <div id = 'register' style={{display:'none'}}>
                    <Register/>
                </div>
                <div id = 'adminHome' style={{display:'none'}}>
                    <AdminHome/>
                </div>
                
            </div>
           
        );
    }
    
}
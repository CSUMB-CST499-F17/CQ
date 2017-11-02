import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';

import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { LogoSmall } from './logo-small';

export class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'count':0,
            
            'hunts':[],
            'types':[],
            'chosentype':''
        };
        this.pageName = 'explore';
        this.sort = this.sort.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        Socket.on('updateExplore', (data) => { 
            var d_types = data['types'];
            var d_hunts = data['hunts'];
            var types = [];
            var hunts = [];
            var first = "";
            for(var i = 0; i < d_hunts.length; i++ )
            {
                hunts.push([d_hunts[i].id,d_hunts[i].name,d_hunts[i].h_type,d_hunts[i].desc,d_hunts[i].image,d_hunts[i].start_time,d_hunts[i].end_time,d_hunts[i].start_text]); //convert to array for mapping
            }
            for(i = 0; i < d_types.length; i++ )
            {
                var item = d_types[i].charAt(0).toUpperCase() + d_types[i].slice(1);
                if(i==0){
                    first = item;
                }
                else{
                    types.push(item); //convert to array for mapping
                }
            }
            this.setState({'chosentype': first, 'types': types , 'hunts': hunts});
        });
        Socket.on('updateType', (data) => { 
            var hunts = [];
            for(var i = 0; i < data.length; i++ )
            {
                hunts.push([data[i].id,data[i].name,data[i].h_type,data[i].desc,data[i].image,data[i].start_time,data[i].end_time,data[i].start_text]); //convert to array for mapping
            }
            this.setState({'hunts': hunts});
        });
    }
    sort(type){
        var types = this.state.types;
        var index = types.indexOf(type);
        if (index !== -1) {
            types[index] = this.state.chosentype;
        }
        this.setState({'chosentype': type, 'types': types});
        Socket.emit('changeType', type.toLowerCase());
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        let hunts = this.state.hunts.map((n, index) => 
            <div id={n[0]} className="hunt-preview">
                <header>{n[1]}</header>
                <img src={n[4]}/>
                <p>{n[5]} to {n[6]}</p>
                <p>{n[3]}</p>
            </div>
        );
        let types = this.state.types.map((n, index) => 
            <MenuItem onClick={() => this.sort(n)}>{n}</MenuItem>
        );
        
        return (
            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                
                <div id ='header'>
                    <DropdownButton title={this.state.chosentype} id="bg-nested-dropdown" >
                        {types}
                    </DropdownButton>
                    Scavenger Hunts
                </div>
                <div className="clear"></div>
                <div id='intro'>
                    {hunts}
                    <div id='buttons'>
                        <button className='btn' onClick={() => this.props.changePage('leaderboard')}>Leaderboard</button>
                        <button className='btn' onClick={() => this.props.changePage('register')}>Participate</button>
                    </div>
                    <div id='buttons'>
                        <button className='btn' onClick={() => this.props.changePage('home')}>Home</button>
                    </div>
                </div>
            </div>

        );
    }
}

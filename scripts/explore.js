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
        this.updateExplore = this.updateExplore.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        Socket.on('updateExplore', (data) => {
            Socket.emit('changeType', this.state.chosentype.toLowerCase(), Socket.callback=this.updateExplore);
        });
    }
    updateExplore(callback){
        var data = JSON.parse(callback);
        var d_types = data['types'];
        var d_hunts = data['hunts'];
        var choice = data['choice'].charAt(0).toUpperCase() + data['choice'].slice(1);
        var types = [];
        var hunts = [];
        for(var i = 0; i < d_hunts.length; i++ )
        {
            hunts.push([d_hunts[i].id,d_hunts[i].name,d_hunts[i].h_type,d_hunts[i].desc,d_hunts[i].image,d_hunts[i].start_time,d_hunts[i].end_time,d_hunts[i].start_text]); //convert to array for mapping
        }
        for(i = 0; i < d_types.length; i++ )
        {
            if(d_types != choice)
                types.push(d_types[i].charAt(0).toUpperCase() + d_types[i].slice(1)); //convert to array for mapping
        }
        this.setState({'chosentype': choice, 'types': types , 'hunts': hunts}); 
    }
    sort(type){
        var types = this.state.types;
        var index = types.indexOf(type);
        if (index !== -1) {
            types[index] = this.state.chosentype;
        }
        this.setState({'types': types});
        Socket.emit('changeType', type.toLowerCase(), Socket.callback=this.updateExplore);
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        let hunts = this.state.hunts.map((n, index) => 
            <div id={n[0]} key={n[0]} className="hunt-preview">
                <header>{n[1]}</header>
                <img src={"../static/image/gallery/" + n[4]}/>
                <p>{n[5]} to {n[6]}</p>
                <p>{n[3]}</p>
            </div>
        );
        let types = this.state.types.map((n, index) => 
            <MenuItem onClick={() => this.sort(n)} key={index}>{n}</MenuItem>
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
                    <div id='arrows'>
                        <img className="arrow-left" src="./static/image/l-arrow.png" onClick={() => this.setState(({count:(this.state.count == 0 ? this.state.hunts.length - 1 : this.state.count - 1)}))}></img>
                        <img className="arrow-right" src="./static/image/r-arrow.png" onClick={() => this.setState(({count:(this.state.count == this.state.hunts.length - 1 ? 0 : this.state.count + 1)}))}></img>
                        {hunts[this.state.count]}
                    </div>
                    <div id='buttons'>
                        <button className='btn' onClick={() => this.props.changePage('leaderboard')}>Leaderboard</button>
                        <button className='btn' onClick={() => this.props.changePage('register')}>Participate</button>
                    </div>
                    <div>
                        <button className='btn' onClick={() => this.props.changePage('home')}>Home</button>
                    </div>
                </div>
            </div>

        );
    }
}

import * as React from 'react';
import { Socket } from './Socket';
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
        this.changePageWithId = this.changePageWithId.bind(this); //changes hunt displayed based on value of the hunt that the user is viewing
        this.sort = this.sort.bind(this); //sorts the hunts in drop down based on type
        this.updateExplore = this.updateExplore.bind(this); //callback function to changeType Socket //populates page with hunt information retrieved from database via app.py
    }
    
    componentDidMount() {
        //updates explore page with hunt information
        Socket.on('updateExplore', (data) => {
            Socket.emit('changeType', this.state.chosentype.toLowerCase(), Socket.callback=this.updateExplore);
        });
    }
    //changes hunt displayed based on value of the hunt that the user is viewing
    changePageWithId(hid, page){
        this.props.setProps('select',hid);
        this.props.changePage(page);
    }
    //sorts the hunts in drop down based on type
    sort(type){
        var types = this.state.types;
        var index = types.indexOf(type);
        if (index !== -1) {
            types[index] = this.state.chosentype;
        }
        this.setState({'types': types}); //updates types
        Socket.emit('changeType', type.toLowerCase(), Socket.callback=this.updateExplore);
    }
    //callback function to changeType Socket //populates page with hunt information retrieved from database via app.py
    updateExplore(callback){
        this.setState({'count':0});
        if(callback == 'empty'){
            console.log('NO HUNTS');
        }
        else{ 
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
            this.setState({'chosentype': choice, 'types': types , 'hunts': hunts}); //updates choice
        }
    }

    render() {
        let hunts = this.state.hunts.map((n, index) => 
            <div id={n[0]} key={n[0]} className="hunt-preview">
                <header>{n[1]}</header>
                <div className="arrow arrow-left" onClick={() => this.setState(({'count':(this.state.count == 0 ? this.state.hunts.length - 1 : this.state.count - 1)}))}></div>
                <img src={n[4]}/>
                <div className="arrow arrow-right" onClick={() => this.setState(({'count':(this.state.count == this.state.hunts.length - 1 ? 0 : this.state.count + 1)}))}></div>
                <p>{n[5]} to {n[6]}</p>
                <p>{n[3]}</p>
                <div id='buttons'>
                    <button className='btn' onClick={() => this.changePageWithId(n[0],'leaderboard')}>Leaderboard</button>
                    <button className='btn' onClick={() => this.changePageWithId(n[0],'register')}>Participate</button>
                </div>
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
                    <div className='hunt-preview'>
                        {hunts[this.state.count]}
                    </div>
                    <div>
                        <button className='btn' onClick={() => this.props.changePage('home')}>Home</button>
                    </div>
                </div>
            </div>

        );
    }
}

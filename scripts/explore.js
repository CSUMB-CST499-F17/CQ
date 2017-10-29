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
            
            'name':[],
            'h_type':[],
            'desc':[],
            'image':[],
            'start_time':[],
            'end_time':[],
            'start_text':[]
        };
        
        this.changePage = this.changePage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        Socket.on('hunt-info', (data) => { 
            var name = this.state.name.slice();
            var h_type = this.state.h_type.slice();
            var desc = this.state.desc.slice();
            var image = this.state.image.slice();
            var start_time = this.state.start_time.slice();
            var end_time = this.state.end_time.slice();
            var start_text = this.state.start_text.slice();

            for(var i = 0; i < data.size(); i++ )
            {
                name.push(data['name'][i]);
                this.setState({ 'name': name });
                h_type.push(data['h_type'][i]);
                this.setState({ 'h_type': h_type });
                desc.push(data['desc'][i]);
                this.setState({ 'desc': desc });
                image.push(data['image'][i]);
                this.setState({ 'image': image });
                start_time.push(data['start_time'][i]);
                this.setState({ 'start_time': start_time });
                end_time.push(data['end_time'][i]);
                this.setState({ 'end_time': end_time });
                start_text.push(data['start_text'][i]);
                this.setState({ 'start_text': start_text });
            }
              // Get the quiz form element
            var dropdown = document.getElementById('bg-nested-dropdown');
        
            // Good to do error checking, make sure we managed to get something
            if (dropdown)
            {
                    // Create a new <p> element
                    var hunts = this.state.h_type;
                    var item = document.createElement('MENUITEM');
                    item.value = hunts[0];
                    dropdown.appendChild(item);
                    // for(var j = 0; j < hunts.size(); j++ )
                    // {
 
                    // }
    
            }
        });
    
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    //changes the display of the pages when button is pressed
    changePage(page){
        document.getElementById('explore').style.display = "none";
        Socket.emit(page);
        document.getElementById(page).style.display = "block";
    }

    render() {
        return (
            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id ='header'>
                    <header>EXPLORE</header>
                </div>
                <div id='intro'>
                    <div id="info"></div>
                </div>
                <div id='buttons'>
                    <ButtonToolbar>
                        <Button onClick={() => this.changePage('leaderboard')}>Leaderboard</Button>
                        <Button onClick={() => this.changePage('register')}>Participate</Button>
                        <Button onClick={() => this.changePage('home')}>Home</Button>
                    </ButtonToolbar>
                </div>
                <div id='buttons'>
                    <ButtonGroup>
                    <DropdownButton title="Select Hunt    " id="bg-nested-dropdown" >
                        <MenuItem>no hunts yet my dog</MenuItem>
                    </DropdownButton>
                    </ButtonGroup>
                </div>
            </div>

        );
    }
}

import * as React from 'react';
import { Socket } from './Socket';
import { Button } from 'react-bootstrap';

import { LogoSmall } from './logo-small';

export class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

    }

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {

        return (
            <div>
                <div id = 'logo-small'>
                    <LogoSmall/>
                </div>
                <div id = 'header'>
                    <header>Finished</header>
                </div>
                    <div id='intro'>
                        <div id='buttons'>
                            <Button onClick={() => this.props.changePage('home')}>Home</Button>
                        </div>      
                    </div>
            </div>

        );
    }
}

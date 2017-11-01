import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Socket } from './Socket';


export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.pageName = 'home';
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        Socket.on('updateHome', (data) => {
            try{
                var savedPage = window.localStorage.getItem( 'lastPage' );
                if(savedPage == 'null'){
                    savedPage = 'home';
                }
                console.log(savedPage);
                if (savedPage != 'home'){
                    this.props.changePage(this.pageName,savedPage);
                }
            }catch(e){}
        });
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {

        return (
            <div>
                <div id='header'>
                    <img id="logo-big" src="../static/image/logo-big.png"/>
                </div>
                <div id='intro'>
                    <img id = "pageImage" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG/1200px-Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG' width='40%'></img>
                </div>
                <div id='buttons'>
                    <div className ="tool">
                        <button className="btn" onClick={() => this.props.changePage('explore')}>Let's Explore!</button>
                        <button className="btn" onClick={() => this.props.changePage('existingTeam')}>Log into Existing Team</button>
                        <button className="btn" onClick={() => this.props.changePage('adminHome')}>Temp Button to Admin Homepage</button>
                        <button className="btn" onClick={() => this.props.changePage('play')}>Temp Button to Play Page</button>
                    </div>
                </div>
            </div>

        );
    }
}

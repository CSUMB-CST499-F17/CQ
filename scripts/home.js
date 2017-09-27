import * as React from 'react';

export class Home extends React.Component {
    render() {
        return (
            <div>
                <header>Coastal Quest</header>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG/1200px-Lovers_Point_Park_-_Pacific_Grove%2C_CA_-_DSC06525.JPG' width='50%'></img>
                </div>
                <button>Let's Explore!</button>
                <button>Log into Existing Team</button>
            </div>
         
        );
    }
}
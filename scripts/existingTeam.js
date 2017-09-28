import * as React from 'react';

export class ExistingTeam extends React.Component {
    render() {
        return (
            <div>
                <header>EXISTING TEAMS</header>
                <div id='intro'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Full_Spectrum_Team_Waving.jpg/1024px-Full_Spectrum_Team_Waving.jpg' width='50%'></img>
                </div>
                <form>
                    <input type="text" placeholder="Enter email" />
                    <input type="text" placeholder="Enter access code" />
                    <button id= "chatSubmit">Enter!</button>
                 </form>
            </div>
         
        );
    }
}
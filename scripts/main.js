import * as React from '../node_modules/react';
import * as ReactDOM from '../node_modules/react-dom';

import { Content } from './content';
import { Explore } from './explore';
import { ExistingTeam } from './existingTeam';
import { AdminHome } from './admin/adminHome';

ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Explore />, document.getElementById('explore'));
document.getElementById('explore').style.display = "none";
ReactDOM.render(<ExistingTeam />, document.getElementById('existingTeam'));
document.getElementById('existingTeam').style.display = "none";
ReactDOM.render(<AdminHome />, document.getElementById('adminHome'));
document.getElementById('adminHome').style.display = "none";



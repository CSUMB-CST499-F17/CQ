import * as React from '../node_modules/react';
import * as ReactDOM from '../node_modules/react-dom';

import { Content } from './content';
import { Explore } from './explore';

ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Explore />, document.getElementById('explore'));
document.getElementById('explore').style.display = "none";



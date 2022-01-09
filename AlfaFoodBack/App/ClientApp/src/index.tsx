// import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { ConnectedRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';

import App from './App';
import "./styles/main.scss"
import registerServiceWorker from './registerServiceWorker';

// Create browser history to use in the Redux store
// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
// const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import React360 from './client'

// React360('client.bundle', document.querySelector('#react360'))

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

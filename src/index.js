import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import './globals/styles/normalize.css';
import './globals/styles/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

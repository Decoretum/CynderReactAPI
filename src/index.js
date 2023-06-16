import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'

import App from './App';

let rootel = document.getElementById('root');
let root = createRoot(rootel)
root.render(
    <App />
)
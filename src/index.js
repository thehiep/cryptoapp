import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'antd/dist/antd.css'
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(<BrowserRouter >
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>, document.getElementById('root'));
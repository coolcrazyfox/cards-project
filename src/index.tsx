import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './n1-main/m1-ui/app/App';
import {Provider} from 'react-redux';
import {store} from './n1-main/m2-bll/store';
import {HashRouter} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

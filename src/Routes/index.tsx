import * as React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Error from '../pages/Error'
import Hello from '../pages/Hello'
import APP from '../pages/App'
import Snippet from './snippet'


const RouterConfig = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/er" component={Error}/>
                <Route exact path="/hello" component={Hello}/>
                <Route exact path="/app" component={APP}/>
                {Snippet()}
                <Route path="*" component={Error}/>
            </Switch>
        </Router>
    )
};

export default RouterConfig;
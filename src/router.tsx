import * as React from 'react';
import { browserHistory, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app';
import { HomePageContainer } from './modules/home/container';
import { CourseDetailContainter } from "./modules/course/container";
//import { createBrowserHistory } from 'history';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={HomePageContainer}/>
                    <Route exact path="/course/:id" component={CourseDetailContainter}/>
                </Switch>
            </App>
        </Router>
    </Provider>
  );
}

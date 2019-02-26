import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app';
import { HomePageContainer } from './modules/home/container';
import { CourseDetailContainter } from "./modules/course/container";

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} >
              <Route path="course/1/" component={CourseDetailContainter}/>
              <IndexRoute component={HomePageContainer} />
          </Route>
        </Router>
    </Provider>
  );
}

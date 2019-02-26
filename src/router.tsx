import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app';
import { ListCourseContainer } from './modules/courses/container';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} >
            <IndexRoute component={ListCourseContainer} />
          </Route>
        </Router>
    </Provider>
  );
}

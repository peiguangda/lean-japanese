import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {App} from './app';
import {HomePageContainer} from './modules/home/container';
import {CourseDetailContainter} from "./modules/course/container";
import {LessonDetailContainter} from "./modules/lesson/container";
import './public/css/custom.scss';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePageContainer}/>
                    <Route exact path="/course/:id" component={CourseDetailContainter}/>
                    <Route exact path="/lesson/:id" component={LessonDetailContainter}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

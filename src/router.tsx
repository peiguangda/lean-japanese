import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {HomePageContainer} from './modules/home/container';
import {CourseDetailContainer} from "./modules/course/container";
import {LessonDetailContainer} from "./modules/lesson/container";
import './public/css/custom.scss';
import './public/css/nga_custom.css';
import {ExamContainer} from "./modules/exam/container";

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePageContainer}/>
                    <Route exact path="/course/:id" component={CourseDetailContainer}/>
                    <Route exact path="/lesson/:id" component={LessonDetailContainer}/>
                    <Route exact path="/lesson/:id/exam" component={ExamContainer}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

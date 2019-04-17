import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {BackTop, Input, Layout, PageHeader, Radio, Tabs} from 'antd';
import {LessonEntity} from "../../../common/types/lesson";
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {Question} from "./Question";

const TabPane = Tabs.TabPane;

const {
    Footer
} = Layout;

const {TextArea} = Input;
const RadioGroup = Radio.Group;

const routes = [
    {
        path: '/',
        breadcrumbName: 'Home',
    },
    {
        path: 'course/1',
        breadcrumbName: 'Course',
    },
    {
        path: 'lesson/1',
        breadcrumbName: 'Lesson',
    },
];

export interface Props {
    match: any;
    params: any;
    lesson: LessonEntity;
    props: any,
    api: ApiEntity;

    fetchLesson(parameters): Promise<any>;
}

export interface State {
    value: number;
}

export class Exam extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        }
    }

    componentWillMount() {
        this.initLesson(this.props.match.params.id);
    }

    public initLesson = (id) => {
        this.props.fetchLesson({id: id})
            .then(res => {
                if (res && res.status == "success") {
                    let lesson = res.data;

                }
            })
    }

    public onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    public render() {
        let {lesson, api, props} = this.props;
        let {match: {params}} = this.props;

        return (
            <Fragment>
                <Helmet title={"Lesson"}/>
                <NavigationBarContainter/>
                {/*-------------------------page header-------------------------*/}
                <div className="container">
                    <PageHeader
                        className="mt-5"
                        title=""
                        breadcrumb={{routes}}
                    />
                    {api.loadings > 0 ? <Loader/> : ""}
                    <div className="row ml-5 mr-1 custom-container">
                        <div className="col-md-9">
                            <Question props={props}/>
                            <Question props={props}/>
                            <Question props={props}/>
                            <Question props={props}/>
                        </div>
                        <div className="col-md-3 mt-3 fill-answer">
                            <div className="row">
                                <img src="https://media.giphy.com/media/2zoCrihrueMUVOZlTx/giphy.gif"
                                     className="col-md-6 float-right clock-gif-size"/>
                                <div className="col-md-6 float-left">time</div>
                            </div>
                            <div className="row locker">
                                <div className="col">
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                    <p className="row">aaa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer style={{textAlign: 'center'}}>
                        Easy Japanese Design ©2019 Created by HEDSPI
                    </Footer>
                </div>
                <BackTop/>
            </Fragment>
        );
    }
}

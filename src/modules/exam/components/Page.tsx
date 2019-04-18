import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {BackTop, Button, Layout, PageHeader} from 'antd';
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {Question} from "./Question";
import {ExerciseEntity} from "../../../common/types/exercise";
import {convert} from "../../../helpers/Function";

const {
    Footer
} = Layout;

const routes = [
    {
        path: '/',
        breadcrumbName: 'Home',
    },
    {
        path: '/course/1',
        breadcrumbName: 'Course',
    },
    {
        path: '/lesson/1',
        breadcrumbName: 'Lesson',
    },
];

export interface Props {
    match: any;
    params: any;
    props: any,
    api: ApiEntity;
    listExercise: Array<ExerciseEntity>;

    fetchListExercise(parameters): void;
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
        let {props} = this.props;
        console.log(props);
        this.props.fetchListExercise({topic_id: props.match.params.id});
    }

    public onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    public showListQuestion = () => {
        let {listExercise, props} = this.props;
        listExercise = convert(listExercise);
        let lengthExercise = listExercise.length;
        if (listExercise && listExercise.length) {
            return listExercise.map((ex, index) => {
                console.log("ex", ex);
                return <Question
                    props={props}
                    exercise={ex}
                    index={index}
                    lengthExercise={lengthExercise}
                />
            })
        }
    }

    public getValue = (index) => {
        return String.fromCharCode(65 + index);
    }

    public showAnswer = (exercise) => {
        let result = [];
        let {list_answer, list_correct_answer} = exercise;
        if (list_answer && list_answer.length) for (let i = 0; i < list_answer.length + 1; i++) {
            result.push(<Button className="col-md-2 answer-btn" key={i}>{this.getValue(i)}</Button>);
        }
        return result;
    }

    public showListAnswer = () => {
        let {listExercise, props} = this.props;
        listExercise = convert(listExercise);
        if (listExercise && listExercise.length) {
            return listExercise.map((ex, index) => {
                console.log("ex", ex);
                return <Fragment>
                    <div className="row answer-row">
                        <div className="col-md-2 question-number">{index + 1}</div>
                        {this.showAnswer(ex)}
                    </div>
                </Fragment>
            })
        }
    }

    public render() {
        let {api, props, listExercise} = this.props;
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
                            {this.showListQuestion()}
                        </div>
                        <div className="col-md-3 mt-3 fill-answer">
                            <div className="row">
                                <img src="https://media.giphy.com/media/2zoCrihrueMUVOZlTx/giphy.gif"
                                     className="col-md-6 float-right clock-gif-size"/>
                                <div className="col-md-6 float-left mt-3">10:00</div>
                            </div>
                            <div className="row locker">
                                <div className="col">
                                    <div className="row answer-count-bar">
                                        <div className="col-md-2">TT</div>
                                        <div className="col-md-2">0</div>
                                        <div className="col-md-2">0</div>
                                        <div className="col-md-2">0</div>
                                        <div className="col-md-2">0</div>
                                    </div>
                                    {this.showListAnswer()}
                                </div>
                            </div>
                            <div className="row btn-submit-exam">
                                Nộp bài
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

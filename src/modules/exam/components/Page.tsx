import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {Anchor, BackTop, Button, Layout, Modal, PageHeader} from 'antd';
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {Question} from "./Question";
import {ExerciseEntity} from "../../../common/types/exercise";
import {convert} from "../../../helpers/Function";
import {UserEntity} from "../../../common/types/user";
import {remove} from 'lodash';

const confirm = Modal.confirm;

const {Link} = Anchor;

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
    currentUser: UserEntity;
    listExercise: Array<ExerciseEntity>;

    fetchListExercise(parameters): void;
}

export interface State {
    value: number;
    listChoose: Array<any>;
}

export class Exam extends React.Component<Props, State, {}> {
    public updateListChoose = (parameters) => {
        let {listChoose} = this.state;
        let index = parameters.index;
        let listAnswer = parameters.listAnswer;
        //truong hop answer cua cau hoi da ton tai trong array
        let objectAnswer = listChoose.find(object => object.index === index);
        if (objectAnswer) {
            objectAnswer.listAnswer = listAnswer;
            //update objectAnswer vao listChoose
            listChoose = listChoose.map((object, num) => {
                if (object.index === index) return objectAnswer;
                return object;
            })
        } else {
            //answer chua ton tai
            objectAnswer = {index: index, listAnswer: listAnswer};
            listChoose.push(objectAnswer);
        }
        this.setState({
            listChoose: listChoose
        })
    }
    public showListQuestion = () => {
        let {listExercise, props} = this.props;
        let {listChoose} = this.state;
        listExercise = convert(listExercise);
        let lengthExercise = listExercise.length;
        if (listExercise && listExercise.length) {
            return listExercise.map((ex, index) => {
                let objectAnswer = listChoose.find(object => object.index === index);
                console.log("objectAnswer", objectAnswer);
                return <Question
                    props={props}
                    exercise={ex}
                    index={index}
                    lengthExercise={lengthExercise}
                    listAnswer={objectAnswer ? objectAnswer.listAnswer : []}
                    updateListChoose={this.updateListChoose}
                />
            })
        }
    }
    public getValue = (index) => {
        return String.fromCharCode(65 + index);
    }
    public onChooseAnswer = (answer, index) => {
        let {listExercise, props, currentUser} = this.props;
        let {listChoose} = this.state;
        //object: {user_id: 1, chose: [{index: 1, answer: [1,2]}, {index: 2, answer: 1}]}
        let objectAnswer = listChoose.find(object => object.index === index);
        //truong hop answer cua cau hoi da ton tai trong array
        if (objectAnswer) {
            let listAnswer = objectAnswer.listAnswer;
            //neu cau tra loi da ton tai trong ds cau tra loi -> xoa
            if (listAnswer.indexOf(answer) > -1) listAnswer = remove(listAnswer, (value) => {
                return value != answer;
            })
            //neu cau tra loi chua ton tai trong ds cau tra loi -> them vao ds cau tra loi
            else listAnswer.push(answer);
            objectAnswer.listAnswer = listAnswer;
            //update objectAnswer vao listChoose
            listChoose = listChoose.map((object, num) => {
                if (object.index === index) return objectAnswer;
                return object;
            })
        } else {
            //answer chua ton tai
            objectAnswer = {index: index, listAnswer: [answer]};
            listChoose.push(objectAnswer);
        }
        this.setState({
            listChoose: listChoose
        })
        console.log("aaaaaaa", this.state.listChoose);
    }
    public showAnswer = (exercise, index, selectedAnswer) => {
        let result = [], listAnswer;
        if (selectedAnswer) listAnswer = selectedAnswer.listAnswer;
        let {list_answer, list_correct_answer} = exercise;
        if (list_answer) for (let i = 0; i < list_answer.length + 1; i++) {
            result.push(<Link href={`#${index}`} title={<Button
                className={`col-md-2 answer-btn ${listAnswer ? listAnswer.indexOf(i) > -1 ? 'choose-correct' : '' : ''}`}
                key={i}
                onClick={() => this.onChooseAnswer(i, index)}>{this.getValue(i)}</Button>}></Link>);
        }
        return result;
    }
    public showListAnswer = () => {
        let {listChoose} = this.state;
        let {listExercise, props} = this.props;
        listExercise = convert(listExercise);
        if (listExercise && listExercise.length) {
            return listExercise.map((ex, index) => {
                let selectedAnswer = listChoose.find(object => object.index === index);
                return <Fragment>
                    <Anchor affix={false}>
                        <div className="row answer-row">
                            <div className="col-md-2 question-number">{index + 1}</div>
                            {this.showAnswer(ex, index, selectedAnswer)}
                        </div>
                    </Anchor>
                </Fragment>
            })
        }
    }

    public onSubmitExam = () => {
        console.log("submit", this.state.listChoose);
        confirm({
            title: 'Bạn có muốn nộp bài?',
            content: 'làm nhanh thế',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            listChoose: []
        }
    }

    componentWillMount() {
        let {props} = this.props;
        this.props.fetchListExercise({topic_id: props.match.params.id});
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
                            <div className="row">
                                <div className="col">
                                    <div className="row answer-count-bar">
                                        <div className="col-md-2">TT</div>
                                        <div className="col-md-2">0</div>
                                        <div className="col-md-2">0</div>
                                        <div className="col-md-2">0</div>
                                        <div className="col-md-2">0</div>
                                    </div>
                                    <div className="row locker">
                                        <div className="col">
                                            {this.showListAnswer()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button className="row btn-submit-exam" onClick={this.onSubmitExam}>
                                Nộp bài
                            </Button>
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

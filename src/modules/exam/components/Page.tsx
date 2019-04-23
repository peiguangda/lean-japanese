import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {Anchor, BackTop, Button, Layout, Modal, PageHeader} from 'antd';
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {Question} from "./Question";
import {ExerciseEntity} from "../../../common/types/exercise";
import {convert, toArray} from "../../../helpers/Function";
import {remove} from 'lodash';
import {CardProgressEntity} from "../../../common/types/card_progress";

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
    listExercise: Array<ExerciseEntity>;
    listCardProgress: Array<CardProgressEntity>;

    fetchListExercise(parameters): void;

    fetchListCardProgress(parameters): void;

    editCardProgress(parameters): Promise<any>;
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
        let {listChoose} = this.state;
        let {listExercise, listCardProgress, editCardProgress, props} = this.props;
        let count = (number) => {
            let countNum = 0;
            listCardProgress && listCardProgress.map((cardProgress, index) => {
                if (cardProgress.box_num == number) countNum++;
            });
            return countNum;
        };
        console.log("e)", listExercise);
        let checkAnswer = (listChoose, listExercise) => {
            listChoose = listChoose.map((element, index) => {
                let listCorrectAnswer = {...listExercise[element.index]}.list_correct_answer;
                listCorrectAnswer = listCorrectAnswer && listCorrectAnswer.map((element, index) => {
                    element += 1;
                    return element;
                });
                if (listCorrectAnswer) listCorrectAnswer.push(0);
                console.log("element.listAnswer.sort()", element.listAnswer.sort());
                console.log("listCorrectAnswer.sort()", listCorrectAnswer.sort());
                let isCorrect = JSON.stringify(element.listAnswer.sort()) == JSON.stringify(listCorrectAnswer.sort());
                console.log(isCorrect);
                element.correct = isCorrect;
                element.id = listExercise[element.index].id;
                return element;
            })
        };
        confirm({
            title: 'Bạn có muốn nộp bài?',
            content: '',
            onOk() {
                listCardProgress = toArray(listCardProgress);
                checkAnswer(listChoose, listExercise);
                console.log("e)", listExercise);
                console.log("listChoose", listChoose);
                //duyet tung cau trong listCardProgress,truong hop boxnum = 0,3: chua tra loi hoac tra loi sai => neu lan nay tra loi dung => boxnum = 1, ko thi giu nguyen
                //truong hop boxnum = 1 tra loi dung thi boxnum = 2, sai thi quay ve 3
                //truong hop boxnum = 2 sai thi quay ve 3
                //progress = (soluong_box_num_1 = 1 * 0.5 + soluong_box_num_2 )/tong so cau *100%
                if (listCardProgress && listCardProgress.length) {
                    listCardProgress.map((cardProgress, index) => {
                        switch (cardProgress.box_num) {
                            case 0:
                            case 3:
                                listChoose.map((element, key) => {
                                    if (element.id == cardProgress.card_id && element.correct) {
                                        cardProgress.box_num = 1;
                                    } else cardProgress.box_num = 3;
                                });
                                break;
                            case 1:
                                listChoose.map((element, key) => {
                                    if (element.id == cardProgress.card_id && element.correct) {
                                        cardProgress.box_num = 2;
                                    } else cardProgress.box_num = 3;
                                });
                                break;
                            case 2:
                                listChoose.map((element, key) => {
                                    if (element.id == cardProgress.card_id && element.correct) {
                                        cardProgress.box_num = 4;
                                    } else cardProgress.box_num = 3;
                                });
                                break;
                            default:
                                cardProgress.box_num = 3;
                                break;
                        }
                        return cardProgress;
                    })
                }
                console.log("listCardProgress", listCardProgress);
                //tinh toan progress
                let countBoxNum1 = count(1);
                let countBoxNum2 = count(2);
                console.log("countBoxNum1", countBoxNum1);
                console.log("countBoxNum2", countBoxNum2);
                //update list Card Progress
                editCardProgress({id: 1, card_progress: listCardProgress})
                    .then(res => {
                        console.log("Res", res);
                    })
                //redirect to trang lesson detail
                console.log(props);
                console.log(props.history);
                props.history.push(`/lesson/${props.match.params.id}`);
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
        this.props.fetchListCardProgress({topic_id: props.match.params.id});
    }

    public render() {
        let {api, props, listExercise, listCardProgress} = this.props;
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

import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {Anchor, BackTop, Button, Layout, message, Modal, PageHeader} from 'antd';
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {Question} from "./Question";
import {ExerciseEntity} from "../../../common/types/exercise";
import {convert, toArray} from "../../../helpers/Function";
import {remove} from 'lodash';
import {CardProgressEntity} from "../../../common/types/card_progress";
import {getCookie, setCookie} from "../../../helpers/Cookie.js"
import {UserCourseEntity} from "../../../common/types/user_course";

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
    history: any,
    api: ApiEntity;
    listExercise: Array<ExerciseEntity>;
    listCardProgress: Array<CardProgressEntity>;
    userCourse: UserCourseEntity;
    currentUser: any;

    fetchListExercise(parameters): void;

    fetchListCardProgress(parameters): void;

    editCardProgress(parameters): Promise<any>;

    getUserCourse(parameters): void;

    getProfile(parameters): Promise<any>;

    fetchLesson(parameters): Promise<any>;

    createUserCourse(parameters): Promise<any>;
}

export interface State {
    value: number;
    listChoose: Array<any>;
    isJustDoExam: boolean;
    isShuffled: boolean;
    visible_submit_course: boolean;
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

    public shuffle = (arr) => {
        var i, j, temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    };

    public showListQuestion = () => {
        let {listExercise, props} = this.props;
        let {listChoose, isJustDoExam, isShuffled} = this.state;
        listExercise = isJustDoExam ? JSON.parse(localStorage.getItem("listExercise")) : listExercise;
        listExercise = convert(listExercise);
        let lengthExercise = listExercise.length;
        if (listExercise && listExercise.length) {
            return listExercise.map((ex, index) => {
                //doi vi tri dap an
                let list_answer_prev;
                if (ex.back_text) {
                    ex.list_answer.push(ex.back_text);
                    ex.list_correct_answer.push(ex.list_answer.length - 1);
                    ex.back_text = null;
                    console.log("push backtext to list answer");
                }
                //review ko dc dao dap an
                if (!isJustDoExam && !isShuffled) {
                    console.log("dao dap an");
                    list_answer_prev = [...ex.list_answer]; //copy index trc khi dao dap an
                    this.shuffle(ex.list_answer);      //dao dap an
                    //so sanh index sau khi dao vs trc khi dao, merge vao index list dap an dung
                    list_answer_prev.map((element_prev, index) => {
                        ex.list_answer.map((element_next, key) => {
                            // console.log("element_prev", element_prev);
                            // console.log("element_next", element_next);
                            // console.log("element_prev == element_next", element_prev == element_next);
                            if (element_prev == element_next) {
                                let position = ex.list_correct_answer.indexOf(index);
                                // console.log("position", position);
                                // console.log("index", index);
                                // console.log("key", key);
                                if (position > -1 && key > index) {
                                    //index dap an dung = current_index + index sau khi dao - index trc khi dao
                                    ex.list_correct_answer[position] = ex.list_correct_answer[position] + key - index;
                                }
                            }
                        })
                    })
                    this.setState({
                        isShuffled: true
                    })
                }
                //truyen list answer da chon vao de show cau hoi
                let objectAnswer = listChoose.find(object => object.index === index);
                return <Question
                    props={props}
                    exercise={ex}
                    index={index}
                    isReviewing={isJustDoExam}
                    isCorrect={objectAnswer ? objectAnswer.correct : null}
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
        let {listChoose, isJustDoExam} = this.state;
        if (isJustDoExam) return;
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
        let {isJustDoExam} = this.state;
        let result = [], listAnswer, className = "";
        if (selectedAnswer) listAnswer = selectedAnswer.listAnswer;
        let {list_answer, list_correct_answer} = exercise;
        if (list_answer) for (let i = 0; i < list_answer.length; i++) {
            // console.log("lit anser", listAnswer, listAnswer.indexOf(0), listAnswer.indexOf(1), listAnswer.indexOf(2));
            if (listAnswer && listAnswer.indexOf(i) > -1) {
                if (selectedAnswer.correct == false) className = 'choose-incorrect';
                else className = 'choose-correct';
            } else className = "";
            if (list_correct_answer.indexOf(i) > -1 && isJustDoExam) className = 'choose-correct';
            result.push(<Link href={`#${index}`} title={<Button
                className={`col-md-2 answer-btn ${className}`}
                key={i}
                onClick={() => this.onChooseAnswer(i, index)}>{this.getValue(i)}</Button>}></Link>);
        }
        return result;
    }
    public showListAnswer = () => {
        let {listChoose, isJustDoExam} = this.state;
        let {listExercise, props} = this.props;
        listExercise = isJustDoExam ? JSON.parse(localStorage.getItem("listExercise")) : listExercise;
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
        let checkAnswer = (listChoose, listExercise) => {
            listChoose = listChoose.map((element, index) => {
                let listCorrectAnswer = {...listExercise[element.index]}.list_correct_answer;
                let isCorrect = JSON.stringify(element.listAnswer.sort()) == JSON.stringify(listCorrectAnswer.sort());
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
                                    if (element.id == cardProgress.card_id) {
                                        if (element.correct) {
                                            cardProgress.box_num = 1;
                                            cardProgress.progress = 33;
                                        } else {
                                            cardProgress.box_num = 3;
                                            cardProgress.progress = 0;
                                        }
                                    }
                                });
                                break;
                            case 1:
                                listChoose.map((element, key) => {
                                    if (element.id == cardProgress.card_id) {
                                        if (element.correct) {
                                            cardProgress.box_num = 2;
                                            cardProgress.progress = 66;
                                        } else {
                                            cardProgress.box_num = 3;
                                            cardProgress.progress = 0;
                                        }
                                    }
                                });
                                break;
                            case 2:
                                listChoose.map((element, key) => {
                                    if (element.id == cardProgress.card_id) {
                                        if (element.correct) {
                                            cardProgress.box_num = 4;
                                            cardProgress.progress = 100;
                                        } else {
                                            cardProgress.box_num = 3;
                                            cardProgress.progress = 0;
                                        }
                                    }
                                });
                                break;
                            default:
                                cardProgress.box_num = 3;
                                cardProgress.progress = 0;
                                break;
                        }
                        return cardProgress;
                    })
                }
                //tinh toan progress
                //update list Card Progress
                editCardProgress({id: 1, card_progress: listCardProgress})
                    .then(res => {
                        //redirect to trang lesson detail
                        localStorage.setItem("isJustDoExam", "TRUE");
                        localStorage.setItem("listExercise", JSON.stringify(listExercise));
                        setCookie("listChoose", listChoose);
                        props.history.push(`/lesson/${props.match.params.id}`);
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
        setCookie("listExercise", listExercise);
    }

    public handleOkSubmitCourse = async (e) => {
        console.log("dang ki khoa hoc", this.props);
        let lesson = await this.props.fetchLesson({id: this.props.match.params.id});
        if (lesson.status != "success") return;
        lesson = lesson.data;
        this.props.createUserCourse({course_id: lesson.course_id})
            .then(res => {
                if (res && res.status == "success") {
                    message.success("Tham gia khóa học, chúc bạn có những bài học tuyệt vời!");
                    this.setState({
                        visible_submit_course: false
                    })
                } else message.error("Xảy ra lỗi khi tham gia khóa học~");
            })
    };

    public handleCancelSubmitCourse = (e) => {
        this.props.history.push(`/`);
        //di chuyen ve trang home
    };

    public requestLogin = () => {
        message.info("Hãy đăng nhập để được sử dụng tính năng này!");
        this.props.history.push(`/`);
    }

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible_submit_course: false,
            listChoose: (localStorage.getItem("isJustDoExam") == "TRUE") ? convert(JSON.parse(getCookie("listChoose"))) : [],
            isJustDoExam: (localStorage.getItem("isJustDoExam") == "TRUE") ? true : false,
            isShuffled: false
        }
    }

    async componentWillMount() {
        let {props} = this.props;
        let user, exList, userCourse;
        user = await this.props.getProfile({});
        exList = await this.props.fetchListExercise({
            topic_id: props.match.params.id,
            setting_number_question_for_exam: localStorage.getItem("setting_number_question_for_exam")
        });
        console.log("exList", exList);
        userCourse = await this.props.getUserCourse({user_id: user.data.id, course_id: exList.data[0].course_id});
        this.props.fetchListCardProgress({topic_id: props.match.params.id});
        this.setState({
            visible_submit_course: Object.keys(userCourse.data).length == 0 ? true : false
        });
    }

    componentDidMount() {
        window.onbeforeunload = (event) => {
            event.preventDefault();
            return 'Bạn đang làm bài, có muốn thoát khi chưa nộp bài?';
        };
    }

    public render() {
        let {api, props, listExercise, listCardProgress, userCourse, currentUser} = this.props;
        let {match: {params}} = this.props;
        let {isJustDoExam} = this.state;
        console.log("currentUser", currentUser && currentUser.responseError ? true : false);
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
                    {currentUser && currentUser.responseError ? this.requestLogin() : ""}
                    <Modal
                        title="Bạn chưa đăng kí tham gia khóa học"
                        visible={this.state.visible_submit_course}
                        onOk={this.handleOkSubmitCourse}
                        onCancel={this.handleCancelSubmitCourse}
                    >
                        <p>Đăng kí tham gia khóa học?</p>
                    </Modal>
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
                            <Button className="row btn-submit-exam"
                                    disabled={isJustDoExam}
                                    onClick={this.onSubmitExam}>
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

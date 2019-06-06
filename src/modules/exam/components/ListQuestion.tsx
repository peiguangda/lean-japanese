import * as React from "react";
import {Fragment} from "react";
import {Question} from "./Question";
import {ExerciseEntity} from "../../../common/types/exercise";
import {convert, toArray} from "../../../helpers/Function";
import {CardProgressEntity} from "../../../common/types/card_progress";

export interface Props {
    props: any,
    listExercise: Array<ExerciseEntity>;
    listCardProgress: Array<CardProgressEntity>;
    currentUser: any;
    listChoose: Array<any>;
    isSubmitVideoScript: boolean;

    updateListChoose(parameters): void;
}

export interface State {
    value: number;
    listChoose: Array<any>;
    isJustDoExam: boolean;
    isShuffled: boolean;
    visible_submit_course: boolean;
}

export class ListQuestion extends React.Component<Props, State, {}> {
    public updateListChoose = (parameters) => {
        this.props.updateListChoose(parameters);
    };

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
        let {listExercise, props, listCardProgress, children, isSubmitVideoScript} = this.props;
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
                }
                //review ko dc dao dap an
                if (!isJustDoExam && !isShuffled) {
                    list_answer_prev = [...ex.list_answer]; //copy index trc khi dao dap an
                    this.shuffle(ex.list_answer);      //dao dap an
                    //so sanh index sau khi dao vs trc khi dao, merge vao index list dap an dung
                    list_answer_prev.map((element_prev, index) => {
                        ex.list_answer.map((element_next, key) => {
                            if (element_prev == element_next) {
                                let position = ex.list_correct_answer.indexOf(index);
                                if (position > -1 && key > index) {
                                    //index dap an dung = current_index + index sau khi dao - index trc khi dao
                                    ex.list_correct_answer[position] = ex.list_correct_answer[position] + key - index;
                                }
                            }
                        })
                    });
                    this.setState({
                        isShuffled: true
                    })
                }
                //truyen list answer da chon vao de show cau hoi
                let objectAnswer = listChoose.find(object => object.index === index);
                let cardProgress = toArray(listCardProgress).find(object => object.card_id.toString() === ex.id);
                return <Question
                    props={props}
                    exercise={ex}
                    index={index}
                    cardProgress={cardProgress}
                    isReviewing={isJustDoExam}
                    isCorrect={objectAnswer ? objectAnswer.correct : null}
                    lengthExercise={lengthExercise}
                    listAnswer={objectAnswer ? objectAnswer.listAnswer : []}
                    backText={objectAnswer ? objectAnswer.backText : ""}
                    updateListChoose={this.updateListChoose}
                    children={children}
                    isSubmitVideoScript={isSubmitVideoScript}
                />
            })
        }
    };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.listChoose) this.setState({
            listChoose: nextProps.listChoose
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible_submit_course: false,
            listChoose: [],
            isJustDoExam: (localStorage.getItem("isJustDoExam") == "TRUE") ? true : false,
            isShuffled: false
        }
    }

    public render() {
        let {props, children, listExercise} = this.props;
        return (
            <Fragment>
                <div className={`${children == "EXAM_MODAL" ? 'col-md-7 offset-1 exam-modal-scroll' : 'col-md-9'}`}>
                    {this.showListQuestion()}
                </div>
            </Fragment>
        );
    }
}

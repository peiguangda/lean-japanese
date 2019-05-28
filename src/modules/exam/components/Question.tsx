import * as React from "react";
import {Fragment} from "react";
import {Button, Checkbox, Col, Input, Radio, Row, Tooltip} from 'antd';
import {ExerciseEntity} from "../../../common/types/exercise";
import ReactPlayer from 'react-player';
import {CardProgressEntity} from "../../../common/types/card_progress";
import {toArray} from "../../../helpers/Function";

const RadioGroup = Radio.Group;

export interface Props {
    props: any,
    exercise: ExerciseEntity;
    index: number;
    lengthExercise: number;
    listAnswer: Array<number>;
    isCorrect: boolean;
    isReviewing: boolean;
    cardProgress: CardProgressEntity;
    backText: string;

    updateListChoose(parameters): void;
}

export interface State {
    value: number;
    inputFillText: string;
}

export class Question extends React.Component<Props, State, {}> {
    public onChangeCheckBox = (e, index) => {
        this.props.updateListChoose({index: index, listAnswer: e});
    }
    public isAnswerCorrect = (index) => {
        let {exercise} = this.props;
        let {list_answer, list_correct_answer} = exercise;
        return (list_correct_answer && list_correct_answer.indexOf(index) > -1) ? true : false;
    }
    public onChangeTextFillGame = (e, index) => {
        this.setState({
            inputFillText: e.target.value
        })
        this.props.updateListChoose({index: index, backText: e.target.value.toLowerCase()});
    }
    public showListAnswer = (index) => {
        let {exercise, listAnswer, isReviewing, isCorrect, backText, children} = this.props;
        let {inputFillText} = this.state;
        let {list_answer, list_correct_answer} = exercise, className = "";
        if (list_answer && list_answer.length && list_answer.length > 1) return list_answer.map((answer, index) => {
            if (listAnswer && listAnswer.indexOf(index) > -1) {
                if (isCorrect == false) className = 'choose-incorrect';
                else if (isCorrect == true) className = 'choose-correct';
                else className = "";
            } else className = "";
            if (list_correct_answer.indexOf(index) > -1 && isReviewing) className = 'choose-correct';
            return <Col span={24}
                        className={className}>
                <Checkbox
                    value={index}
                    disabled={isReviewing}
                    checked={(listAnswer.indexOf(index) > -1) ? true : false}>
                    {answer}
                </Checkbox>
            </Col>
        })
        else if (list_answer.length == 1) {
            return <Input className={isReviewing ? (!isCorrect ? 'choose-incorrect' : 'choose-correct') : ""}
                          value={isReviewing ? backText : inputFillText}
                          disabled={isReviewing}
                          onChange={(e) => this.onChangeTextFillGame(e, index)} placeholder="Điền từ..."/>;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            value: -2,
            inputFillText: ""
        }
    }

    componentWillMount() {
    }

    public render() {
        let {props, exercise, index, lengthExercise, listAnswer, cardProgress, children} = this.props;
        let list_card_id = toArray(props.params.list_card_id);
        if (children == "EXAM_MODAL" && list_card_id && list_card_id.indexOf(exercise.id.toString()) <= -1) return "";
        else return (
            <Fragment>
                <div id={`${index}`}>

                    <p className="row ml-1 exam-title">{`Câu ${index + 1}/${lengthExercise} ${children != "EXAM_MODAL" ? `- Lần cuối trả lời${cardProgress && cardProgress.last_result == 0 ? " sai" : " đúng"}` : ""}`}</p>
                    <div className="row mr-1 mb-5 list-exam">
                        <div className="col w-100 ml-3">
                            {/*-----------------------------Chi tiet cau hoi---------------------------------------*/}
                            <p className="row mt-3">{exercise.front_text}</p>
                            <ReactPlayer className="row w-100 exam-mp3"
                                         url={exercise.front_sound}
                                         controls={true}/>
                            <div className="row">
                                <Checkbox.Group style={{width: '100%'}}
                                                onChange={(e) => this.onChangeCheckBox(e, index)}
                                                value={listAnswer}>
                                    <Row>
                                        {this.showListAnswer(index)}
                                    </Row>
                                </Checkbox.Group>
                            </div>
                            {/*------------------cac nut binh luan bookmark cac kieu---------------------------------*/}
                            {children != "EXAM_MODAL" && <div className="row float-right m-2 list-support-btn">
                                <Tooltip placement="top" title={"Bình luận"}>
                                    <Button icon="message" className="exam-btn"/>
                                </Tooltip>
                                <Tooltip placement="top" title={"Bookmark"}>
                                    <Button icon="pushpin" className="exam-btn"/>
                                </Tooltip>
                                <Tooltip placement="top" title={"Ghi chú"}>
                                    <Button icon="tag" className="exam-btn"/>
                                </Tooltip>
                                <Tooltip placement="top" title={"Phản hồi"}>
                                    <Button icon="highlight" className="exam-btn"/>
                                </Tooltip>
                                <Tooltip placement="top" title={"Bỏ qua"}>
                                    <Button icon="eye-invisible" className="exam-btn"/>
                                </Tooltip>
                            </div>}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

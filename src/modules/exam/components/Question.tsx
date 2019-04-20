import * as React from "react";
import {Fragment} from "react";
import {Button, Checkbox, Col, Radio, Row, Tooltip} from 'antd';
import {ExerciseEntity} from "../../../common/types/exercise";

const RadioGroup = Radio.Group;

export interface Props {
    props: any,
    exercise: ExerciseEntity;
    index: number;
    lengthExercise: number;
    listAnswer: Array<number>;

    updateListChoose(parameters): void;
}

export interface State {
    value: number;
}

export class Question extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            value: -2,
        }
    }

    componentWillMount() {
    }

    public onChangeCheckBox = (e, index) => {
        this.props.updateListChoose({index: index, listAnswer: e});
    }
    public isAnswerCorrect = (index) => {
        let {exercise} = this.props;
        let {list_answer, list_correct_answer} = exercise;
        return (list_correct_answer && list_correct_answer.indexOf(index) > -1) ? true : false;
    }
    public showListAnswer = () => {
        let {exercise} = this.props;
        let {listAnswer} = this.props;
        let {list_answer, list_correct_answer} = exercise;
        if (list_answer && list_answer.length) return list_answer.map((answer, index) => {
            return <Col span={24}>
                <Checkbox
                    value={index + 1}
                    checked={(listAnswer.indexOf(index + 1) > -1) ? true : false}>
                    {answer}
                </Checkbox>
            </Col>
        })
    }

    public render() {
        let {props, exercise, index, lengthExercise, listAnswer} = this.props;
        return (
            <Fragment>
                <div id={`${index}`}>
                    <p className="row ml-1 exam-title">{`Câu ${index + 1}/${lengthExercise} - Lần cuối trả lời sai`}</p>
                    <div className="row mr-1 mb-5 list-exam">
                        <div className="col w-100 ml-3">
                            {/*-----------------------------Chi tiet cau hoi---------------------------------------*/}
                            <p className="row mt-3">{exercise.front_text}</p>
                            <div className="row">
                                <Checkbox.Group style={{width: '100%'}}
                                                onChange={(e) => this.onChangeCheckBox(e, index)}
                                                value={listAnswer}>
                                    <Row>
                                        <Col span={24}>
                                            <Checkbox value={0}
                                                      checked={(listAnswer.indexOf(0) > -1) ? true : false}>
                                                {exercise.back_text}
                                            </Checkbox>
                                        </Col>
                                        {this.showListAnswer()}
                                    </Row>
                                </Checkbox.Group>
                            </div>
                            {/*------------------cac nut binh luan bookmark cac kieu---------------------------------*/}
                            <div className="row float-right m-2 list-support-btn">
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
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

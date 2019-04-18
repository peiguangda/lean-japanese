import * as React from "react";
import {Fragment} from "react";
import {Button, Radio, Tooltip} from 'antd';
import {ExerciseEntity} from "../../../common/types/exercise";

const RadioGroup = Radio.Group;

export interface Props {
    props: any,
    exercise: ExerciseEntity;
    index: number;
    lengthExercise: number;
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

    public onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    public isAnswerCorrect = (index) => {
        let {exercise} = this.props;
        let {list_answer, list_correct_answer} = exercise;
        return (list_correct_answer && list_correct_answer.indexOf(index) > -1) ? true : false;
    }

    public showListAnswer = () => {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let {exercise} = this.props;
        let {list_answer, list_correct_answer} = exercise;
        if (list_answer) return list_answer.map((answer, index) => {
            return <Radio style={radioStyle} value={index}>{answer}</Radio>;
        })
    }

    public render() {
        let {props, exercise, index, lengthExercise} = this.props;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <Fragment>
                <p className="row ml-1 exam-title">{`Câu ${index + 1}/${lengthExercise} - Lần cuối trả lời sai`}</p>
                <div className="row mr-1 mb-5 list-exam">
                    <div className="col w-100 ml-3">
                        <p className="row mt-3">{exercise.front_text}</p>
                        <div className="row">
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio style={radioStyle} value={-1}>{exercise.back_text}</Radio>
                                {this.showListAnswer()}
                            </RadioGroup>
                        </div>
                        <div className="row float-right m-2">
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
            </Fragment>
        );
    }
}

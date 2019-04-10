import * as React from "react";
import {message} from 'antd';
import {ExerciseEntity} from "../../../../../common/types/exercise";
import {toArray} from "../../../../../helpers/Function";

export interface Props {
    exercise: ExerciseEntity;
    index: number;

    showModal(parameters): void;

    deleteExercise(parameters): void;

    editExercise(parameters): Promise<any>;

    fetchListExercise(parameters): void;
}

export interface State {

}

export class Exercise extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);

    }

    public confirm(params) {
        this.props.deleteExercise(params);
    }

    public cancel(e) {
        message.error('Click on No');
    }

    public showListAnswer = () => {
        let {exercise} = this.props;
        let {list_answer, list_correct_answer} = exercise;
        if (list_answer) return toArray(list_answer).map((answer, index) => {
            return <p className="row">{answer}</p>;
        })
    }

    public render() {
        let {exercise, index} = this.props;
        return (
            <div className="row border-exercise" onClick={() => this.props.showModal(exercise)}>
                <div className="col-md-6 mt-3">
                    {`Câu ${index + 1} : ${exercise.front_text}`}
                </div>
                <div className="col-md-5 mt-3 ml-3">
                    <p className="row">{exercise.back_text}</p>
                    {exercise.list_answer ? this.showListAnswer() : ""}
                </div>

                {/*<Popconfirm*/}
                {/*    title="Bạn có chắc chắn muốn xóa câu hỏi này?"*/}
                {/*    onConfirm={() => this.confirm({exercise: exercise})}*/}
                {/*    onCancel={this.cancel}*/}
                {/*    okText="Yes"*/}
                {/*    cancelText="No"*/}
                {/*>*/}
                {/*    <Button type="primary" className="small_button" icon="close"/>*/}
                {/*</Popconfirm>*/}
            </div>
        );
    }
}

import * as React from "react";
import {message} from 'antd';
import {ExerciseEntity} from "../../../../../common/types/exercise";
import {toArray} from "../../../../../helpers/Function";

export interface Props {
    exercise: ExerciseEntity;

    deleteExercise(parameters): void;

    // editExercise(parameters): Promise<any>;
}

export interface State {
    visible: boolean
}

export class Exercise extends React.Component<Props, State, {}> {
    public onClickEdit = () => {
        this.setState({
            visible: true
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    //
    // public _editExercise = params =>{
    //     this.props.editExercise(params)
    //         .then(response => {
    //             if(response && response.status == "success")
    //             {
    //                 message.success('Successful!');
    //                 this.props.fetchListExercise({topic_id: params.topic_id});
    //             }
    //         })
    // }

    public confirm(params) {
        this.props.deleteExercise(params);
    }

    public cancel(e) {
        message.error('Click on No');
    }

    public showListAnswer = () => {
        let {exercise} = this.props;
        console.log(exercise);
        let {list_answer, list_correct_answer} = exercise;
        console.log(list_answer);
        if (list_answer) return toArray(list_answer).map((answer, index) => {
            return <p className="row">{answer}</p>;
        })
    }

    public render() {
        let {exercise} = this.props;
        console.log("exxxxxxxxx", exercise);
        return (
            <div className="row border-exercise">
                <div className="col-md-6 mt-3">
                    {`Câu ${exercise.id} : ${exercise.front_text}`}
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

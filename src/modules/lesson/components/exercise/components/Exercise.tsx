import * as React from "react";
import {Button, Card, message, Popconfirm} from 'antd';
import {Link} from "react-router-dom";
import {ExerciseEntity} from "../../../../../common/types/exercise";


export interface Props {
    exercise: ExerciseEntity;

    // fetchListExercise(parameters): void
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
    }

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

    public render() {
        let {exercise} = this.props;
        return (
            <Card style={{width: 1000}}>
                <div className="row">
                    <div className="col-md-8">
                        <Link to={exercise ? `exercises/${exercise.id}` : "/"}><p>{exercise.code}</p></Link>
                    </div>
                    <div className="col-md-4">
                        <Button
                            type="primary"
                            className="small_button"
                            icon="edit"
                            onClick={() => this.onClickEdit()}
                        />

                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa câu hỏi này?"
                            onConfirm={() => this.confirm({exercise: exercise})}
                            onCancel={this.cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" className="small_button" icon="close"/>
                        </Popconfirm>
                    </div>
                </div>
            </Card>
        );
    }
}

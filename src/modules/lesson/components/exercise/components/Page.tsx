import * as React from "react";
import {Exercise} from './Exercise';
import {ExerciseEntity} from "../../../../../common/types/exercise";
import {message} from "antd";
import {convert} from "../../../../../helpers/Function";
import {ExerciseEditModal} from "../../../../modal/exercise/components/ExerciseEditModal";

export interface Props {
    listExercise: ExerciseEntity[];
    props: any;
    params: any;

    fetchListExercise(parameters): void;

    deleteExercise(parameters): Promise<any>;

    editExercise(parameters): Promise<any>;
}

export interface State {
    visible: boolean
    editExercise: ExerciseEntity;
}

export class ListExercise extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            editExercise: new class implements ExerciseEntity {
                actionType: string;
                back_hint: string;
                back_image: string;
                back_sound: string;
                back_text: string;
                code: string;
                course_id: number;
                difficulty_level: number;
                front_hint: string;
                front_image: string;
                front_sound: string;
                front_text: string;
                has_child: number;
                id: string;
                list_answer: Array<string>;
                list_correct_answer: Array<number>;
                order_index: number;
                parent_id: number;
                shuffle_answer: number;
                status: number;
                topic_id: number;
                user_id: number;
            }
        }
    }

    componentWillMount() {
        let {props} = this.props;
        this.props.fetchListExercise({topic_id: props.params.id});
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        let {props} = this.props;
        if (nextProps.params.id != props.params.id)
            this.props.fetchListExercise({topic_id: nextProps.params.id});
    }

    public _deleteExercise = params => {
        this.props.deleteExercise({id: params.exercise.id})
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchListExercise({topic_id: params.exercise.topic_id});
                }
            })
    };
    public _editExercise = params => {
        this.props.editExercise(params)
            .then(response => {
                console.log("res", response);
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchListExercise({topic_id: params.topic_id});
                }
            })
    }
    public showModal = (parameters) => {
        this.setState({
            visible: true,
            editExercise: parameters
        });
    };
    public closeModal = () => {
        this.setState({
            visible: false
        });
    };
    private showListExercise = () => {
        let {listExercise} = this.props;
        listExercise = convert(listExercise);
        if (listExercise && listExercise.length) {
            return listExercise.map((item, index) => {
                return <Exercise
                    exercise={item}
                    index={index}
                    deleteExercise={this._deleteExercise}
                    fetchListExercise={this.props.fetchListExercise}
                    editExercise={this.props.editExercise}
                    showModal={this.showModal}
                />;
            });
        }
    };

    public render() {
        let {children, listExercise, props} = this.props;
        let {visible, editExercise} = this.state;
        let list = [];
        list.push(editExercise);

        return (
            <div>
                {this.showListExercise()}
                <ExerciseEditModal
                    closeModal={this.closeModal}
                    visible={visible}
                    title={"Sửa câu hỏi"}
                    action="edit"
                    editExercise={this._editExercise}
                    topic_id={props.params.id}
                    exercise={list}
                />
            </div>
        );
    }
}

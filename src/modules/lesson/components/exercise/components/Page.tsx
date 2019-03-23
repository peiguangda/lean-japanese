import * as React from "react";
import {Helmet} from "react-helmet";
import {Exercise} from './Exercise';
import {ExerciseEntity} from "../../../../../common/types/exercise";
import {message} from "antd";

export interface Props {
    fetchListExercise(parameters): void;

    deleteExercise(parameters): Promise<any>;

    listExercise: ExerciseEntity[];
}

export interface State {
}

export class ListExercise extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let {children} = this.props;
        this.props.fetchListExercise({topic_id: children["id"]});
    }

    public _deleteExercise = params => {
        this.props.deleteExercise({id: params.exercise.id})
            .then(response => {
                console.log("response", response);
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchListExercise({topic_id: params.exercise.topic_id});
                }
            })
    }

    private showListExercise = () => {
        let {listExercise} = this.props;
        if (listExercise && listExercise.length) {
            return listExercise.map((item, index) => {
                return <Exercise exercise={item} key={index} deleteExercise={this._deleteExercise}/>;
            });
        }
    }

    public render() {
        return (
            <div className="row offset-1">
                {this.showListExercise()}
            </div>
        );
    }
}

import * as React from "react";
import {Helmet} from "react-helmet";
import {Exercise} from './Exercise';
import {ExerciseEntity} from "../../../../../common/types/exercise";
import {message} from "antd";
import {toArray} from "../../../../../helpers/Function";

export interface Props {
    listExercise: ExerciseEntity[];

    fetchListExercise(parameters): void;

    deleteExercise(parameters): Promise<any>;
}

export interface State {
}

export class ListExercise extends React.Component<Props, State, {}> {
    public _deleteExercise = params => {
        this.props.deleteExercise({id: params.exercise.id})
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchListExercise({topic_id: params.exercise.topic_id});
                }
            })
    }
    private showListExercise = () => {
        let {listExercise} = this.props;
        listExercise = toArray(listExercise);
        if (listExercise && listExercise.length) {
            return listExercise.map((item, index) => {
                return <Exercise exercise={item} key={index} deleteExercise={this._deleteExercise}/>;
            });
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let {children} = this.props;
        this.props.fetchListExercise({topic_id: children["id"]});
    }

    public render() {
        return (
            <div className="row offset-1">
                {this.showListExercise()}
            </div>
        );
    }
}

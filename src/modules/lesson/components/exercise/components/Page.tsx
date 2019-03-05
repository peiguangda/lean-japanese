import * as React from "react";
import {Helmet} from "react-helmet";
import "../../../../../public/css/custom.scss";
import {Modal, Button} from 'antd';
import {Exercise} from './Exercise';

export interface Props {
}

export interface State {
    title: Array<string>
}

export class ListExercise extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            title: ["Exercise 1", "Exercise 2", "Exercise 3","Exercise 4","Exercise 5","Exercise 6","Exercise 7","Exercise 8"]
        }
    }

    private showListExercise = () => {
        let result = [];
        this.state.title.map((item, index) => {
            result.push(<Exercise children={item}/>);
        });
        return result;
    }

    public render() {
        return (
            <div className="row container offset-2 mt-5">
                {this.showListExercise()}
            </div>
        );
    }
}

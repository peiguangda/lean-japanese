import * as React from "react";
import {Helmet} from "react-helmet";
import "../../../../../public/css/custom.scss";
import {Modal, Button} from 'antd';
import {Lesson} from './Lesson';

export interface Props {
}

export interface State {
    title: Array<string>
}

export class ListLesson extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            title: ["aaaaaaaaaa", "bbbbbbbbbb", "cccccccccccc"]
        }
    }

    private showListLesson = () => {
        let result = [];
        this.state.title.map((item, index) => {
            result.push(<Lesson children={item}/>);
        });
        return result;
    }

    public render() {
        return (
            <div className="row container offset-2 mt-5">
                {this.showListLesson()}
            </div>
        );
    }
}

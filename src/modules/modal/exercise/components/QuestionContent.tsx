import * as React from "react";
import {Fragment} from "react";
import {Layout, Popover, Button, Icon, Input, Card, Checkbox} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";
import {QuestionTypeSetting} from "../../setting/components/QuestionTypeSetting";
import {ListAnswer} from "./ListAnswer";

const {
    Content,
} = Layout;

export interface Props {
    onchangeSetting(): void;

    addAnswer(): void;

    deleteAnswer(): void;

    isShowSetting: boolean;
    numberAnswer: number;
    visible: boolean;
}

export interface State {
    exercise: ExerciseEntity;
}

export class QuestionContent extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            exercise: new class implements ExerciseEntity {
                id: string;
                user_id: number;
                course_id: number;
                topic_id: number;
                order_index: number;
                difficulty_level: number;
                has_child: number;
                parent_id: number;
                status: number;
                code: string;
                shuffle_anser: number;
                front_text: string;
                front_image: string;
                front_sound: string;
                front_hint: string;
                back_text: string;
                back_image: string;
                back_sound: string;
                back_hint: string;
            },
        }
    }

    public handleAddInputRow = (e) => {
        console.log("e", e);
    }

    public onchangeSetting = () => {
        this.props.onchangeSetting();
    }

    public addAnswer = () => {
        this.props.addAnswer();
    }

    public deleteAnswer = () => {
        this.props.deleteAnswer();
    }

    public onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    public render() {
        const contentAnswer = <div className="col">
            <Button className="row w-100" type="dashed" onClick={this.addAnswer}>Thêm đáp án</Button>
            <Button className="row w-100" type="dashed">Thêm ảnh</Button>
            <Button className="row w-100" type="dashed">Thêm âm thanh</Button>
            <Button className="row w-100" type="dashed">Thêm giải thích</Button>
            <Button className="row w-100" type="dashed">Set đáp án sai</Button>
        </div>
        const contentQuestion = <div className="col">
            <Button className="row w-100" type="dashed">Thêm ảnh</Button>
            <Button className="row w-100" type="dashed">Thêm âm thanh</Button>
            <Button className="row w-100" type="dashed">Thêm giải thích</Button>
        </div>
        const suffixQuestion = <Popover content={contentQuestion} title="Mở rộng" trigger="hover"><Icon
            type="ordered-list"/></Popover>
        const suffixAnswer = <Popover content={contentAnswer} title="Mở rộng" trigger="hover"><Icon
            type="ordered-list"/></Popover>

        return (
            <Fragment>
                <Content>
                    <div className="row question-content">
                        <div className="col-md-5 ml-2">
                            <div className="row">
                                <p className="title-custom">Câu hỏi</p>
                                <Input
                                    className="input-question"
                                    suffix={suffixQuestion}
                                    size="large"
                                />
                            </div>
                            <div className="row">
                                <p className="title-custom">Url sound</p>
                                <Input
                                    className="input-question"
                                    size="large"
                                />
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <p className="setting-title">Cài đặt câu hỏi</p>
                                    <QuestionTypeSetting
                                        visible={this.props.isShowSetting}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <p className="setting-title">Cài đặt khác</p>
                                    <Checkbox onChange={() => this.onChange}>Đảo đáp án</Checkbox>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-10">
                                    <p className="title-custom">Đáp án đúng</p>
                                    <Input
                                        className="input-question"
                                        suffix={suffixAnswer}
                                        size="large"
                                    />
                                </div>
                                <div className="col-md-10">
                                    <p className="title-custom">Url sound</p>
                                    <Input
                                        className="input-question"
                                        size="large"
                                    />
                                </div>
                                <div className="col-md-10">
                                    <ListAnswer
                                        number={this.props.numberAnswer}
                                        addAnswer={this.addAnswer}
                                        deleteAnswer={this.deleteAnswer}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </Fragment>
        );
    }
}

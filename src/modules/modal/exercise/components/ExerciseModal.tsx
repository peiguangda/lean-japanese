import * as React from "react";
import {Fragment} from "react";
import {Modal, Layout, Popover, Button, Icon, Input, Card} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";
import {QuestionTypeSetting} from "../../setting/components/QuestionTypeSetting";
import {ListAnswer} from "./ListAnswer";
import {ListQuestion} from "./ListQuestion";
import {Answer} from "./Answer";

const {
    Sider, Content,
} = Layout;

export interface Props {
    closeModal(): void;
    showModal(): void;
    title: string;
    visible: boolean;
}

export interface State {
    loading: boolean;
    exercise: ExerciseEntity;
    isShowSetting: boolean;
}

export class ExerciseModal extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            isShowSetting: false,
            loading: false,
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

    public showModal = () => {
        this.props.showModal();
    }

    public handleCancel = (e) => {
        console.log("cancel");
        this.props.closeModal();
    }

    public handleOk = (e) => {
        console.log("ok man!");
        this.props.closeModal();
    }

    public handleAddInputRow = (e) => {
        console.log("e", e);
    }

    public onchangeSetting = () => {
        let {isShowSetting} = this.state;
        console.log(isShowSetting);
        this.setState({
            isShowSetting: !isShowSetting
        })
    }

    public render() {
        const content = <div className="col">
            <Button className="row w-100" type="dashed" onClick={this.handleAddInputRow}>Dashed</Button>
            <Button className="row w-100" type="dashed">Dashed</Button>
            <Button className="row w-100" type="dashed">Dashed</Button>
        </div>
        const suffixQuestion = <Popover content={content} title="Mở rộng" trigger="hover"><Icon
            type="ordered-list"/></Popover>

        return (
            <Fragment>
                <Modal
                    className="modal-create-question"
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Layout>
                        <Layout>
                            <Sider>
                                <div className="nav_question">
                                    <Card title="Tất cả các câu hỏi">
                                        <div className="question_items">
                                            <ListQuestion/>
                                            <div className="row">
                                                <Button className="col-md-2" type="dashed" icon="plus"></Button>
                                                <Button className="col-md-10" type="ghost" icon="import">Thêm từ thư
                                                    viện</Button>
                                            </div>
                                            <Button className="row" type="default" icon="setting" onClick={this.onchangeSetting}>Cài đặt</Button>
                                        </div>
                                    </Card>
                                    <div className="question_items">
                                        <p className="setting-title mt-2">Cài đặt tất cả câu hỏi</p>
                                        <QuestionTypeSetting
                                            visible={this.state.isShowSetting}
                                        />
                                    </div>
                                </div>
                            </Sider>
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
                                                    visible={this.state.isShowSetting}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <p className="setting-title">Other Setting</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div>
                                            <p className="title-custom">Đáp án đúng</p>
                                            <Input
                                                className="input-question"
                                                suffix={suffixQuestion}
                                                size="large"
                                            />
                                        </div>
                                        <div>
                                            <p className="title-custom">Url sound</p>
                                            <Input
                                                className="input-question"
                                                size="large"
                                            />
                                        </div>
                                        <div>
                                            <ListAnswer/>
                                        </div>
                                    </div>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Modal>
            </Fragment>
        );
    }
}

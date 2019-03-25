import * as React from "react";
import {Helmet} from "react-helmet";
import {Fragment} from "react";
import {Modal, Layout, Card, Button, Icon, Checkbox, Input} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";

const {
    Sider, Content,
} = Layout;

const CheckboxGroup = Checkbox.Group;

const quetionOptions = ['Chọn đáp án', 'Điền từ', 'Lật mặt', 'Phát âm'];
const defaultCheckedList = ['Chọn đáp án', 'Lật mặt'];

export interface Props {
    // fetchLessons(parameters): void;
    // handleLesson(parameters): void;
    closeModal(): void;

    showModal(): void;

    // exercise: ExerciseEntity;
    title: string;
    visible: boolean;
    // course_id: number;
}

export interface State {
    loading: boolean;
    exercise: ExerciseEntity;
    checkedList: Array<string>;
    indeterminate: boolean;
    checkAll: boolean;
}

export class ExerciseModal extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
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
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
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

    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < quetionOptions.length),
            checkAll: checkedList.length === quetionOptions.length,
        });
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? quetionOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }

    public render() {
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
                                            <p>Câu hỏi 1</p>
                                            <p>Câu hỏi 2</p>
                                            <p>Câu hỏi 3</p>
                                            <div className="row">
                                                <Button className="col-md-2" type="dashed" icon="plus"></Button>
                                                <Button className="col-md-10" type="ghost" icon="import">Thêm từ thư
                                                    viện</Button>
                                            </div>
                                            <Button className="row" type="default" icon="setting"></Button>
                                        </div>
                                    </Card>
                                    <div className="question_items">
                                        <div>
                                            <p className="setting-title mt-2">Cài đặt tất cả câu hỏi</p>
                                            <Checkbox
                                                indeterminate={this.state.indeterminate}
                                                onChange={this.onCheckAllChange}
                                                checked={this.state.checkAll}
                                            >
                                                Check all
                                            </Checkbox>
                                        </div>
                                        <br/>
                                        <CheckboxGroup className="inline-grid" options={quetionOptions}
                                                       value={this.state.checkedList}
                                                       onChange={this.onChange}/>
                                    </div>
                                </div>
                            </Sider>
                            <Content>
                                <div className="row question-content">
                                    <div className="col-md-6">
                                        <div>
                                            <p className="title-custom">Câu hỏi</p>
                                            <Input className="input-question"/>
                                        </div>
                                        <div>
                                            <p className="title-custom">Url sound</p>
                                            <Input className="input-question"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div>
                                            <p className="title-custom">Đáp án đúng</p>
                                            <Input className="input-question"/>
                                        </div>
                                        <div>
                                            <p className="title-custom">Url sound</p>
                                            <Input className="input-question"/>
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

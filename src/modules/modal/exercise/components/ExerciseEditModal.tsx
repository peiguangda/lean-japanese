import * as React from "react";
import {Fragment} from "react";
import {Button, Card, Layout, Modal} from "antd";
import {ExerciseEntity} from "../../../../common/types/exercise";
import {ListQuestion} from "./question/ListQuestion";
import {QuestionContent} from "./QuestionContent";

const {
    Sider,
} = Layout;

export interface Props {
    title: string;
    visible: boolean;
    topic_id: number;
    exercise: Array<ExerciseEntity>;
    action: string;

    closeModal(): void;

    editExercise(parameters): void;
}

export interface State {
    exercise: Array<ExerciseEntity>;
    isShowSetting: boolean;
}

const initExercise = new class implements ExerciseEntity {
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
    order_index: number;
    parent_id: number;
    shuffle_answer: number;
    status: number;
    topic_id: number;
    user_id: number;
    list_answer: Array<string>;
    list_correct_answer: Array<number>;
};

export class ExerciseEditModal extends React.Component<Props, State, {}> {
    public handleCancel = (e) => {
        this.props.closeModal();
    };
    public handleOk = (e) => {
        let {exercise} = this.state;
        this.props.editExercise(exercise[0]);
        this.props.closeModal();
    };
    public onchangeSetting = () => {
        let {isShowSetting} = this.state;
        this.setState({
            isShowSetting: !isShowSetting
        })
    };
    public onUpdateExercise = (parameters) => {
        let {exercise} = parameters;
        this.state.exercise[0] = exercise;
        this.forceUpdate();
    };

    constructor(props) {
        super(props);
        this.state = {
            isShowSetting: false,
            exercise: []
        }
    }

    componentWillMount(): void {
        this.state.exercise.push({...initExercise, topic_id: this.props.topic_id});
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        let {exercise} = nextProps;
        this.setState({
            exercise: exercise
        })
    }

    public render() {
        let {isShowSetting, exercise} = this.state;
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
                        {/*----------------question bar--------------------*/}
                        <Sider>
                            <div className="nav_question">
                                <Card title="Tất cả các câu hỏi">
                                    <div className="question_items">
                                        <ListQuestion
                                            removeQuestion={null}
                                            changeQuestion={null}
                                            numberQuestion={exercise.length}
                                            current_question={0}
                                        />
                                        <Button className="row mt-2" type="default" icon="setting"
                                                onClick={this.onchangeSetting}>Cài đặt</Button>
                                    </div>
                                </Card>
                            </div>
                        </Sider>
                        {/*----------------question content--------------------*/}
                        {
                            exercise && (<QuestionContent
                                onchangeSetting={this.onchangeSetting}
                                isShowSetting={isShowSetting}
                                visible={true}
                                exercise={exercise[0]}
                                onUpdateExercise={this.onUpdateExercise}
                                current_question={0}
                                topic_id={this.props.topic_id}
                            />)
                        }
                    </Layout>
                </Modal>
            </Fragment>
        );
    }
}

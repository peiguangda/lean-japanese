import * as React from "react";
import {Fragment} from "react";
import {Collapse, Icon, message, Tree} from 'antd';
import {Link} from "react-router-dom";
import {LessonEntity} from "../../../../../common/types/lesson";

const DirectoryTree = Tree.DirectoryTree;
const {TreeNode} = Tree;
const Panel = Collapse.Panel;

export interface Props {
    course_id: number;
    lesson: LessonEntity;

    deleteLesson(parameters): void;

    editLesson(parameters): void;

    fetchLesson(parameters): void
}

export interface State {
    visible: boolean
}

export class Lesson extends React.Component<Props, State, {}> {
    public onClickEdit = () => {
        this.setState({
            visible: true
        })
    }
    public _closeModal = () => {
        this.setState({
            visible: false
        })
    }
    public _showModal = () => {
        this.setState({
            visible: true
        })
    }
    onSelect = () => {
        console.log('Trigger Select');
    };
    onExpand = () => {
        console.log('Trigger Expand');
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    public confirm(params) {
        this.props.deleteLesson(params);
    }

    public cancel(e) {
        message.error('Click on No');
    }

    public render() {
        let {lesson} = this.props;
        let {visible} = this.state;
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };

        const folder = <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={this.onSelect}
            onExpand={this.onExpand}
        >
            <TreeNode title="parent 0" key="0-0">
                <TreeNode title="leaf 0-0" key="0-0-0" isLeaf/>
                <TreeNode title="leaf 0-1" key="0-0-1" isLeaf/>
            </TreeNode>
            <TreeNode title="parent 1" key="0-1">
                <TreeNode title="leaf 1-0" key="0-1-0" isLeaf/>
                <TreeNode title="leaf 1-1" key="0-1-1" isLeaf/>
            </TreeNode>
        </DirectoryTree>

        return (
            <Fragment>
                <div className="ml-5">
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
                    >
                        <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
                            <p>{folder}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
                            <p>{folder}</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
                            <p>{folder}</p>
                        </Panel>
                    </Collapse>

                </div>
                {/*<Card style={{width: 1000}}>*/}
                {/*<div className="row">*/}
                {/*<div className="col-md-8">*/}
                {/*<Link to={lesson ? `/lesson/${lesson.id}` : '/'}><p>{lesson ? lesson.name : ""}</p></Link>*/}
                {/*<div className="row">*/}
                {/*<p className="col-md-10">{lesson.short_description}</p>*/}
                {/*<Icon type="eye" className="viewer"/>2*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="col-md-4">*/}
                {/*<Button*/}
                {/*type="primary"*/}
                {/*className="small_button"*/}
                {/*icon="edit"*/}
                {/*onClick={() => this.onClickEdit()}*/}
                {/*/>*/}
                {/*<LessonModal*/}
                {/*fetchLessons={this.props.fetchLesson}*/}
                {/*lesson={lesson}*/}
                {/*handleLesson={this.props.editLesson}*/}
                {/*title={"Edit a lesson"}*/}
                {/*visible={visible}*/}
                {/*course_id={lesson.course_id}*/}
                {/*closeModal={this._closeModal}*/}
                {/*showModal={this._showModal}*/}
                {/*/>*/}
                {/*<Popconfirm*/}
                {/*title="Are you sure delete this lesson?"*/}
                {/*onConfirm={() => this.confirm({lessonId: lesson.id, course_id: this.props.course_id})}*/}
                {/*onCancel={this.cancel}*/}
                {/*okText="Yes"*/}
                {/*cancelText="No"*/}
                {/*>*/}
                {/*<Button type="primary" className="small_button" icon="close"/>*/}
                {/*</Popconfirm>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</Card>*/}
            </Fragment>
        );
    }
}

import * as React from "react";
import {Fragment} from "react";
import {Button, Collapse, Icon, message, Popconfirm, Tooltip, Tree} from 'antd';
import {LessonEntity} from "../../../../../common/types/lesson";
import {ApiEntity} from "../../../../../common/types";
import {RouteComponentProps} from "react-router";
import {LessonModal} from "../../../../modal/lesson/components/LessonModal";
import {Loader} from "../../../../loader/components/loader";
import {UserCourseEntity} from "../../../../../common/types/user_course";

const DirectoryTree = Tree.DirectoryTree;
const {TreeNode} = Tree;
const Panel = Collapse.Panel;
export var listLesson = [];

export interface Props extends RouteComponentProps<any, any> {
    lessons: LessonEntity[];
    api: ApiEntity;
    props: any;
    userCourse: UserCourseEntity;

    fetchLessons(parameters): Promise<any>;

    deleteLesson(parameters): Promise<any>;

    editLesson(parameters): Promise<any>;

    createLesson(parameters): Promise<any>;

    fetchLesson(parameters): Promise<any>;
}

export interface State {
    visible: boolean;
    loading: boolean;
    lesson: LessonEntity;
    start_time: any;
    end_time: any;
    parent_id: number;
    listLesson: Array<any>;
    action: string;
    admin: boolean;
}

export class ListLesson extends React.Component<Props, State, {}> {
    public onChangeStatusLesson = (event, item) => {
    };
    onSelect = () => {
        console.log('Trigger Select');
    };
    onExpand = () => {
        console.log('Trigger Expand');
    };

    public onCheck = () => {
        console.log('Trigger Check');
    };

    public _closeModal = () => {
        this.setState({
            visible: false
        })
    };
    public _showModal = () => {
        this.setState({
            visible: true
        })
    };
    public addItemToList = (list, item) => {
        if (list) list.push(item);
    };
    public fetchChild = (list, id) => {
        let course_id = this.props.params.id;
        this.props.fetchLessons({course_id: course_id, parent_id: id})
            .then(res => {
                res.payload.map((item, index) => {
                    item.childList = [];
                    this.fetchChild(item.childList, item.id);
                    this.addItemToList(list, item);
                })
            })
    };
    public onClickCreate = () => {
        this._showModal();
    };
    public _createLesson = params => {
        this.props.createLesson(params)
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.initData();
                }
            })
    };
    public _deleteLesson = params => {
        this.props.deleteLesson({course_id: params.course_id, id: params.lessonId})
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.initData();
                }
            })
    };
    public _editLesson = params => {
        this.props.editLesson(params)
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.initData();
                }
            })
    };
    public addAction = (event, item) => {
        event.stopPropagation();
        this._showModal();
        this.setState({
            parent_id: item.id,
            action: "create"
        })
    };

    public openLesson = (event, item) => {
        event.stopPropagation();
    };

    public editAction = (event, item) => {
        event.stopPropagation();
        this.setState({
            lesson: item,
            action: "edit"
        });
        this._showModal();
    };
    public deleteAction = (event, item) => {
        event.stopPropagation();
    };
    public showChildren = (item) => {
        let {admin} = this.state;
        let {childList} = item;
        const customTitle = (name, item) => <Fragment>
            {name}
            <div className="hidden-custom">
                {admin ? <Fragment><Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => this.confirm({lessonId: item.id, course_id: item.course_id})}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button className="float-right btn-delete" icon="close"/>
                </Popconfirm>
                    <Button className="float-right btn-edit" icon="edit"
                            onClick={(event) => this.editAction(event, item)}/>
                    <Button className="float-right btn-add" icon="plus"
                            onClick={(event) => this.addAction(event, item)}/></Fragment> : ""}
                <Tooltip placement="topLeft" title={"Chi tiết"}>
                    <Button className="float-right btn-add" icon="link"
                            href={`/lesson/${item.id}`} target="_blank"
                            onClick={(event) => this.openLesson(event, item)}/>
                </Tooltip>
            </div>
        </Fragment>;
        if (childList && childList.length == 0) return;
        else return childList.map((value, index) => {
            if (value.childList.length)
                return <TreeNode
                    title={customTitle(value.name + ' (Tổng số ' + value.childList.length + ' bài )', value)}
                    key={value.id}>
                    {this.showChildren(value)}
                </TreeNode>;
            else return <TreeNode
                title={customTitle(value.name, value)} key={value.id} isLeaf/>;
        })
    };
    private showListLesson = () => {
        var {listLesson, admin} = this.state;
        const extra_edit_delete = (item) => <Fragment>
            <div className="hidden-custom">
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => this.confirm({lessonId: item.id, course_id: item.course_id})}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button className="float-right btn-header-topic-delete" icon="close"
                            onClick={(event) => this.deleteAction(event, item)}/>
                </Popconfirm>
                <Button className="float-right btn-header-topic-add-edit" icon="edit"
                        onClick={(event) => this.editAction(event, item)}/>
                <Button className="float-right btn-header-topic-add-edit" icon="plus"
                        onClick={(event) => this.addAction(event, item)}/>
            </div>
        </Fragment>;

        if (listLesson && listLesson.length)
            return listLesson.map((item, index) => {
                return (
                    <Collapse
                        destroyInactivePanel={true}
                        className="w-100"
                        bordered={false}
                        defaultActiveKey={['0']}
                        expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
                        onChange={(event) => this.onChangeStatusLesson(event, item)}
                        accordion={true}
                    >
                        {/*--------------------------một bài------------------------------*/}
                        <Panel header={item.name} key={item.id} className="customPanelStyle"
                               extra={admin ? extra_edit_delete(item) : ""}>
                            <p>
                                <DirectoryTree
                                    multiple
                                    defaultExpandAll={false}
                                    onSelect={this.onSelect}
                                    onExpand={this.onExpand}
                                    onCheck={this.onCheck}
                                    expandAction={"click"}
                                >
                                    {/*------------------------show bài con-----------------------------*/}
                                    {this.showChildren(item)}
                                </DirectoryTree>
                            </p>
                        </Panel>
                    </Collapse>
                );
            });
    };

    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.userCourse[0] && this.props.userCourse[0].role_type == 1 ? true : false,
            action: "create",
            listLesson: [],
            visible: false,
            parent_id: 0,
            loading: false,
            start_time: (new Date()).getDate(),
            end_time: new Date(),
            lesson: new class implements LessonEntity {
                id: string;
                actionType: string;
                avatar: string;
                childrent_type: number;
                course_id: number;
                description: string;
                duration: number;
                end_time: number;
                level: number;
                name: string;
                order_index: number;
                parent_id: number;
                pass: number;
                password: string;
                question_number: number;
                score_scale: number;
                short_description: string;
                sort_id: number;
                start_time: number;
                status: number;
                tag: string;
                time_practice: number;
                total_card_num: number;
                user_id: number;
                user_name: string;
            }
        }
    }

    public initData() {
        listLesson = [];
        this.fetchChild(listLesson, 0);
        this.setState({
            listLesson: listLesson
        })
    }

    public confirm(params) {
        this._deleteLesson(params);
    }

    public cancel(e) {
        message.error('Click on No');
    }

    componentWillMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({
            admin: nextProps.userCourse[0] && nextProps.userCourse[0].role_type == 1 ? true : false
        })
    }

    public render() {
        let {api, userCourse} = this.props;
        let {visible, lesson, parent_id, action, admin} = this.state;
        return (
            <Fragment>
                <h5 className="title-list-lesson ml-4">Danh sách bài học</h5>
                <div className="row m-3 w-100 pt-4 list-topic-content">
                    {api.loadings > 0 ? <Loader/> : this.showListLesson()}
                    {admin ? <div className="row w-100">
                        <Button type="primary" className="item_button w-100 ml-5 mr-5 mb-5" icon="plus"
                                onClick={this.onClickCreate}>
                            Thêm bài học
                        </Button>
                    </div> : ""}
                    <div className="col">
                        <LessonModal
                            fetchLessons={this.props.fetchLessons}
                            handleLesson={action == "create" ? this._createLesson : this._editLesson}
                            closeModal={this._closeModal}
                            showModal={this._showModal}
                            lesson={lesson}
                            visible={visible}
                            course_id={this.props.params.id}
                            parent_id={parent_id}
                            action={action}
                            title={action == "create" ? "Tạo bài học" : "Sửa bài học"}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

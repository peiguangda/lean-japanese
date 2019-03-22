import * as React from "react";
import {Helmet} from "react-helmet";
import {CourseEntity} from "../types";
import {ApiEntity} from "../../../../../common/types";
import {Fragment} from "react";
import {Modal, Button, Icon, Input, Upload, message, Select} from "antd";
import {storage, firebase} from "../../../../../firebase";
import {LessonEntity} from "../../lesson/types";
import DatePicker from "react-datepicker";
import "../../../../../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "../../../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "../../../../../../node_modules/react-datepicker/dist/react-datepicker.min.css";

const Option = Select.Option;

export interface Props {
    fetchCourse(parameters): void;
    fetchLessons(parameters): void;
    createLesson(parameters): Promise<any>;

    course: CourseEntity;
    api: ApiEntity;
    loading: number;
}

export interface State {
    visible: boolean;
    loading: boolean;
    lesson: LessonEntity;
    start_time: any;
    end_time: any;
}

export class CourseInfo extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
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

    public componentWillMount() {
        const {children} = this.props;
        this.props.fetchCourse(children); // get course detail
    }

    public showModal = () => {
        this.setState({
            visible: true
        });
    }

    public handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    public handleOk = (e) => {
        let {lesson} = this.state;
        const {children} = this.props;
        lesson.childrent_type = 1;
        lesson.status = 1;
        this.setState({
            visible: false,
        });
        this.props.createLesson({
            topic: lesson,
            course_id: children["id"]
        }).then(response => {
            console.log(response);
            if(response.status == "success" ){
                this.props.fetchLessons({course_id: children["id"]})
            }
        });
    }

    public beforeUpload(file) {
        const isImage = (file.type === "image/jpeg" || file.type === "image/png");
        if (!isImage) {
            message.error("You can only upload JPG & PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2; //check file < 2MB
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isImage && isLt2M;
    }

    public getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    public handleChange = (info) => {
        if (info.file.status === "uploading") {
            const uploadTask = storage.ref(`images/${info.file.name}`).put(info.file.originFileObj);
            uploadTask.on('state_changed', snapshot => {
                var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (uploadTask.snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, error => {
                message.error("Have error in uploading");
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    this.getBase64(info.file.originFileObj, downloadURL => this.setState(prevState => ({
                        lesson: {
                            ...prevState.lesson,
                            avatar: downloadURL
                        },
                        loading: false
                    })));
                });
            });
            this.setState({loading: true});
            return;
        }
    }

    public emitNameEmpty = () => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                name: ''
            }
        }));
    }

    public emitDescriptEmpty = () => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                description: ''
            }
        }));
    }

    public onChangeNameLesson = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                name: value
            }
        }));
    }

    public onChangeDescription = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                description: value
            }
        }));
    }

    public handleSelectChange = value => {
        console.log(`selected ${value}`);
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                status: value
            }
        }));
    }

    public handleChangeStartTime = date => {
        console.log(`selected ${date}`);
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                start_time: date
            }
        }));
    }

    public handleChangeEndTime = date => {
        console.log(`selected ${date}`);
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                end_time: date
            }
        }));
    }

    public showButtonAddLesson() {
        let {loading, lesson: {name, description, start_time, end_time}} = this.state;
        const suffixLesson = name ? <Icon type="close-circle" onClick={this.emitNameEmpty}/> : null;
        const suffixName = description ? <Icon type="close-circle" onClick={this.emitDescriptEmpty}/> : null;
        const uploadButton = (
            <div>
                <Icon type={loading ? "loading" : "plus"}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {lesson: {avatar}} = this.state;
        return <Fragment>
            <Button type="primary" className="add_item_button" onClick={this.showModal}>
                <Icon type="plus"/>
                Add a lesson
            </Button>
            <Modal
                title="Add a lesson"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Input.Group>
                    <Input
                        placeholder="Lesson name"
                        prefix={<Icon type="edit" style={{color: 'rgba(0,0,0,.25)'}}/>} //set icon prefix the input
                        suffix={suffixLesson}  //set icon if having text in box
                        value={name}
                        onChange={this.onChangeNameLesson}
                    />
                    <Input
                        placeholder="Description"
                        type="textarea"
                        size="large"
                        value={description}
                        onChange={this.onChangeDescription}
                        prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>} //set icon prefix the input
                        suffix={suffixName}  //set icon if having text in box
                    />
                </Input.Group>
                <Select defaultValue="status" style={{width: 120}} onChange={this.handleSelectChange}>
                    <Option value="public">Public</Option>
                    <Option value="private">Private</Option>
                    <Option value="deleted">Deleted</Option>
                    <Option value="open">Open</Option>
                </Select>
                <DatePicker
                    selected={start_time}
                    onChange={this.handleChangeStartTime}
                    placeholderText="Start time"
                />
                <DatePicker
                    selected={end_time}
                    onChange={this.handleChangeEndTime}
                    placeholderText="End time"
                />
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {avatar ? <img src={avatar} alt="avatar"/> : uploadButton}
                </Upload>
            </Modal>
        </Fragment>
    }

    public render() {
        let {course, api} = this.props;
        return (
            <div className="row course_info_layout">
                <div className="col-md-6">
                    <img className="OMC avatarCourse"
                         alt={course ? course.name : ""}
                         src={course ? course.avatar : ""}/>
                </div>
                <div className="col-md-6 mt-4">
                    <div className="row">
                        <div className="col">
                            <p>{course ? course.name : "Không có dữ liệu để hiện thị"}</p>
                            <p>Code: {course ? course.code : "Không có dữ liệu để hiện thị"}</p>
                            <p>{course ? course.short_description : "Không có dữ liệu để hiện thị"}</p>
                        </div>
                        <div className="col">
                            {this.showButtonAddLesson()}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

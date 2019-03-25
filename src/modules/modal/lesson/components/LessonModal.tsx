import * as React from "react";
import {Helmet} from "react-helmet";
import {Fragment} from "react";
import {Modal, Button, Icon, Input, Upload, message, Select} from "antd";
import {storage, firebase} from "../../../../firebase";
import {LessonEntity} from '../../../../common/types/lesson';
import DatePicker from "react-datepicker";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.min.css";

const Option = Select.Option;

export interface Props {
    fetchLessons(parameters): void;
    handleLesson(parameters): void;
    closeModal(): void;
    showModal(): void;
    lesson: LessonEntity;
    title: string;
    visible: boolean;
    course_id: number;
}

export interface State {
    loading: boolean;
    lesson: LessonEntity;
}

export class LessonModal extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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

    componentWillReceiveProps(nextProps) {
        let {lesson} = nextProps;
        lesson.course_id = nextProps.course_id;
        // console.log("next", nextProps);
        this.setState({
            lesson: lesson,
        })
    }

    public showModal = () => {
        this.props.showModal();
    }

    public handleCancel = (e) => {
        this.props.closeModal();
    }

    public handleOk = (e) => {
        let {lesson} = this.state;
        let {childrent_type, status} = lesson;
        if (!childrent_type) lesson.childrent_type = 1;
        this.props.handleLesson(lesson);
        this.props.closeModal();
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
                    }))
                );
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
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                status: value
            }
        }));
    }

    public handleChangeStartTime = date => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                start_time: date
            }
        }));
    }

    public handleChangeEndTime = date => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                end_time: date
            }
        }));
    }

    public setDetaultStatusValue = () => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                status: 1
            }
        }));
    }

    public getStatus = status => {
        console.log("status", status);
        if(!status){
            this.setDetaultStatusValue();
            return "Public";
        }
        if(status == 1) return "Public";
        if(status == 2) return "Private";
        if(status == 3) return "Deleted";
        if(status == 4) return "Open";
    }

    public render() {
        let {loading, lesson: {name, description, start_time, end_time, avatar, status}} = this.state;
        const suffixLesson = name ? <Icon type="close-circle" onClick={this.emitNameEmpty}/> : null;
        const suffixName = description ? <Icon type="close-circle" onClick={this.emitDescriptEmpty}/> : null;
        const uploadButton = (
            <div>
                <Icon type={loading ? "loading" : "plus"}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Fragment>
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
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
                    <Select 
                        style={{width: 120}} 
                        onChange={this.handleSelectChange}
                        value={this.getStatus(status)}
                    >
                            <Option value="1">Public</Option>
                            <Option value="2">Private</Option>
                            <Option value="3">Deleted</Option>
                            <Option value="4">Open</Option>
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

        );
    }
}

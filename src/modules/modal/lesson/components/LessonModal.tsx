import * as React from "react";
import {Fragment} from "react";
import {Icon, Input, message, Modal, Select, Upload} from "antd";
import {firebase, storage} from "../../../../helpers/firebase";
import {LessonEntity} from '../../../../common/types/lesson';
import DatePicker from "react-datepicker";
import "../../../../public/css/react-datepicker.min";
import "../../../../public/css/react-datepicker.css";
import "../../../../public/css/react-datepicker.min.css";
import "../../../../public/css/react-datepicker-cssmodules.min.css";
import "../../../../public/css/react-datepicker";
import "../../../../public/css/react-datepicker-cssmodules.css";
import {convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const Option = Select.Option;

export interface Props {
    lesson: LessonEntity;
    title: string;
    visible: boolean;
    course_id: number;
    parent_id: number;
    action: string;

    fetchLessons(parameters): void;

    handleLesson(parameters): void;

    closeModal(): void;

    showModal(): void;
}

export interface State {
    loading: boolean;
    lesson: LessonEntity;
    editorState: any
}

export class LessonModal extends React.Component<Props, State, {}> {

    onEditorStateChange: Function = (editorState) => {
        let descript = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
            editorState,
        });
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                description: descript
            }
        }));
    };

    public handleCancel = (e) => {
        this.props.closeModal();
    };
    public handleOk = (e) => {
        let {lesson} = this.state;
        let {childrent_type, parent_id} = lesson;
        if (!childrent_type) lesson.childrent_type = 1;
        if (this.props.action == "create") lesson.parent_id = this.props.parent_id;
        this.props.handleLesson(lesson);
        this.props.closeModal();
    };
    public handleChange = (info) => {
        if (info.file.status === "uploading") {
            var now = new Date().getMilliseconds();
            const uploadTask = storage.ref(`topic/avatar/${info.file.name + "_" + now}`).put(info.file.originFileObj);
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
    };
    public emitNameEmpty = () => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                name: ''
            }
        }));
    };
    public emitDescriptEmpty = () => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                short_description: ''
            }
        }));
    };
    public onChangeNameLesson = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                name: value
            }
        }));
    };
    public onChangeShortDescription = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                short_description: value
            }
        }));
    };
    public handleSelectChange = value => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                status: value
            }
        }));
    };
    public handleChangeStartTime = date => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                start_time: date
            }
        }));
    };
    public handleChangeEndTime = date => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                end_time: date
            }
        }));
    };
    public setDetaultStatusValue = () => {
        this.setState(prevState => ({
            lesson: {
                ...prevState.lesson,
                status: 1
            }
        }));
    };
    public getStatus = status => {
        if (!status) {
            this.setDetaultStatusValue();
            return "Public";
        }
        if (status == 1) return "Public";
        if (status == 2) return "Private";
        if (status == 3) return "Deleted";
        if (status == 4) return "Open";
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            editorState: EditorState.createEmpty(),
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
        this.setState({
            lesson: lesson,
        })
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

    public render() {
        const {editorState} = this.state;
        // console.log("edittor state", editorState);
        let {loading, lesson: {name, short_description, description, start_time, end_time, avatar, status}} = this.state;
        const suffixLesson = name ? <Icon type="close-circle" onClick={this.emitNameEmpty}/> : null;
        const suffixName = short_description ? <Icon type="close-circle" onClick={this.emitDescriptEmpty}/> : null;
        const uploadButton = (
            <div>
                <Icon type={loading ? "loading" : "plus"}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Fragment>
                <Modal
                    className={"title modal-create-lesson"}
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="row">
                        <div className="col-md-5 m-2">
                            <Input.Group>
                                <Input
                                    className="input_body"
                                    placeholder="Tên bài giảng"
                                    prefix={<Icon type="edit"
                                                  style={{color: 'rgba(0,0,0,.25)'}}/>} //set icon prefix the input
                                    suffix={suffixLesson}  //set icon if having text in box
                                    value={name}
                                    onChange={this.onChangeNameLesson}
                                />
                                <Input
                                    className={"input_body"}
                                    placeholder="Mô tả ngắn"
                                    value={short_description}
                                    onChange={this.onChangeShortDescription}
                                    prefix={<Icon type="form"
                                                  style={{color: 'rgba(0,0,0,.25)'}}/>} //set icon prefix the input
                                    suffix={suffixName}  //set icon if having text in box
                                />
                            </Input.Group>
                            <div className="row">
                                <div className="col-md-6">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {avatar ?
                                            <img src={avatar} className="image-fix-size" alt="avatar"/> : uploadButton}
                                    </Upload>
                                </div>
                                <div className="col-md-6">
                                    <Select
                                        className="w-100 m-1"
                                        onChange={this.handleSelectChange}
                                        value={this.getStatus(status)}
                                    >
                                        <Option value="1">Public</Option>
                                        <Option value="2">Private</Option>
                                        <Option value="3">Deleted</Option>
                                        <Option value="4">Open</Option>
                                    </Select>
                                    <div className="w-100 m-1">
                                        <DatePicker
                                            className="date-picker-custom"
                                            selected={start_time}
                                            onChange={this.handleChangeStartTime}
                                            placeholderText="Thời gian bắt đầu"
                                        />
                                    </div>
                                    <div className="w-100 m-1">
                                        <DatePicker
                                            className="date-picker-custom"
                                            selected={end_time}
                                            onChange={this.handleChangeEndTime}
                                            placeholderText="Thời gian kết thúc"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 m-2 modal-editor">
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                    </div>
                </Modal>
            </Fragment>

        );
    }
}

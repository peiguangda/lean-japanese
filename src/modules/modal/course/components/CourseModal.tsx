import * as React from "react";
import {Fragment} from "react";
import {Icon, Input, InputNumber, message, Modal, Select, Upload} from "antd";
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
import {CourseEntity} from "../../../../common/types/course";
import {firebase, storage} from "../../../../helpers/firebase";

const Option = Select.Option;

export interface Props {
    visible: boolean;

    createCourse(parameters): Promise<any>;

    closeModal(): void;

    showModal(): void;
}

export interface State {
    course: CourseEntity;
    editorState: any
    loading: boolean;
}

export class CourseModal extends React.Component<Props, State, {}> {

    onEditorStateChange: Function = (editorState) => {
        let descript = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
            editorState,
        });
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                description: descript
            }
        }));
    };
    public showModal = () => {
        this.props.showModal();
    };
    public handleCancel = (e) => {
        this.props.closeModal();
    };
    public handleOk = (e) => {
        let {course} = this.state;
        this.props.createCourse(course)
            .then(res => {
                if (res && res.status == "success") {
                    message.success("Tạo khóa học thành công!");
                } else message.error("Xảy ra lỗi!");
            });
        this.props.closeModal();
    };
    public handleChange = (info) => {
        if (info.file.status === "uploading") {
            var now = new Date().getMilliseconds();
            const uploadTask = storage.ref(`course/avatar/${info.file.name + "_" + now}`).put(info.file.originFileObj);
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
                            course: {
                                ...prevState.course,
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
            course: {
                ...prevState.course,
                name: ''
            }
        }));
    };
    public emitDescriptEmpty = () => {
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                short_description: ''
            }
        }));
    };
    public onChangeNameLesson = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                name: value
            }
        }));
    };
    public onChangeShortDescription = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                short_description: value
            }
        }));
    };
    public onChangePass = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                password: value
            }
        }));
    };
    public onChangeCost = (e) => {
        let {value} = e.target;
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                cost: value
            }
        }));
    };
    public handleSelectChange = value => {
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                status: value
            }
        }));
    };
    public handleChangeStartTime = date => {
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                day_to_open_lesson: date
            }
        }));
    };
    public handleChangeEndTime = date => {
        this.setState(prevState => ({
            course: {
                ...prevState.course,
                end_date: date
            }
        }));
    };
    public setDetaultStatusValue = () => {
        this.setState(prevState => ({
            course: {
                ...prevState.course,
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
            course: new class implements CourseEntity {
                actionType: string;
                android_url: string;
                avatar: string;
                code: string;
                cost: string;
                created_at: number;
                day_to_open_lesson: number;
                description: string;
                end_date: string;
                id: number;
                index: number;
                language: string;
                lesson_num: number;
                member_num: number;
                name: string;
                owner_name: string;
                password: string;
                short_description: string;
                status: number;
                time_expire: number;
                updated_at: number;
                user_id: number;
            }
        }
    }

    componentWillReceiveProps(nextProps) {
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
        let {loading, course: {name, short_description, password, cost, avatar, status, end_date, day_to_open_lesson}} = this.state;
        // let costt = parseInt(cost, 10);
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
                    title={"Tạo khóa học"}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="row">
                        <div className="col-md-5 m-2">
                            <Input.Group>
                                <Input
                                    className="input_body"
                                    placeholder="Tên khóa học"
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
                                    prefix={<Icon type="lock"
                                                  style={{color: 'rgba(0,0,0,.25)'}}/>} //set icon prefix the input
                                    suffix={suffixName}  //set icon if having text in box
                                />
                            </Input.Group>
                            <div className="row">
                                <div className="col-md-6">
                                    <Input
                                        className={"pass-course"}
                                        placeholder="Mật khẩu"
                                        type="password"
                                        value={password}
                                        onChange={this.onChangePass}
                                        prefix={<Icon type="form"
                                                      style={{color: 'rgba(0,0,0,.25)'}}/>} //set icon prefix the input
                                        suffix={suffixName}  //set icon if having text in box
                                    />
                                </div>
                                <div className="col-md-6">
                                    <InputNumber
                                        className="w-100 m-1"
                                        defaultValue={1000}
                                        formatter={value => `${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={cost => parseInt(cost.replace(/\$\s?|(,*)/g, ''), 10)}
                                        onChange={this.onChangeCost}
                                    />
                                </div>
                            </div>
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
                                            selected={day_to_open_lesson}
                                            onChange={this.handleChangeStartTime}
                                            placeholderText="Start time"
                                        />
                                    </div>
                                    <div className="w-100 m-1">
                                        <DatePicker
                                            className="date-picker-custom"
                                            selected={end_date}
                                            onChange={this.handleChangeEndTime}
                                            placeholderText="End time"
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

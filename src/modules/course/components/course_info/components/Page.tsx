import * as React from "react";
import {Helmet} from "react-helmet";
import {CourseEntity} from "../types";
import {ApiEntity} from "../../../../../common/types";
import {Fragment} from "react";
import {Modal, Button, Icon, Input, Upload, message} from "antd";
import {storage, firebase} from "../../../../../firebase";

const {TextArea} = Input;

export interface Props {
    fetchCourse(parameters): void

    course: CourseEntity;
    api: ApiEntity;
    loading: number;
    location: any;
}

export interface State {
    visible: boolean;
    imageUrl: string;
    loading: boolean;
    lessonName: string;
    description: string;
}

export class CourseInfo extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imageUrl: "",
            loading: false,
            lessonName: "",
            description: ""
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
        console.log("e",e);
        this.setState({
            visible: false,
        });
        //them lesson vua dc them vao day
        console.log("state", this.state);
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
                    this.getBase64(info.file.originFileObj, downloadURL => this.setState({
                        imageUrl: downloadURL,
                        loading: false,
                    }));
                });
            });
            this.setState({loading: true});
            return;
        }
    }

    public emitNameEmpty = () => {
        this.setState({ lessonName: '' });
    }

    public emitDescriptEmpty = () => {
        this.setState({ description: '' });
    }

    public onChangeNameLesson = (e) => {
        this.setState({ lessonName: e.target.value });
    }

    public onChangeDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    public showButtonAddLesson() {
        let {loading, lessonName, description} = this.state;
        const suffixLesson = lessonName ? <Icon type="close-circle" onClick={this.emitNameEmpty} /> : null;
        const suffixName = lessonName ? <Icon type="close-circle" onClick={this.emitDescriptEmpty} /> : null;
        const uploadButton = (
            <div>
                <Icon type={loading ? "loading" : "plus"}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return <Fragment>
            <Button type="primary" onClick={this.showModal}>
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
                        prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} //set icon prefix the input
                        suffix={suffixLesson}  //set icon if having text in box
                        value={lessonName}
                        onChange={this.onChangeNameLesson}
                    />
                    <Input 
                        placeholder="Description" 
                        type="textarea"
                        size="large"
                        value={description}
                        onChange={this.onChangeDescription}
                        prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} //set icon prefix the input
                        suffix={suffixName}  //set icon if having text in box
                    />
                </Input.Group>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar"/> : uploadButton}
                </Upload>
            </Modal>
        </Fragment>
    }

    public render() {
        let {course, api} = this.props;
        return (
            <div className="row">
                <div className="col-md-6">
                    <img className="OMC avatarCourse"
                         src="https://storage.googleapis.com/kslearning/images/722984834-1544915140774-47089101_564216997360595_2408262560290701312_n.jpg"/>
                </div>
                <div className="col-md-6 mt-4">
                    <div className="row">
                        <div className="col">
                            <p>{course.name}</p>
                            <p>Code: {course.code}</p>
                            <p>{course.short_description}</p>
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

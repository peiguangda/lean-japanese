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
    title: Array<string>;
    imageUrl: string;
    loading: boolean;
}

export class CourseInfo extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: [],
            imageUrl: "",
            loading: false
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
        console.log(e);
        this.setState({
            visible: false,
        });
        //them lesson vua dc them vao day
        this.state.title.push("LOL")
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
        console.log("img", img);
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    public handleChange = (info) => {
        console.log(info);
        if (info.file.status === "uploading") {
            console.log(storage);
            const uploadTask = storage.ref(`images/${info.file.name}`).put(info.file.name);
            uploadTask.on('state_changed', function (snapshot) {
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
            }, function (error) {
                console.log('error');
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                });
            });
            this.setState({loading: true});
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    public showButtonAddLesson() {
        let {loading} = this.state;
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
                <Input placeholder="Lesson name"/>
                <TextArea placeholder="Description" rows={4}/>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://api.cloudinary.com/v1_1/easy-japanese-154d1/upload"
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

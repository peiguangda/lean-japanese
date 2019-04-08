import * as React from "react";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ApiEntity} from '../../../common/types/index';
import {Loader} from "../../loader/components/loader";
import {
    BackTop,
    Button,
    Card,
    Carousel,
    Icon,
    Input,
    Layout,
    message,
    Modal,
    PageHeader,
    Rate,
    Table,
    Tabs,
    Tooltip,
    Upload
} from "antd";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {CourseEntity} from "../../../common/types/course";
import {ListLessonContainter} from "./lesson/container";
import {ListMemberContainter} from "./list_member/container";


const TabPane = Tabs.TabPane;
const {TextArea} = Input;
const {
    Header, Footer, Sider, Content,
} = Layout;
const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Kích Thước',
        dataIndex: 'size',
        key: 'size',
    }, {
        title: 'Thời Gian',
        dataIndex: 'time',
        key: 'time',
    }];

const user_columns = [{
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
}, {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Ngày Tham Gia',
    dataIndex: 'date',
    key: 'date',
}, {
    title: 'Thời Gian',
    dataIndex: 'time',
    key: 'time',
}, {
    title: 'Vai Trò',
    dataIndex: 'status',
    key: 'status',
}];

const dataSource = [{
    key: '1',
    stt: 1,
    name: 'Mike',
    date: '13-4-1852',
    time: '13-4-1852',
    status: 'member'
}, {
    key: '2',
    stt: 2,
    name: 'John',
    date: '13-4-1852',
    time: '13-4-1852',
    status: 'admin'
}];

const test_columns = [{
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
}, {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Bài hoàn thành/ Tổng số',
    dataIndex: 'number',
    key: 'number',
}, {
    title: 'Câu đúng/ Tổng số',
    dataIndex: 'number',
    key: 'number',
}, {
    title: 'Điểm kinh nghiệm',
    dataIndex: 'number',
    key: 'numer',
}, {
    title: 'Số Chat',
    dataIndex: 'number',
    key: 'numer',
}, {
    title: 'Số Bình Luận',
    dataIndex: 'number',
    key: 'numer',
}];

export interface Props {
    api: ApiEntity;
    props: any,
    course: CourseEntity;
    params: any;

    fetchCourse(parameters): void;
}

export interface State {
}

const routes = [
    {
        path: '/',
        breadcrumbName: 'Home',
    },
    {
        path: 'course/1',
        breadcrumbName: 'Course',
    },
    {
        path: 'lesson/1',
        breadcrumbName: 'Lesson',
    },
];

const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export class CourseDetail extends React.Component<Props, State, {}> {

    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    constructor(props) {
        super(props);
    }

    public componentWillMount() {
        const {params} = this.props.props.match;
        console.log(this.props.props.match);
        this.props.fetchCourse(params); // get course detail
    }

    public callback(key) {
        console.log(key);
    }

    public render() {
        let {api, props, course} = this.props;
        return (
            <Fragment>
                <Helmet title={"Course"}/>
                {api.loadings > 0 ? <Loader/> : ""}
                <NavigationBarContainter/>
                <div className="container">
                    {/*----------------------carousel----------------------------*/}
                    <Carousel autoplay vertical>
                        <div><h3>{course.name}</h3></div>
                        <div><h3>{course.short_description}</h3></div>
                        <div><h3>{course.name}</h3></div>
                        <div><h3>{course.short_description}</h3></div>
                    </Carousel>
                    {/*-------------------------page header-------------------------*/}
                    <PageHeader
                        className="page-header-custom"
                        title=""
                        breadcrumb={{routes}}
                    />
                    <div className="row">
                        <div className="col-md-8">
                            {/*------------------------tab-------------------------------*/}
                            <Tabs defaultActiveKey="1" onChange={this.callback} className="course-content">
                                {/*-------------------content-------------------------*/}
                                <TabPane tab="Nội dung" key="1">
                                    <div className="row course_info_layout">
                                        <div className="course-description">{course.description}</div>
                                    </div>
                                    <div className="row mt-5">
                                        <ListLessonContainter
                                            params={props.match.params}
                                            location={props.location}
                                            route={null}
                                            routeParams={null}
                                            router={null}
                                            routes={null}
                                        />
                                    </div>
                                </TabPane>
                                {/*-------------------document-------------------------*/}
                                <TabPane tab="Tài liệu" key="2">
                                    <Table columns={columns}/>
                                    <Button type="primary" onClick={this.showModal} block>+Tải lên</Button>
                                    <Modal
                                        className="title"
                                        title="Tải tài liệu"
                                        visible={this.state.visible}
                                        onOk={this.hideModal}
                                        onCancel={this.hideModal}
                                        okText="OK"
                                        cancelText="CANCEL"
                                    >
                                        <Upload {...props}>
                                            <Button>
                                                <Icon type="upload"/> Click to Upload
                                            </Button>
                                        </Upload>,
                                    </Modal>
                                </TabPane>
                                {/*-------------------members-------------------------*/}
                                <TabPane tab="Thành viên" key="3">
                                    {/*<Table columns={user_columns} dataSource={dataSource}/>*/}
                                    <ListMemberContainter
                                        params={props.match.params}
                                        location={props.location}
                                        route={null}
                                        routeParams={null}
                                        router={null}
                                        routes={null}
                                    />
                                </TabPane>
                                {/*-------------------hoi dap-------------------------*/}
                                <TabPane tab="Hỏi đáp" key="4">
                                    <div className="row">
                                        <div className="col-1"><Icon type="question-circle" theme="twoTone"/></div>
                                        <div className="col-11"><Input placeholder="Đăng cái gì đó..."
                                                                       suffix={
                                                                           <Tooltip title="Extra information">
                                                                               <Icon type="upload"
                                                                                     style={{color: 'rgba(0,0,0,.45)'}}/>
                                                                           </Tooltip>
                                                                       }/>
                                        </div>
                                    </div>
                                </TabPane>
                                {/*-------------------ket qua hoc tap-------------------------*/}
                                <TabPane tab="Kết quả học tập" key="5">
                                    <div className="container">
                                        <div className="this_is_block_panel_main">
                                            <Table columns={test_columns}/>
                                        </div>
                                    </div>
                                </TabPane>
                                {/*-------------------danh gia-------------------------*/}
                                <TabPane tab="Đánh giá" key="6">
                                    <div className="chart-panel ">
                                        <div className="main-evaluate-panel" id="evaluate-chart-panel">
                                            <div className="left-panel">
                                                <h1>3</h1>
                                                <Rate allowHalf defaultValue={3}/>
                                                <div className="set_rate">
                                                    <Icon type="team"/>
                                                    5 đánh giá
                                                </div>
                                            </div>
                                            <div className="center-line"></div>
                                            <div className="right-panel">
                                                <div className="evaluate-item">
                                                    <label>5</label>
                                                    <div>
                                                        <div className="style_rate1">(5)</div>
                                                    </div>
                                                </div>
                                                <div className="evaluate-item">
                                                    <label>4</label>
                                                    <div>
                                                        <div className="style_rate2">(0)</div>
                                                    </div>
                                                </div>
                                                <div className="evaluate-item">
                                                    <label>3</label>
                                                    <div>
                                                        <div className="style_rate3">(0)</div>
                                                    </div>
                                                </div>
                                                <div className="evaluate-item">
                                                    <label>2</label>
                                                    <div>
                                                        <div className="style_rate4">(0)</div>
                                                    </div>
                                                </div>
                                                <div className="evaluate-item">
                                                    <label>1</label>
                                                    <div>
                                                        <div className="style_rate5">(0)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row reset-row-col">
                                        <div className="col-xs-12 col-sm-12 reset-row-col padding_right_with_col-12">
                                            <div className="this_is_block_panel_main_parent">
                                                <div className="this_is_block_panel_main">
                                                    <div className="this_is_header_block_panel">
                                                        <div className="this_is_header_left_block_panel">
                                                            <div className="this_is_block_title">Phản hồi từ học viên
                                                            </div>
                                                        </div>
                                                        <div className="this_is_header_right_block_panel"></div>
                                                    </div>
                                                    <div className="this_is_content_block_panel">
                                                        <div className="main_panel_rating_of_viewer_panel">
                                                            <div className="content_panel_rating_of_viewer_panel">
                                                                <div className="header_panel_rating_of_viewer_panel">
                                                                    <Rate allowHalf/>
                                                                </div>
                                                                <div className="body_panel_rating_of_viewer_panel">
                                                                    <Input placeholder="Đăng cái gì đó..."
                                                                           suffix={
                                                                               <Tooltip title="Extra information">
                                                                                   <Icon type="upload"
                                                                                         style={{color: 'rgba(0,0,0,.45)'}}/>
                                                                               </Tooltip>
                                                                           }/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                        {/*------------------------------tong quan khoa hoc--------------------------------*/}
                        <div className="col-md-4">
                            <div className="row">
                                <Card title="Tổng quan khóa học" bordered={false} className="course-card-descript">
                                    <p>{course ? course.name : "Không có dữ liệu để hiện thị"}</p>
                                    <Rate allowHalf defaultValue={3}/>{(3)}
                                    <div className="row w-100">
                                        <Icon type="book" className="col-md-2"/>
                                        <p className="col-md-10">Tổng số
                                            bài:{course.lesson_num ? course.lesson_num : 0}</p>
                                    </div>
                                    <div className="row w-100">
                                        <Icon type="team" className="col-md-2"/>
                                        <p className="col-md-10">Tổng số học viên
                                            : {course.member_num ? course.member_num : 0} học viên</p>
                                    </div>
                                    <div className="row w-100">
                                        <Icon type="font-colors" className="col-md-2"/>
                                        <p className="col-md-10">Ngôn ngữ : {course.language ? course.language : 0}</p>
                                    </div>
                                    <div className="row w-100">
                                        <Icon type="pound" className="col-md-2"/>
                                        <p className="col-md-10">Học phí: {course.cost ? course.cost : 0}</p>
                                    </div>
                                </Card>
                            </div>
                            <div className="row mt-5">
                                <Card title="Khóa học khác của bạn" bordered={false} className="course-card-descript">
                                    <Link to="/courses/1" className="course-utility-item display-flex">
                                        <img
                                            src="https://storage.googleapis.com/kslearning/images/955804494-1524044220063-congtacquocphong-min.jpg"/>
                                        <div>
                                            <div>Khóa học N2</div>
                                            <Rate className="rate_size" allowHalf defaultValue={3}/>
                                            <p className="size_font">500.000VND</p>
                                        </div>
                                    </Link>
                                    <Link to="/courses/2" className="course-utility-item display-flex">
                                        <img
                                            src="https://storage.googleapis.com/kslearning/images/955804494-1524044220063-congtacquocphong-min.jpg"/>
                                        <div>
                                            <div>Khóa học N3</div>
                                            <Rate className="rate_size" allowHalf defaultValue={3}/>
                                            <p className="size_font">500.000VND</p>
                                        </div>
                                    </Link>
                                    <Link to="/courses/3" className="course-utility-item display-flex">
                                        <img
                                            src="https://storage.googleapis.com/kslearning/images/955804494-1524044220063-congtacquocphong-min.jpg"/>
                                        <div>
                                            <div>Khóa học N4</div>
                                            <Rate className="rate_size" allowHalf defaultValue={3}/>
                                            <p className="size_font">500.000VND</p>
                                        </div>
                                    </Link>
                                    <Link to="/courses/4" className="course-utility-item display-flex">
                                        <img
                                            src="https://storage.googleapis.com/kslearning/images/955804494-1524044220063-congtacquocphong-min.jpg"/>
                                        <div>
                                            <div>Khóa học N5</div>
                                            <Rate className="rate_size" allowHalf defaultValue={3}/>
                                            <p className="size_font">500.000VND</p>
                                        </div>
                                    </Link>
                                </Card>
                            </div>
                            <div className="row mt-5">
                                <Card title="Tin tức liên quan" bordered={false} className="course-card-descript">
                                    <Link to="" className="course-utility-item display-flex">
                                        <img
                                            src="https://storage.googleapis.com/kslearning/images/533186243-1554281765867-koolsoftnew-03(1).jpg"/>
                                        <div>
                                            <p>Học thông minh là gì? Có thật sự tuyệt vời đến thế?</p>
                                            <p className="font_tt_size">Cập nhật 7/3/2019</p>
                                        </div>
                                    </Link>
                                    <Link to="" className="course-utility-item display-flex">
                                        <img
                                            src="https://storage.googleapis.com/kslearning/images/450687542-1527576887317-rectangle11copy.jpg"/>
                                        <div>
                                            <p>Danh sách các môn học mới tháng 4/2018</p>
                                            <p className="font_tt_size">Cập nhật 7/3/2019</p>
                                        </div>
                                    </Link>
                                    <Link to="" className="course-utility-item display-flex">
                                        <img
                                            src="https://storage.googleapis.com/kslearning/images/807315495-1527577754035-3.png"/>
                                        <div>
                                            <p>Hướng dẫn thanh toán</p>
                                            <p className="font_tt_size">Cập nhật 7/3/2019</p>
                                        </div>
                                    </Link>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer style={{textAlign: 'center'}}>
                    Easy Japanese Design ©2019 Created by HEDSPI
                </Footer>
                <BackTop/>
            </Fragment>
        );
    }
}

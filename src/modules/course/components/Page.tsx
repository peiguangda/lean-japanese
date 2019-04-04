import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {ApiEntity} from '../../../common/types/index';
import {Loader} from "../../loader/components/loader";
import {BackTop, Button, Card, Carousel, Icon, Input, Layout, PageHeader, Rate, Table, Tabs, Tooltip} from "antd";
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

export class CourseDetail extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {}
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
                                    <Button type="primary" block>+Tải lên</Button>
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
                                    <p>Khóa học khác của bạn</p>
                                </Card>
                            </div>
                            <div className="row mt-5">
                                <Card title="Tin tức liên quan" bordered={false} className="course-card-descript">
                                    <p>Tin tức liên quan</p>
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

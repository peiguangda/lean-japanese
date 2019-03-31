import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {ApiEntity} from '../../../common/types/index';
import {Loader} from "../../loader/components/loader";
import {BackTop, Card, Carousel, Icon, Layout, PageHeader, Rate, Tabs} from "antd";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {CourseEntity} from "../../../common/types/course";
import {ListLessonContainter} from "./lesson/container";

const TabPane = Tabs.TabPane;
const {
    Footer
} = Layout;

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
                                <TabPane tab="Tài liệu" key="2">Content of Tab Pane 2</TabPane>
                                <TabPane tab="Thành viên" key="3">Content of Tab Pane 3</TabPane>
                                <TabPane tab="Hỏi đáp" key="4">Content of Tab Pane 4</TabPane>
                                <TabPane tab="Kết quả học tập" key="5">Content of Tab Pane 5</TabPane>
                                <TabPane tab="Đánh giá" key="6">Content of Tab Pane 6</TabPane>
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
                                            bài:{course.member_num ? course.member_num : 0}</p>
                                    </div>
                                    <div className="row w-100">
                                        <Icon type="team" className="col-md-2"/>
                                        <p className="col-md-10">Tổng số học viên
                                            : {course.member_num ? course.member_num : 0} học viên</p>
                                    </div>
                                    <div className="row w-100">
                                        <Icon type="font-colors" className="col-md-2"/>
                                        <p className="col-md-10">Ngôn ngữ : Tiếng Nhật</p>
                                    </div>
                                    <div className="row w-100">
                                        <Icon type="pound" className="col-md-2"/>
                                        <p className="col-md-10">Học phí: 500.000 VND</p>
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

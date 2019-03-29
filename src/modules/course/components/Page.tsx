import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {ListLessonContainter} from "./lesson/container";
import {ApiEntity} from '../../../common/types/index';
import {Loader} from "../../loader/components/loader";
import {CourseInfoContainter} from "./course_info/container";
import {BackTop, Carousel, PageHeader, Tabs} from "antd";
import {NavigationBarContainter} from "../../navigation_bar/container";

const TabPane = Tabs.TabPane;

export interface Props {
    api: ApiEntity;
    match: any;
    params: any;
    props: any,
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

    public callback(key) {
        console.log(key);
    }

    public render() {
        let {api, props} = this.props;
        let {match: {params}} = this.props;
        return (
            <Fragment>
                <NavigationBarContainter/>
                <div className="container">
                    <Carousel autoplay>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                    <PageHeader
                        className="mt-10"
                        title=""
                        breadcrumb={{routes}}
                    />
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                    <Helmet title={"Course"}/>
                    <div className="home_layout">
                        {api.loadings > 0 ? <Loader/> : ""}
                        <CourseInfoContainter
                            params={props.match.params}
                            location={props.location}
                            route={null}
                            routeParams={null}
                            router={null}
                            routes={null}
                        />
                        <div className="">
                            <ListLessonContainter
                                params={props.match.params}
                                location={props.location}
                                route={null}
                                routeParams={null}
                                router={null}
                                routes={null}
                            />
                        </div>
                    </div>
                </div>
                <BackTop/>
            </Fragment>
        );
    }
}

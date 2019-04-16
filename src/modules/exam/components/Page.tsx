import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {BackTop, Input, Layout, PageHeader, Tabs} from 'antd';
import {LessonEntity} from "../../../common/types/lesson";
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {NavigationBarContainter} from "../../navigation_bar/container";

const TabPane = Tabs.TabPane;

const {
    Footer
} = Layout;

const {TextArea} = Input;

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

export interface Props {
    match: any;
    params: any;
    lesson: LessonEntity;
    props: any,
    api: ApiEntity;

    fetchLesson(parameters): Promise<any>;
}

export interface State {
    visible: boolean;
}

export class Exam extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentWillMount() {
        this.initLesson(this.props.match.params.id);
    }

    public initLesson = (id) => {
        this.props.fetchLesson({id: id})
            .then(res => {
                if (res && res.status == "success") {
                    let lesson = res.data;

                }
            })
    }

    public changeLesson = (id) => {
        console.log("aaaaaaaa");
        this.initLesson(id);
    }

    public showModal = () => {
        this.setState({
            visible: true
        });
    };
    public closeModal = () => {
        this.setState({
            visible: false
        });
    };
    public handleCancel = (e) => {
        this.closeModal();
    };
    public handleOk = (e) => {
        this.setState({
            visible: false,
        });
    };
    private handleClickCreateQuestion = () => {
        this.showModal();
    };

    public render() {
        let {lesson, api, props} = this.props;
        let {match: {params}} = this.props;

        return (
            <Fragment>
                <Helmet title={"Lesson"}/>
                <NavigationBarContainter/>
                {/*-------------------------page header-------------------------*/}
                <PageHeader
                    className="mt-5"
                    title=""
                    breadcrumb={{routes}}
                />
                {api.loadings > 0 ? <Loader/> : ""}
                <div className="row ml-5 mr-1">
                    <div className="col-md-10 list-exam">
                        <div className="row ml-5 mt-4 mr-1">
                            list cau hoi
                        </div>
                    </div>
                    <div className="col-md-2 list-exam">
                        <div className="row">
                            dong ho
                        </div>
                        <div className="row">
                            abcd
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

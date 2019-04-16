import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {BackTop, Input, Layout, PageHeader, Radio, Tabs} from 'antd';
import {LessonEntity} from "../../../common/types/lesson";
import {Loader} from "../../loader/components/loader";
import {ApiEntity} from "../../../common/types";
import {NavigationBarContainter} from "../../navigation_bar/container";

const TabPane = Tabs.TabPane;

const {
    Footer
} = Layout;

const {TextArea} = Input;
const RadioGroup = Radio.Group;

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
    value: number;
}

export class Exam extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: 1,
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

    public onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    public render() {
        let {lesson, api, props} = this.props;
        let {match: {params}} = this.props;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <Fragment>
                <Helmet title={"Lesson"}/>
                <NavigationBarContainter/>
                {/*-------------------------page header-------------------------*/}
                <div className="container">
                    <PageHeader
                        className="mt-5"
                        title=""
                        breadcrumb={{routes}}
                    />
                    {api.loadings > 0 ? <Loader/> : ""}
                    <div className="row ml-5 mr-1">
                        <div className="col-md-9">
                            <p className="row ml-1 exam-title">Câu 1/40 - Lần cuối trả lời sai</p>
                            <div className="row mr-1 mb-5 list-exam">
                                <div className="col w-100 ml-3">
                                    <p className="row mt-3">いくら さがしても、ここに おいたはずの さいふが （ ）。</p>
                                    <div className="row">
                                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                                            <Radio style={radioStyle} value={1}>Option A</Radio>
                                            <Radio style={radioStyle} value={2}>Option B</Radio>
                                            <Radio style={radioStyle} value={3}>Option C</Radio>
                                            <Radio style={radioStyle} value={4}>
                                                More...
                                                {this.state.value === 4 ?
                                                    <Input style={{width: 100, marginLeft: 10}}/> : null}
                                            </Radio>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="row mr-1 list-exam">
                                list cau hoi
                            </div>
                        </div>
                        <div className="col-md-3 list-exam">
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
                </div>
                <BackTop/>
            </Fragment>
        );
    }
}

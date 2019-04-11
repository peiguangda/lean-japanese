import * as React from "react";
import {Fragment} from "react";
import {Button, Card, Icon, Rate} from 'antd';
import {Link} from "react-router-dom";
import {CourseEntity} from "../../../../../common/types/course";
import {CourseModal} from "../../../../modal/course/components/CourseModal";

const {Meta} = Card;

export interface Props {
    course: CourseEntity;

    createCourse(parameters): Promise<any>;
}

export interface State {
    visible: boolean;
}

export class Course extends React.Component<Props, State, {}> {
    public showModal = () => {
        this.setState({
            visible: true
        })
    };
    public closeModal = () => {
        this.setState({
            visible: false
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    public componentDidMount() {
        // Call api get list data
    }

    public render() {
        let {course} = this.props;
        let {visible} = this.state;
        return (
            <Fragment>
                <Button type="primary" icon="plus" className="right-corder-container" onClick={this.showModal}/>
                <Link className="col-md-4 col-lg-4 link_to" to={course ? `/course/${course.id}` : '/'}>
                    <Card
                        className="course_list"
                        hoverable
                        cover={<img alt={course ? course.name : ""} src={course ? course.avatar : ""}/>}
                    >
                        <Meta
                            title={course ? course.name : ""}
                        />
                        <div className="LOC">
                            <div className="BOC">
                                <div className="FOC">
                                    <Icon type="team"/>
                                </div>
                                <div className="DOC">{course.member_num ? course.member_num : 0}</div>
                            </div>
                            <div className="BOC">
                                <Rate allowHalf defaultValue={3}/>
                            </div>
                        </div>
                        <div className="LOC">
                            <div className="GOC">{course.cost ? course.cost : 0}</div>
                        </div>
                    </Card>
                </Link>
                <CourseModal
                    visible={visible}
                    createCourse={this.props.createCourse}
                    closeModal={this.closeModal}
                    showModal={this.showModal}
                />
            </Fragment>
        );
    }
}

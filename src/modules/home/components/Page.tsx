import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {CategoryCourse} from "./CategoryCourse";
import {CourseContainer} from "./courses/container";
import {BackTop, Button, Checkbox, Icon, Layout, Select} from "antd";
import {NavigationBarContainter} from "../../navigation_bar/container";
import {CourseModal} from "../../modal/course/components/CourseModal";

const {
    Footer
} = Layout;

const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

export interface Props {
    createCourse(parameters): Promise<any>;
}

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

export interface State {
    visible: boolean;
}

export class HomePage extends React.Component<Props, State, {}> {
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
    }

    public render() {
        return (
            <Fragment>
                <NavigationBarContainter/>

                <div className="container">
                    <Helmet title={"Easy Japanese"}/>
                    <div className="row search_layout">
                        <div className="row filter-panel">
                            <div className="container">
                                <div className="display-flex filter-panel">
                                    <div className="filter-label select-form">
                                        <Icon type="filter"/> Lọc kết quả
                                    </div>
                                    <div className="select-form ">
                                        <label>Loại hình</label>
                                        <Select defaultValue="Khóa học online" style={{width: 120}}
                                                onChange={handleChange}>
                                            <Option value="Khóa học online">Khóa học online</Option>
                                            <Option value="Khóa học offline">Khóa học offline</Option>
                                        </Select>
                                    </div>
                                    <div className="select-form">
                                        <Checkbox onChange={onChange}>Miễn Phí</Checkbox>
                                    </div>
                                    <div className="select-form">
                                        <Checkbox onChange={onChange}>Khuyến Mãi</Checkbox>
                                    </div>
                                    <div className="select-form">
                                        <label>Sắp xếp</label>
                                        <Select defaultValue="Chọn sắp xếp" style={{width: 120}}
                                                onChange={handleChange}>
                                            <Option value="Theo tên">Theo tên</Option>
                                            <Option value="Theo giá">Theo giá</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row home_layout">
                        <div className="col-md-3 category_box">
                            <div className="category_index">Danh mục khoá học</div>
                            <div className="category_item">
                                <CategoryCourse category_name="Tất cả khoá học" icon="desktop"/>
                                <CategoryCourse category_name="Khóa học tiếng nhật" icon="read"/>
                                <CategoryCourse category_name="Khóa học đã tham gia" icon="user"/>
                                <CategoryCourse category_name="Khóa học của tôi" icon="solution"/>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <CourseContainer/>
                        </div>
                    </div>
                    <div className="row bg-feedback" id="feedback-scroll">
                        <div className="container">
                        </div>
                    </div>
                </div>
                <CourseModal
                    visible={this.state.visible}
                    createCourse={this.props.createCourse}
                    closeModal={this.closeModal}
                    showModal={this.showModal}
                />
                <Button type="primary" icon="plus" className="right-corder-container" onClick={this.showModal}/>
                <Footer style={{textAlign: 'center'}}>
                    Easy Japanese Design ©2019 Created by HEDSPI
                </Footer>
                <BackTop/>
            </Fragment>
        );
    }
}

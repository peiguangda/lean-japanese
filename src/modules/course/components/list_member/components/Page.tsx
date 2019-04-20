import * as React from "react";
import {Fragment} from "react";
import {RouteComponentProps} from "react-router";
import {Table} from "antd";
import {UserCourseEntity} from "../../../../../common/types/user_course";

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

export interface Props extends RouteComponentProps<any, any> {
    props: any;
    listMem: UserCourseEntity[];

    fetchMemAttendCourse(parameters): void
}

export interface State {
}

export class ListMember extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    public initData() {
        this.props.fetchMemAttendCourse({course_id: 1});
    }

    componentWillMount() {
        this.initData();
    }

    public render() {
        let {listMem} = this.props;
        return (
            <Fragment>
                <Table columns={user_columns} dataSource={dataSource}/>
            </Fragment>
        );
    }
}

import * as React from "react";
import "../../../public/css/custom.css";
import {Card} from 'antd';
import {Link} from "react-router-dom";

const {Meta} = Card;

export interface Props {
}

export interface State {
}

export class Course extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        // Call api get list data
    }

    public render() {
        return (
            <Card
                hoverable
                style={{width: 240}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
            >
                <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                />
                <Link to="/course/1">Chi tiết</Link>
            </Card>
        );
    }
}

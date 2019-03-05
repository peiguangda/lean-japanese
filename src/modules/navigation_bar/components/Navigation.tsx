import * as React from "react";
import {Helmet} from "react-helmet";
import "../../../public/css/custom.css";
import {Link} from "react-router-dom";
import {Menu, Icon, Input, Dropdown, Button, message} from 'antd';
import 'antd/dist/antd.css';

const Search = Input.Search;

export interface Props {
}

export interface State {
}

export class NavigationBar extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        // Call api get list data
    }

    public handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    private handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    public render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Icon type="user"/>Personal Information</Menu.Item>
                <Menu.Item key="2"><Icon type="user"/>Logout</Menu.Item>
            </Menu>
        );
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[]}
                mode="horizontal"
            >
                <Menu.Item key="mail" className="home_navigation">
                    <Link to="/"><Icon type="home"/>Easy Japanese</Link>
                </Menu.Item>
                <Menu.Item key="search" className="search_navigation">
                    <Search
                        placeholder="input course name"
                        onSearch={value => console.log(value)}
                        style={{width: 200}}
                    />
                </Menu.Item>

                <Menu.Item key="alipay" className="account_navigation">
                    <Dropdown overlay={menu}>
                        <Button style={{marginLeft: 8}}>
                            Quang Dai <Icon type="team"/>
                        </Button>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        );
    }
}

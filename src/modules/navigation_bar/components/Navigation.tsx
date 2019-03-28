import * as React from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {Menu, Icon, Input, Dropdown, Button, message, Select, Upload, Modal} from 'antd';
import "../../../public/css/custom.scss";
import 'antd/dist/antd.css';
import {Fragment} from "react";
import {LoginModal} from "../../modal/user/components/LoginModal";

const Search = Input.Search;

export interface Props {
}

export interface State {
    visible: boolean
}

export class NavigationBar extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    public componentDidMount() {
        // Call api get list data
    }

    public handleClick = (e) => {
        // console.log("e1",e);
    }


    private handleMenuClick = (e) => {
        console.log("e2",e);
        if (e.key == 1) this.showModal();
        if (e.key == 1) console.log("Logout");
    }

    public showModal = () => {
        this.setState({
            visible: true
        });
    }

    public closeModal = () => {
        this.setState({
            visible: false
        });
    }

    public render() {
        let {visible} = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Icon type="user"/>Personal Information</Menu.Item>
                <Menu.Item key="2"><Icon type="user"/>Logout</Menu.Item>
            </Menu>
        );
        return (
            <Fragment>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[]}
                    mode="horizontal"
                    className="menu-header"
                >
                    <Menu.Item key="mail" className="home_navigation">
                        <Link className="logo-header" to="/"><Icon type="home"/>Easy Japanese</Link>
                    </Menu.Item>
                    <Menu.Item key="search" className="search_navigation">
                        <Search
                            placeholder="Nhập khóa học"
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
                <LoginModal
                    visible={visible}
                    showModal={this.showModal}
                    closeModal={this.closeModal}
                />
            </Fragment>
        )
            ;
    }
}
import * as React from "react";
import {Link} from "react-router-dom";
import {Menu, Icon, Input, Dropdown, Button, message, Select, Upload, Modal} from 'antd';
import "../../../public/css/custom.scss";
import 'antd/dist/antd.css';
import {Fragment} from "react";
import {WrappedNormalLoginForm} from "../../modal/user/components/LoginModal";
import {UserEntity} from "../../../common/types/user";
import {ApiEntity} from "../../../common/types";
import * as Cookie from "../../../helpers/Cookie.js";
import {LessonEntity} from "../../../common/types/lesson";

const Search = Input.Search;

export interface Props {
    login(parameters): Promise<any>;

    getProfile(parameters): void;

    user: UserEntity;
    api: ApiEntity;
}

export interface State {
    visible: boolean;
    user: UserEntity;
}

export class NavigationBar extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            user: new class implements UserEntity {
                id: string;
                account: string;
                email: string;
                full_name: string;
                phone_number: string;
                description: string;
                avatar_url: string;
                gender: string;
                password: string;
                password_confirmation: string;
            }
        }
    }

    public componentDidMount() {
        if (Cookie.getAccessToken()) {
            this.props.getProfile({});
        }
    }

    componentWillReceiveProps(nextProps) {
        let {user} = nextProps;
        console.log("haha", user);
        this.setState({
            user: user,
        })
    }

    public handleClick = (e) => {
        // console.log("e1",e);
    }


    private handleMenuClick = (e) => {
        console.log("e2", e);
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
        let {user} = this.props;
        console.log("user", user);
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
                        <Dropdown overlay={user ? menu : ""}>
                            <Button style={{marginLeft: 8}}>
                                {user ? user.account : ""}<Icon type="team"/>
                            </Button>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
                <WrappedNormalLoginForm
                    visible={visible}
                    showModal={this.showModal}
                    closeModal={this.closeModal}
                    login={this.props.login}
                    api={this.props.api}
                />
            </Fragment>
        )
            ;
    }
}
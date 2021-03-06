import * as React from "react";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {Button, Dropdown, Icon, Input, Menu, message} from 'antd';
import 'antd/dist/antd.css';
import "../../../public/css/custom.css"
import {WrappedNormalLoginForm} from "../../modal/user/components/LoginModal";
import {WrappedNormalSigninForm} from "../../modal/user/components/SigninModal";
import {UserEntity} from "../../../common/types/user";
import {ApiEntity} from "../../../common/types";
import * as Cookie from "../../../helpers/Cookie.js";

const Search = Input.Search;

export interface Props {
    currentUser: UserEntity;
    api: ApiEntity;

    login(parameters): Promise<any>;

    logout(parameters): Promise<any>;

    getProfile(parameters): Promise<any>;

    signin(parameters): Promise<any>;
}

export interface State {
    visible: boolean;
    logined: boolean;
    signinVisible: boolean;
}

export class NavigationBar extends React.Component<Props, State, {}> {
    public handleClick = (e) => {
    };
    public logout = () => {
        this.props.logout({}).then(res => {
            if (res && res.status == "success") {
                message.info("Bạn đã đăng xuất!");
                this.setState({
                    logined: false
                })
            } else message.error("Xảy ra lỗi")
        })
    };
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

    public showModalSignin = () => {
        this.setState({
            signinVisible: true
        });
    };
    public closeModalSignin = () => {
        this.setState({
            signinVisible: false
        });
    };


    public getProfile = () => {
        this.props.getProfile({}).then(res => {
            if (res && res.status == "success") {
                this.setState({
                    logined: true
                })
            }
        });
    };
    private handleMenuClick = (e) => {
        if (e.key == 1) console.log("thong tin ca nhan");
        if (e.key == 2) this.logout();
        if (e.key == 3) this.showModal();
        if (e.key == 4) this.showModalSignin();
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            logined: false,
            signinVisible: false
        }
    }

    public componentDidMount() {
        if (Cookie.getAccessToken()) {
            this.getProfile();
        }
    }

    public render() {
        let {visible, logined, signinVisible} = this.state;
        let {currentUser} = this.props;
        const menu1 = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Icon type="user"/>Thông tin cá nhân</Menu.Item>
                <Menu.Item key="2"><Icon type="user"/>Đăng xuất</Menu.Item>
            </Menu>
        );
        const menu2 = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="3"><Icon type="user"/>Đăng nhập</Menu.Item>
                <Menu.Item key="4"><Icon type="user"/>Đăng kí</Menu.Item>
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
                        <Link className="logo-header link_to" to="/"><Icon type="home"/>Easy Japanese</Link>
                    </Menu.Item>
                    <Menu.Item key="search" className="search_navigation">
                        <Search
                            placeholder="Nhập khóa học"
                            onSearch={value => console.log(value)}
                            style={{width: 200}}
                        />
                    </Menu.Item>

                    <Menu.Item key="alipay" className="account_navigation">
                        <Dropdown overlay={logined ? menu1 : menu2}>
                            <Button style={{marginLeft: 8}}>
                                {logined ? currentUser.account : "Người dùng"}<Icon type="team"/>
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
                    getProfile={this.getProfile}
                />
                <WrappedNormalSigninForm
                    signinVisible={signinVisible}
                    showModalSignin={this.showModalSignin}
                    closeModalSignin={this.closeModalSignin}
                    signin={this.props.signin}
                    api={this.props.api}
                    getProfile={this.getProfile}
                />
            </Fragment>
        )
            ;
    }
}
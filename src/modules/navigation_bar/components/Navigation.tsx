import * as React from "react";
import {Helmet} from "react-helmet";
import "../../../public/css/custom.css";
import {Menu, Icon, Input, Dropdown, Button, message} from 'antd';
import 'antd/dist/antd.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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
                    <Icon type="home"/>Easy Japanese
                </Menu.Item>
                <Menu.Item key="search" className="search_navigation">
                    <Search
                        placeholder="input course name"
                        onSearch={value => console.log(value)}
                        style={{width: 200}}
                    />
                </Menu.Item>
                <SubMenu className="setting_navigation"
                         title={<span className="submenu-title-wrapper"><Icon type="setting"/>Setting</span>}>
                    <MenuItemGroup title="Setting 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Setting 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="alipay">
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

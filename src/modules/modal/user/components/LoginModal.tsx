import * as React from "react";
import {Helmet} from "react-helmet";
import {Fragment} from "react";
import {Modal, Button, Icon, Input, Upload, message, Select} from "antd";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.min.css";
import {UserEntity} from "../../../../common/types/user";
import "../../../../public/css/custom.scss"

export interface Props {
    closeModal(): void;
    showModal(): void;

    visible: boolean;
}

export interface State {
    user: UserEntity;
}

export class LoginModal extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            user: new class implements UserEntity {
                id: string;
                account: string
                email: string
                full_name: string
                phone_number: string
                description: string
                avatar_url: string
                gender: string
                password: string
                password_confirmation: string
            }
        }
    }

    public handleCancel = (e) => {
        this.props.closeModal();
        console.log("Cancel");

    }

    public handleOk = () => {
        console.log("Ok");
        console.log(this.state.user);
    }

    public showModal = () => {
        this.props.showModal();
    }

    public emitEmpty = () => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                account: ''
            }
        }));
    }

    onChangeUserName = (e) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                account: ''
            }
        }));
    }

    public render() {
        let {user: {account}} = this.state;
        const suffix = account ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        return (
            <Fragment>
                <Modal
                    className={"title"}
                    title={"LOGIN"}
                    style={{}}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={suffix}
                        value={account}
                        onChange={this.onChangeUserName}
                    />
                    <Input.Password
                        placeholder="input password"
                    />
                </Modal>
            </Fragment>

        );
    }
}

import * as React from "react";
import {Fragment} from "react";
import {Button, Form, Icon, Input, message, Modal} from "antd";
import {WrappedFormUtils} from 'antd/lib/form/Form';
import "../../../../public/css/login_form.scss"
import {ApiEntity} from "../../../../common/types";
import {UserEntity} from '../../../../common/types/user';

export interface Props {
    signinVisible: boolean;
    api: ApiEntity;
    user: UserEntity;

    closeModalSignin(): void;

    showModalSignin(): void;

    getProfile(): void;

    signin(parameters): Promise<any>;
}

export interface State {
    user: UserEntity;
}

export class SigninModal extends React.Component<Props & { form: WrappedFormUtils }, State, {}> {
    public handleCancel = (e) => {
        this.props.closeModalSignin();
    };
    public handleOk = () => {
        console.log("Ok");
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let {user} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signin({user: values})
                    .then(res => {
                        if (res && res.status == "success") {
                            window.location.reload();
                        }
                    })
                message.success("Đăng ký thành công");
            }
        });
    };

    public emitNameEmpty = () => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                account: ''
            }
        }));
    };

    public emitEmailEmpty = () => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: ''
            }
        }));
    };

    public emitPasswordEmpty = () => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: ''
            }
        }));
    };

    constructor(props, form) {
        super(props);
        super(form);
        this.state = {
            user: new class implements UserEntity {
                actionType?: string;
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

    componentWillReceiveProps(nextProps) {
    }

    public render() {
        const {getFieldDecorator} = this.props.form;
        let {user: {account, email, password}} = this.state;
        const suffixAccount = account ? <Icon type="close-circle" onClick={this.emitNameEmpty}/> : null;
        const suffixEmail = email ? <Icon type="close-circle" onClick={this.emitEmailEmpty}/> : null;
        const suffixPass = password ? <Icon type="close-circle" onClick={this.emitPasswordEmpty}/> : null;
        return (
            <Fragment>
                <Modal
                    className={"title"}
                    title={"ĐĂNG KÝ"}
                    style={{}}
                    visible={this.props.signinVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('account', {
                                rules: [{required: true, message: 'Vui lòng nhập username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Tên đăng nhập"
                                       suffix={suffixAccount}
                                       value={account}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: 'Vui lòng nhập email!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} type="email"
                                       placeholder="Email"
                                       suffix={suffixEmail}
                                       value={email}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Vui lòng nhập mật khẩu!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Mật khẩu"
                                       suffix={suffixPass}
                                       value={password}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Đăng Ký
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment>

        );
    }
}

export const WrappedNormalSigninForm = Form.create<Props>()(SigninModal);
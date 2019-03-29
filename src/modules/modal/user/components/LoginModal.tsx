import * as React from "react";
import {Fragment} from "react";
import {Modal, Button, Icon, Input, Form, message, Checkbox} from "antd";
import {WrappedFormUtils} from 'antd/lib/form/Form';
import "../../../../public/css/login_form.scss"
import {ApiEntity} from "../../../../common/types";

export interface Props {
    closeModal(): void;

    showModal(): void;

    login(parameters): Promise<any>;

    visible: boolean;
    api: ApiEntity;
}

export interface State {
}

export class LoginModal extends React.Component<Props & { form: WrappedFormUtils }, State, {}> {
    constructor(props, form) {
        super(props);
        super(form);
    }

    public handleCancel = (e) => {
        this.props.closeModal();
        console.log("Cancel");

    }

    public handleOk = () => {
        console.log("Ok");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values).then(res => {
                    if (res && res.payload.status == "success") {
                        message.success("Đăng nhập thành công");
                        this.props.closeModal();
                    } else message.error("Sai tài khoản hoặc mật khẩu");
                })
            }
        });
    }

    public render() {
        const {getFieldDecorator} = this.props.form;
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
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('account', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment>

        );
    }
}

export const WrappedNormalLoginForm = Form.create<Props>()(LoginModal);